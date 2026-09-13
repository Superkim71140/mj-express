/**
 * SEO Data Integrity & Safety Validator for MJ-TH Express
 * Validates datasets in src/data/seo/ and configuration in src/lib/seo/
 */

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const ROOT = path.resolve(__dirname, '..');

function loadTs(relPath) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${relPath}`);
  }
  const code = fs.readFileSync(fullPath, 'utf8');
  const js = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
  }).outputText;
  const mod = { exports: {} };
  const fn = new Function('module', 'exports', 'require', '__dirname', '__filename', js);
  fn(mod, mod.exports, (p) => {
    // Basic shim if needed
    throw new Error(`External require not supported in validator: ${p}`);
  }, path.dirname(fullPath), fullPath);
  return mod.exports;
}

let errors = [];
let warnings = [];

function assert(condition, message) {
  if (!condition) {
    errors.push(message);
  }
}

function warn(condition, message) {
  if (!condition) {
    warnings.push(message);
  }
}

console.log('🔍 Running SEO Data Integrity & Safety Validator...\n');

// 1. Load authoritative datasets
let siteConfig, localAreas, servicesData, routesData, caseStudiesData;

try {
  siteConfig = loadTs('src/lib/seo/site-config.ts').siteConfig;
  localAreas = loadTs('src/data/seo/areas.ts').localAreas;
  servicesData = loadTs('src/data/seo/services.ts').servicesData;
  routesData = loadTs('src/data/seo/routes.ts').routesData;
  caseStudiesData = loadTs('src/data/seo/case-studies.ts').caseStudiesData;
} catch (e) {
  console.error('❌ Failed to load TypeScript datasets:', e.message);
  process.exit(1);
}

const baseUrl = siteConfig.baseUrl || 'https://www.mj-th-express.com';

// Extract sets of slugs
const areaSlugSet = new Set(localAreas.map(a => a.slug));
const serviceSlugSet = new Set(servicesData.map(s => s.slug));
const routeSlugSet = new Set(routesData.map(r => r.slug));
const caseStudySlugSet = new Set(caseStudiesData.map(c => c.slug));

// ==========================================
// CHECK 1: SLUG UNIQUENESS
// ==========================================
console.log('1️⃣ Checking slug uniqueness across datasets...');

function checkDuplicateSlugs(dataset, name) {
  const seen = new Set();
  for (const item of dataset) {
    if (seen.has(item.slug)) {
      errors.push(`[DUPLICATE SLUG] Duplicate slug "${item.slug}" in ${name}`);
    }
    seen.add(item.slug);
  }
}

checkDuplicateSlugs(localAreas, 'localAreas');
checkDuplicateSlugs(servicesData, 'servicesData');
checkDuplicateSlugs(routesData, 'routesData');
checkDuplicateSlugs(caseStudiesData, 'caseStudiesData');

// ==========================================
// CHECK 2: TARGET LOCATION AREAS PRESERVED
// ==========================================
console.log('2️⃣ Checking target locations preservation...');
const targetLocations = [
  'bang-khae',
  'nong-khaem',
  'bang-bon',
  'phasi-charoen',
  'thawi-watthana',
  'krathum-baen',
  'sam-phran'
];

for (const target of targetLocations) {
  assert(areaSlugSet.has(target), `[MISSING TARGET AREA] Required target area "${target}" missing from localAreas!`);
}

// ==========================================
// CHECK 3: CANONICAL URL & HOST VALIDATION
// ==========================================
console.log('3️⃣ Checking canonical URLs and host consistency...');
const allCanonicals = new Set();

function validateCanonical(canonical, expectedPath, entityName, slug) {
  assert(typeof canonical === 'string' && canonical.length > 0, `[CANONICAL EMPTY] Empty canonical in ${entityName}:${slug}`);
  try {
    const url = new URL(canonical);
    const expectedUrl = new URL(expectedPath, baseUrl);
    assert(url.origin === expectedUrl.origin, `[CANONICAL HOST MISMATCH] Host ${url.origin} does not match siteConfig.baseUrl ${baseUrl} in ${entityName}:${slug}`);
    assert(url.pathname === expectedUrl.pathname, `[CANONICAL PATH MISMATCH] Canonical ${url.pathname} does not match expected ${expectedUrl.pathname} in ${entityName}:${slug}`);
  } catch (e) {
    errors.push(`[CANONICAL INVALID] Malformed canonical URL "${canonical}" in ${entityName}:${slug}`);
  }

  if (allCanonicals.has(canonical)) {
    errors.push(`[DUPLICATE CANONICAL] Multiple items share canonical URL "${canonical}"`);
  }
  allCanonicals.add(canonical);
}

for (const area of localAreas) {
  validateCanonical(area.canonical || `${baseUrl}/areas/${area.slug}`, `/areas/${area.slug}`, 'Area', area.slug);
}

for (const service of servicesData) {
  const expectedPath = service.slug === 'motorcycle-transport' ? '/motorcycle-transport' : `/services/${service.slug}`;
  const canonical = service.canonical || `${baseUrl}${expectedPath}`;
  validateCanonical(canonical, expectedPath, 'Service', service.slug);
}

for (const route of routesData) {
  validateCanonical(`${baseUrl}/routes/${route.slug}`, `/routes/${route.slug}`, 'Route', route.slug);
}

for (const study of caseStudiesData) {
  validateCanonical(`${baseUrl}/case-studies/${study.slug}`, `/case-studies/${study.slug}`, 'CaseStudy', study.slug);
}

// ==========================================
// CHECK 4: INTERNAL LINK AND SLUG INTEGRITY
// ==========================================
console.log('4️⃣ Checking internal link and slug references...');

// Areas: nearbyAreaSlugs
for (const area of localAreas) {
  if (area.nearbyAreaSlugs) {
    const seenNearby = new Set();
    for (const nearbySlug of area.nearbyAreaSlugs) {
      assert(areaSlugSet.has(nearbySlug), `[INVALID NEARBY SLUG] Area "${area.slug}" references nonexistent nearbyAreaSlug "${nearbySlug}"`);
      assert(nearbySlug !== area.slug, `[SELF-REFERENCING NEARBY] Area "${area.slug}" references itself in nearbyAreaSlugs`);
      if (seenNearby.has(nearbySlug)) {
        errors.push(`[DUPLICATE NEARBY] Area "${area.slug}" has duplicate nearbyAreaSlug "${nearbySlug}"`);
      }
      seenNearby.add(nearbySlug);
    }
  }
}

// Services: relatedAreaSlugs, relatedRouteSlugs
for (const service of servicesData) {
  if (service.relatedAreaSlugs) {
    for (const areaSlug of service.relatedAreaSlugs) {
      assert(areaSlugSet.has(areaSlug), `[INVALID RELATED AREA] Service "${service.slug}" references nonexistent relatedAreaSlug "${areaSlug}"`);
    }
  }
  if (service.relatedRouteSlugs) {
    for (const routeSlug of service.relatedRouteSlugs) {
      assert(routeSlugSet.has(routeSlug), `[INVALID RELATED ROUTE] Service "${service.slug}" references nonexistent relatedRouteSlug "${routeSlug}"`);
    }
  }
}

// Routes: relatedAreaSlugs, relatedServiceSlugs, relatedRoutes
for (const route of routesData) {
  if (route.relatedAreaSlugs) {
    for (const areaSlug of route.relatedAreaSlugs) {
      assert(areaSlugSet.has(areaSlug), `[INVALID RELATED AREA] Route "${route.slug}" references nonexistent relatedAreaSlug "${areaSlug}"`);
    }
  }
  if (route.relatedServiceSlugs) {
    for (const serviceSlug of route.relatedServiceSlugs) {
      assert(serviceSlugSet.has(serviceSlug), `[INVALID RELATED SERVICE] Route "${route.slug}" references nonexistent relatedServiceSlug "${serviceSlug}"`);
    }
  }
  if (route.relatedRoutes) {
    for (const nested of route.relatedRoutes) {
      assert(routeSlugSet.has(nested.slug), `[INVALID NESTED ROUTE] Route "${route.slug}" references nonexistent relatedRoute "${nested.slug}" (${nested.label})`);
      assert(nested.slug !== route.slug, `[SELF-REFERENCING ROUTE] Route "${route.slug}" references itself in relatedRoutes`);
    }
  }
}

// Case Studies: relatedAreaSlugs, relatedServiceSlugs, relatedRouteSlugs
for (const study of caseStudiesData) {
  if (study.relatedAreaSlugs) {
    for (const areaSlug of study.relatedAreaSlugs) {
      assert(areaSlugSet.has(areaSlug), `[INVALID RELATED AREA] CaseStudy "${study.slug}" references nonexistent relatedAreaSlug "${areaSlug}"`);
    }
  }
  if (study.relatedServiceSlugs) {
    for (const serviceSlug of study.relatedServiceSlugs) {
      assert(serviceSlugSet.has(serviceSlug), `[INVALID RELATED SERVICE] CaseStudy "${study.slug}" references nonexistent relatedServiceSlug "${serviceSlug}"`);
    }
  }
  if (study.relatedRouteSlugs) {
    for (const routeSlug of study.relatedRouteSlugs) {
      assert(routeSlugSet.has(routeSlug), `[INVALID RELATED ROUTE] CaseStudy "${study.slug}" references nonexistent relatedRouteSlug "${routeSlug}"`);
    }
  }
}

// ==========================================
// CHECK 5: ENTITY & SCHEMA INTEGRITY
// ==========================================
console.log('5️⃣ Checking entity, reviews, coordinates & schema cleanliness...');

const forbiddenLandmarkUrls = [
  'wikipedia.org/wiki/มหาวิทยาลัยมหิดล',
  'mahidol.ac.th',
  'wikipedia.org/wiki/Mahidol_University'
];

for (const area of localAreas) {
  // Check for fake coordinates on service areas
  assert(!area.geoCoordinates, `[FAKE COORDINATES] Area "${area.slug}" has geoCoordinates (fake branch coordinates)`);
  // Check for unverified aggregateRating
  assert(!area.aggregateRating, `[UNVERIFIED RATING] Area "${area.slug}" has unverified aggregateRating`);
  // Check for studentReviews or unverified reviews
  assert(!area.studentReviews || area.studentReviews.length === 0, `[UNVERIFIED REVIEWS] Area "${area.slug}" has unverified studentReviews`);
  // Check for improper sameAs landmarks
  if (area.entitySameAs) {
    for (const landmark of forbiddenLandmarkUrls) {
      assert(!area.entitySameAs.includes(landmark), `[INVALID SAMEAS] Area "${area.slug}" has invalid landmark entitySameAs "${area.entitySameAs}"`);
    }
  }
}

// ==========================================
// CHECK 6: SITEMAP INTEGRITY
// ==========================================
console.log('6️⃣ Checking sitemap consistency...');

// Known legacy duplicate slugs that must NOT appear in sitemap
const legacyForbiddenSlugs = [
  'nongkhaem-transport',
  'phutthamonthon-transport',
  'home-moving',
  'bangkok-to-chiangmai'
];

for (const area of localAreas) {
  assert(!legacyForbiddenSlugs.includes(area.slug), `[FORBIDDEN LEGACY SLUG] Area "${area.slug}" is a forbidden legacy slug!`);
}
for (const service of servicesData) {
  assert(!legacyForbiddenSlugs.includes(service.slug), `[FORBIDDEN LEGACY SLUG] Service "${service.slug}" is a forbidden legacy slug!`);
}
for (const route of routesData) {
  assert(!legacyForbiddenSlugs.includes(route.slug), `[FORBIDDEN LEGACY SLUG] Route "${route.slug}" is a forbidden legacy slug!`);
}

// ==========================================
// CHECK 7: CONTENT COMPLETENESS & UPDATED_AT
// ==========================================
console.log('7️⃣ Checking content completeness & dates...');

function checkContentFields(dataset, name) {
  for (const item of dataset) {
    assert(item.title && item.title.trim().length > 0, `[EMPTY TITLE] Empty title in ${name}:${item.slug}`);
    assert(item.description && item.description.trim().length > 0, `[EMPTY DESCRIPTION] Empty description in ${name}:${item.slug}`);
    assert(item.h1 && item.h1.trim().length > 0, `[EMPTY H1] Empty h1 in ${name}:${item.slug}`);

    if (item.updatedAt) {
      const d = new Date(item.updatedAt);
      assert(!isNaN(d.getTime()), `[INVALID UPDATED_AT] Invalid updatedAt "${item.updatedAt}" in ${name}:${item.slug}`);
    }

    // Warnings
    if (item.title && item.title.length > 80) {
      warn(false, `[TITLE LENGTH WARNING] Title in ${name}:${item.slug} is ${item.title.length} chars long (> 80)`);
    }
    if (item.description && item.description.length > 180) {
      warn(false, `[DESC LENGTH WARNING] Description in ${name}:${item.slug} is ${item.description.length} chars long (> 180)`);
    }
  }
}

checkContentFields(localAreas, 'localAreas');
checkContentFields(servicesData, 'servicesData');
checkContentFields(routesData, 'routesData');
checkContentFields(caseStudiesData, 'caseStudiesData');

// ==========================================
// CHECK 8: ABSOLUTE MARKETING CLAIMS AUDIT
// ==========================================
console.log('8️⃣ Checking for risky absolute claims...');

const highRiskPhrases = [
  'ปลอดภัย 100%',
  'ไม่มีรอยแน่นอน',
  'ปลอดภัยแน่นอน',
  'เข้าไว 30 นาทีแน่นอน',
  'ดีที่สุดใน',
  'ถูกที่สุดใน'
];

function checkRiskyPhrases(dataset, name) {
  for (const item of dataset) {
    const text = JSON.stringify(item);
    for (const phrase of highRiskPhrases) {
      if (text.includes(phrase)) {
        warn(false, `[RISKY CLAIM WARNING] Found "${phrase}" in ${name}:${item.slug}`);
      }
    }
  }
}

checkRiskyPhrases(localAreas, 'localAreas');
checkRiskyPhrases(servicesData, 'servicesData');
checkRiskyPhrases(routesData, 'routesData');
checkRiskyPhrases(caseStudiesData, 'caseStudiesData');

// ==========================================
// SUMMARY REPORT
// ==========================================
console.log('\n==========================================');
console.log('📊 VALIDATION SUMMARY');
console.log('==========================================');
console.log(`Total Local Areas:     ${localAreas.length}`);
console.log(`Total Services:        ${servicesData.length}`);
console.log(`Total Routes:          ${routesData.length}`);
console.log(`Total Case Studies:    ${caseStudiesData.length}`);
console.log(`Total Verified Slugs:  ${localAreas.length + servicesData.length + routesData.length + caseStudiesData.length}`);
console.log(`Errors Found:          ${errors.length}`);
console.log(`Warnings Found:        ${warnings.length}`);

if (warnings.length > 0) {
  console.log('\n⚠️ WARNINGS:');
  warnings.forEach(w => console.log('  ' + w));
}

if (errors.length > 0) {
  console.log('\n❌ ERRORS:');
  errors.forEach(e => console.log('  ' + e));
  console.log('\n💥 VALIDATION FAILED!');
  process.exit(1);
} else {
  console.log('\n✅ ALL SEO DATA CHECKS PASSED SUCCESSFULLY!');
  process.exit(0);
}
