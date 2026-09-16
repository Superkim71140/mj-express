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
    if (p === './site-config' || p === '@/lib/seo/site-config' || p === '@/data/site') {
      return loadTs('src/lib/seo/site-config.ts');
    }
    if (p === './breadcrumbs' || p === '@/lib/seo/breadcrumbs') {
      return loadTs('src/lib/seo/breadcrumbs.ts');
    }
    if (p === '@/data/areas' || p === './areas' || p === '@/data/seo/areas' || p === './seo/areas') {
      return loadTs('src/data/seo/areas.ts');
    }
    if (p === '@/data/services' || p === './services' || p === '@/data/seo/services' || p === './seo/services') {
      return loadTs('src/data/seo/services.ts');
    }
    if (p === '@/data/routes' || p === './routes' || p === '@/data/seo/routes' || p === './seo/routes') {
      return loadTs('src/data/seo/routes.ts');
    }
    if (p === '@/data/case-studies' || p === './case-studies' || p === '@/data/seo/case-studies' || p === './seo/case-studies') {
      return loadTs('src/data/seo/case-studies.ts');
    }
    if (p === '@/data/seo/internal-links' || p === './internal-links') {
      return loadTs('src/data/seo/internal-links.ts');
    }
    if (p === 'next' || p.startsWith('next/')) {
      return {};
    }
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
let siteConfig, localAreas, servicesData, routesData, caseStudiesData, breadcrumbsHelper, schemaHelper;

try {
  siteConfig = loadTs('src/lib/seo/site-config.ts').siteConfig;
  localAreas = loadTs('src/data/seo/areas.ts').localAreas;
  servicesData = loadTs('src/data/seo/services.ts').servicesData;
  routesData = loadTs('src/data/seo/routes.ts').routesData;
  caseStudiesData = loadTs('src/data/seo/case-studies.ts').caseStudiesData;
  breadcrumbsHelper = loadTs('src/lib/seo/breadcrumbs.ts');
  schemaHelper = loadTs('src/lib/seo/schema.ts');
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
// CHECK 9: BREADCRUMB DATA & SCHEMA INTEGRITY
// ==========================================
console.log('9️⃣ Checking Breadcrumb SEO architecture & schema...');

const servicesHubExists = fs.existsSync(path.join(ROOT, 'src/app/services/page.tsx'));
const routesHubExists = fs.existsSync(path.join(ROOT, 'src/app/routes/page.tsx'));
const areasHubExists = fs.existsSync(path.join(ROOT, 'src/app/areas/page.tsx'));
const caseStudiesHubExists = fs.existsSync(path.join(ROOT, 'src/app/case-studies/page.tsx'));

assert(areasHubExists, '[HUB MISSING] /areas hub page must exist at src/app/areas/page.tsx');
assert(caseStudiesHubExists, '[HUB MISSING] /case-studies hub page must exist at src/app/case-studies/page.tsx');

// Verify that if /services and /routes do not exist, no breadcrumb links to them
if (!servicesHubExists) {
  console.log('   ℹ️ Confirmed /services hub does not exist; detail breadcrumbs must NOT link to /services');
}
if (!routesHubExists) {
  console.log('   ℹ️ Confirmed /routes hub does not exist; detail breadcrumbs must NOT link to /routes');
}

const badKeywords = ['ราคาถูกที่สุด', '24 ชั่วโมง', 'อันดับหนึ่ง', 'ขนของราคาถูกพร้อมคนยกทั่วไทย'];

function validateBreadcrumbs(trail, pageContext, canonicalUrl) {
  assert(Array.isArray(trail), `[BREADCRUMB ERROR] Trail is not an array in ${pageContext}`);
  assert(trail.length >= 2, `[BREADCRUMB SHORT] Trail must have at least 2 items in ${pageContext} (found ${trail.length})`);

  const schema = schemaHelper.buildBreadcrumbSchema(trail, baseUrl);
  assert(schema['@context'] === 'https://schema.org', `[SCHEMA CONTEXT] Invalid @context in ${pageContext}`);
  assert(schema['@type'] === 'BreadcrumbList', `[SCHEMA TYPE] Invalid @type in ${pageContext}`);
  assert(Array.isArray(schema.itemListElement), `[SCHEMA ITEMS] itemListElement not an array in ${pageContext}`);
  assert(schema.itemListElement.length === trail.length, `[SCHEMA LENGTH MISMATCH] schema items length != trail length in ${pageContext}`);

  const seenPositions = new Set();
  const seenUrls = new Set();

  schema.itemListElement.forEach((el, index) => {
    const expectedPos = index + 1;
    assert(el['@type'] === 'ListItem', `[SCHEMA ITEM TYPE] Element ${index} is not ListItem in ${pageContext}`);
    assert(el.position === expectedPos, `[SCHEMA POSITION] Element ${index} position is ${el.position}, expected ${expectedPos} in ${pageContext}`);
    assert(!seenPositions.has(el.position), `[SCHEMA DUPLICATE POSITION] Duplicate position ${el.position} in ${pageContext}`);
    seenPositions.add(el.position);

    // Name checks
    assert(typeof el.name === 'string' && el.name.trim().length > 0, `[SCHEMA NAME EMPTY] Element ${index} name is empty in ${pageContext}`);
    assert(el.name === trail[index].name, `[SCHEMA NAME MISMATCH] Element ${index} name "${el.name}" does not match trail name "${trail[index].name}" in ${pageContext}`);

    // Keyword stuffing check
    for (const kw of badKeywords) {
      assert(!el.name.includes(kw), `[KEYWORD STUFFING] Element ${index} contains stuffed phrase "${kw}" in ${pageContext}`);
    }
    assert(el.name.length <= 60, `[LABEL TOO LONG] Breadcrumb label "${el.name}" is ${el.name.length} chars (> 60) in ${pageContext}`);

    // URL checks
    assert(typeof el.item === 'string' && el.item.startsWith('https://'), `[SCHEMA URL NON-HTTPS] Element ${index} URL "${el.item}" is not HTTPS in ${pageContext}`);
    assert(el.item.startsWith(baseUrl), `[SCHEMA HOSTNAME MISMATCH] Element ${index} URL "${el.item}" does not use production baseUrl in ${pageContext}`);
    assert(!el.item.includes('localhost'), `[LOCALHOST LEAK] Element ${index} contains localhost in ${pageContext}`);
    assert(!el.item.includes('?'), `[QUERY STRING IN URL] Element ${index} contains query parameter in ${pageContext}`);
    assert(!el.item.includes('#'), `[FRAGMENT IN URL] Element ${index} contains URL fragment in ${pageContext}`);

    // No duplicate URLs in one trail
    assert(!seenUrls.has(el.item), `[DUPLICATE URL IN TRAIL] URL "${el.item}" duplicated in ${pageContext}`);
    seenUrls.add(el.item);

    // Check against nonexistent hubs
    if (!servicesHubExists) {
      assert(el.item !== `${baseUrl}/services` && el.item !== `${baseUrl}/services/`, `[NONEXISTENT HUB LINK] Linked to nonexistent /services in ${pageContext}`);
    }
    if (!routesHubExists) {
      assert(el.item !== `${baseUrl}/routes` && el.item !== `${baseUrl}/routes/`, `[NONEXISTENT HUB LINK] Linked to nonexistent /routes in ${pageContext}`);
    }

    // Check parent links
    if (index < trail.length - 1) {
      const parentPath = new URL(el.item).pathname;
      if (parentPath === '/') {
        assert(fs.existsSync(path.join(ROOT, 'src/app/page.tsx')), `[PARENT 404] Homepage src/app/page.tsx missing for ${pageContext}`);
      } else if (parentPath === '/areas') {
        assert(areasHubExists, `[PARENT 404] /areas missing for ${pageContext}`);
      } else if (parentPath === '/case-studies') {
        assert(caseStudiesHubExists, `[PARENT 404] /case-studies missing for ${pageContext}`);
      }
    }
  });

  // Final item matches canonical URL
  if (canonicalUrl) {
    const finalItem = schema.itemListElement[schema.itemListElement.length - 1];
    assert(finalItem.item === canonicalUrl, `[CANONICAL MISMATCH] Final item URL "${finalItem.item}" does not match canonical "${canonicalUrl}" in ${pageContext}`);
  }
}

// 1. Areas hub
validateBreadcrumbs(breadcrumbsHelper.getAreasBreadcrumbs(), 'Areas Hub (/areas)', `${baseUrl}/areas`);

// 2. All 17 Local Areas
for (const area of localAreas) {
  const trail = breadcrumbsHelper.getAreaDetailBreadcrumbs(area);
  assert(trail.length === 3, `[AREA TRAIL DEPTH] Area ${area.slug} breadcrumbs depth is ${trail.length}, expected 3`);
  assert(trail[1].name === 'พื้นที่ให้บริการ', `[AREA PARENT LABEL] Expected "พื้นที่ให้บริการ" in ${area.slug}`);
  assert(!trail[2].name.startsWith('รถรับจ้าง'), `[AREA KEYWORD STUFFING] Area breadcrumb label "${trail[2].name}" should not start with "รถรับจ้าง"`);
  validateBreadcrumbs(trail, `Area: ${area.slug}`, `${baseUrl}/areas/${area.slug}`);
}

// 3. All 10 Services
for (const service of servicesData) {
  const trail = breadcrumbsHelper.getServiceDetailBreadcrumbs(service);
  assert(trail.length === 2, `[SERVICE TRAIL DEPTH] Service ${service.slug} breadcrumbs depth is ${trail.length}, expected 2`);
  assert(trail[0].name === 'หน้าแรก' && trail[0].href === '/', `[SERVICE ROOT] Service ${service.slug} must start with หน้าแรก /`);
  assert(!trail[1].name.includes('ราคาถูกที่สุด'), `[SERVICE KEYWORD STUFFING] Service breadcrumb label "${trail[1].name}" contains bad keywords`);
  validateBreadcrumbs(trail, `Service: ${service.slug}`, `${baseUrl}/services/${service.slug}`);
}

// 4. All 18 Routes
for (const route of routesData) {
  const trail = breadcrumbsHelper.getRouteDetailBreadcrumbs(route);
  assert(trail.length === 2, `[ROUTE TRAIL DEPTH] Route ${route.slug} breadcrumbs depth is ${trail.length}, expected 2`);
  assert(!trail[1].name.includes('รถรับจ้าง'), `[ROUTE KEYWORD STUFFING] Route label "${trail[1].name}" should not contain "รถรับจ้าง" in ${route.slug}`);
  validateBreadcrumbs(trail, `Route: ${route.slug}`, `${baseUrl}/routes/${route.slug}`);
}

// 5. Case Studies hub and all 6 Case Studies
validateBreadcrumbs(breadcrumbsHelper.getCaseStudiesBreadcrumbs(), 'Case Studies Hub (/case-studies)', `${baseUrl}/case-studies`);

for (const cs of caseStudiesData) {
  const trail = breadcrumbsHelper.getCaseStudyDetailBreadcrumbs(cs);
  assert(trail.length === 3, `[CASE STUDY DEPTH] Case Study ${cs.slug} depth is ${trail.length}, expected 3`);
  assert(trail[1].name === 'กรณีศึกษา', `[CASE STUDY PARENT LABEL] Expected "กรณีศึกษา" in ${cs.slug}`);
  assert(!trail[2].name.includes('| MJ-TH Express'), `[CASE STUDY TITLE LEAK] Breadcrumb label contains brand suffix in ${cs.slug}`);
  validateBreadcrumbs(trail, `Case Study: ${cs.slug}`, `${baseUrl}/case-studies/${cs.slug}`);
}

// 6. Static Pages
validateBreadcrumbs(breadcrumbsHelper.getMotorcycleTransportBreadcrumbs(), 'Motorcycle Transport (/motorcycle-transport)', `${baseUrl}/motorcycle-transport`);
validateBreadcrumbs(breadcrumbsHelper.getPortfolioBreadcrumbs(), 'Portfolio (/portfolio)', `${baseUrl}/portfolio`);
validateBreadcrumbs(breadcrumbsHelper.getReviewsBreadcrumbs(), 'Reviews (/reviews)', `${baseUrl}/reviews`);
validateBreadcrumbs(breadcrumbsHelper.getContactBreadcrumbs(), 'Contact (/contact)', `${baseUrl}/contact`);

// ==========================================
// CHECK 10: SITEMAP REGRESSION CHECKS
// ==========================================
console.log('🔟 Checking sitemap regression (no duplicates, no missing existing area URLs)...');
try {
  const sitemapFn = loadTs('src/app/sitemap.ts').default;
  const sitemapEntries = sitemapFn();
  assert(Array.isArray(sitemapEntries) && sitemapEntries.length > 0, '[SITEMAP EMPTY] Sitemap did not return valid entries');
  
  const seenSitemapUrls = new Set();
  for (const entry of sitemapEntries) {
    assert(!seenSitemapUrls.has(entry.url), `[SITEMAP DUPLICATE URL] Duplicate URL in sitemap: ${entry.url}`);
    seenSitemapUrls.add(entry.url);
  }

  // Verify all 17 existing localAreas are present in sitemap
  for (const area of localAreas) {
    const expectedAreaUrl = `${baseUrl}/areas/${area.slug}`;
    assert(seenSitemapUrls.has(expectedAreaUrl), `[SITEMAP MISSING AREA] Area "${area.slug}" missing from sitemap: ${expectedAreaUrl}`);
  }

  // Verify all services, routes, and case studies are present
  for (const service of servicesData) {
    const expectedServiceUrl = service.slug === 'motorcycle-transport' ? `${baseUrl}/motorcycle-transport` : `${baseUrl}/services/${service.slug}`;
    assert(seenSitemapUrls.has(expectedServiceUrl), `[SITEMAP MISSING SERVICE] Service "${service.slug}" missing from sitemap`);
  }
  for (const route of routesData) {
    assert(seenSitemapUrls.has(`${baseUrl}/routes/${route.slug}`), `[SITEMAP MISSING ROUTE] Route "${route.slug}" missing from sitemap`);
  }
  for (const cs of caseStudiesData) {
    assert(seenSitemapUrls.has(`${baseUrl}/case-studies/${cs.slug}`), `[SITEMAP MISSING CASE STUDY] Case study "${cs.slug}" missing from sitemap`);
  }
} catch (e) {
  errors.push(`[SITEMAP CHECK FAILED] Failed to validate sitemap: ${e.message}`);
}

// ==========================================
// CHECK 11: CANONICAL REGRESSION (UNIQUE & NON-CONFLICTING)
// ==========================================
console.log('1️⃣1️⃣ Checking unique canonical per indexable page and no conflicting canonicals...');
const coreIndexablePages = [
  { path: '/', canonical: `${baseUrl}/` },
  { path: '/areas', canonical: `${baseUrl}/areas` },
  { path: '/case-studies', canonical: `${baseUrl}/case-studies` },
  { path: '/portfolio', canonical: `${baseUrl}/portfolio` },
  { path: '/reviews', canonical: `${baseUrl}/reviews` },
  { path: '/contact', canonical: `${baseUrl}/contact` },
];

for (const core of coreIndexablePages) {
  validateCanonical(core.canonical, core.path, 'CorePage', core.path);
}

// ==========================================
// CHECK 12: ACCIDENTAL NOINDEX REGRESSION
// ==========================================
console.log('1️⃣2️⃣ Checking for accidental noindex on indexable pages and layouts...');
const routeFilesToCheck = [
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/app/areas/page.tsx',
  'src/app/areas/[slug]/page.tsx',
  'src/app/case-studies/page.tsx',
  'src/app/case-studies/[slug]/page.tsx',
  'src/app/services/[slug]/page.tsx',
  'src/app/routes/[slug]/page.tsx',
  'src/app/motorcycle-transport/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/portfolio/page.tsx',
  'src/app/reviews/page.tsx',
];

for (const relFile of routeFilesToCheck) {
  const fullPath = path.join(ROOT, relFile);
  if (fs.existsSync(fullPath)) {
    const code = fs.readFileSync(fullPath, 'utf8');
    assert(!code.includes('noindex'), `[ACCIDENTAL NOINDEX] Found accidental "noindex" in ${relFile}`);
  }
}

// ==========================================
// CHECK 13: PROTECTED RANKING PAGES METADATA REGRESSION
// ==========================================
console.log('1️⃣3️⃣ Verifying protected ranking pages metadata (/, /areas/bang-khae, /areas/nong-khaem)...');
// 1. Homepage (/)
const homepageCode = fs.readFileSync(path.join(ROOT, 'src/app/page.tsx'), 'utf8');
assert(homepageCode.includes('title: "รถรับจ้างย้ายบ้าน ขนของ ขนส่งมอเตอร์ไซค์ กระบะตู้ทึบ 4 ล้อ - MJ-TH Express"'), '[PROTECTED METADATA] Homepage title has been modified!');
assert(homepageCode.includes('description:'), '[PROTECTED METADATA] Homepage description missing!');
assert(homepageCode.includes('canonicalPath: "/"'), '[PROTECTED METADATA] Homepage canonicalPath has been modified!');
assert(homepageCode.includes('รถรับจ้างขนของ ย้ายบ้าน ย้ายหอพัก ด้วยรถกระบะ 4 ล้อตู้ทึบ บริการทั่วไทย'), '[PROTECTED METADATA] Homepage H1 text has been modified!');
assert(homepageCode.includes('บริการรถรับจ้างขนย้ายครบวงจร พิกัดหลักบางแค เพชรเกษม ฝั่งธนบุรี พร้อมทีมงานยกของมืออาชีพ รถกระบะตู้ทึบช่วยป้องกันแดดและฝนอย่างมั่นใจ'), '[PROTECTED METADATA] Homepage opening copy has been modified!');

// 2. Bang Khae (/areas/bang-khae)
const bangKhaeArea = localAreas.find(a => a.slug === 'bang-khae');
assert(bangKhaeArea, '[PROTECTED METADATA] /areas/bang-khae missing from localAreas dataset!');
assert(bangKhaeArea.title === 'รถรับจ้างบางแค ขนของ ย้ายบ้าน รถกระบะตู้ทึบ | MJ-TH Express', `[PROTECTED METADATA] Bang Khae title modified: "${bangKhaeArea.title}"`);
assert(bangKhaeArea.description === 'รถรับจ้างบางแค ขนของ ย้ายบ้าน ย้ายหอและคอนโด ด้วยรถกระบะ 4 ล้อตู้ทึบ กันแดดกันฝน พร้อมบริการขนย้ายในกรุงเทพฯ และต่างจังหวัด โทร 095-583-0371', '[PROTECTED METADATA] Bang Khae description modified!');
assert(bangKhaeArea.canonical === 'https://www.mj-th-express.com/areas/bang-khae', '[PROTECTED METADATA] Bang Khae canonical modified!');
assert(bangKhaeArea.h1 === 'รถรับจ้างบางแค ขนของ ย้ายบ้าน ด้วยรถกระบะตู้ทึบ', '[PROTECTED METADATA] Bang Khae H1 text modified!');

// 3. Nong Khaem (/areas/nong-khaem)
const nongKhaemArea = localAreas.find(a => a.slug === 'nong-khaem');
assert(nongKhaemArea, '[PROTECTED METADATA] /areas/nong-khaem missing from localAreas dataset!');
assert(nongKhaemArea.title === 'รถรับจ้างหนองแขม ย้ายบ้าน ขนของ รถกระบะตู้ทึบ เพชรเกษม 81 | MJ-TH Express', `[PROTECTED METADATA] Nong Khaem title modified: "${nongKhaemArea.title}"`);
assert(nongKhaemArea.description === 'บริการรถกระบะรับจ้างหนองแขม เพชรเกษม 81, 69, 77, 110 ขนของ ย้ายบ้าน ย้ายหอพัก คอนโด ส่งมอเตอร์ไซค์ พร้อมทีมงานช่วยยกของด่วน โทร 095-583-0371', '[PROTECTED METADATA] Nong Khaem description modified!');
assert(nongKhaemArea.canonical === 'https://www.mj-th-express.com/areas/nong-khaem', '[PROTECTED METADATA] Nong Khaem canonical modified!');
assert(nongKhaemArea.h1 === 'รถรับจ้างหนองแขม รถกระบะขนของ ย้ายหอพัก–ย้ายบ้าน', '[PROTECTED METADATA] Nong Khaem H1 text modified!');

// ==========================================
// CHECK 14: NO BROKEN INTERNAL LINKS REGRESSION
// ==========================================
console.log('1️⃣4️⃣ Checking for broken internal links in contextual relations...');
try {
  const internalLinks = loadTs('src/data/seo/internal-links.ts');
  for (const area of localAreas) {
    const nearby = internalLinks.getRelatedAreasForArea(area.slug);
    for (const item of nearby) {
      assert(areaSlugSet.has(item.slug), `[BROKEN INTERNAL LINK] Area "${area.slug}" links to missing area "${item.slug}"`);
    }
    const services = internalLinks.getRelatedServicesForArea(area.slug);
    for (const item of services) {
      assert(serviceSlugSet.has(item.slug), `[BROKEN INTERNAL LINK] Area "${area.slug}" links to missing service "${item.slug}"`);
    }
    const routes = internalLinks.getRelatedRoutesForArea(area.slug);
    for (const item of routes) {
      assert(routeSlugSet.has(item.slug), `[BROKEN INTERNAL LINK] Area "${area.slug}" links to missing route "${item.slug}"`);
    }
    const matchingCs = internalLinks.getCaseStudiesForEntity(area.slug, 'area');
    for (const cs of matchingCs) {
      assert(caseStudySlugSet.has(cs.slug), `[BROKEN INTERNAL LINK] Area "${area.slug}" links to missing case study "${cs.slug}"`);
    }
  }
} catch (e) {
  errors.push(`[INTERNAL LINKS REGRESSION ERROR] ${e.message}`);
}

// ==========================================
// CHECK 15: SINGLE H1 PER PAGE REGRESSION
// ==========================================
console.log('1️⃣5️⃣ Checking single H1 per page...');
for (const area of localAreas) {
  assert(area.h1 && area.h1.trim().length > 0, `[MISSING H1] Area "${area.slug}" missing H1`);
  assert(!area.h1.includes('<h1'), `[NESTED H1] Area "${area.slug}" contains nested <h1> tag`);
}
for (const service of servicesData) {
  assert(service.h1 && service.h1.trim().length > 0, `[MISSING H1] Service "${service.slug}" missing H1`);
  assert(!service.h1.includes('<h1'), `[NESTED H1] Service "${service.slug}" contains nested <h1> tag`);
}
for (const route of routesData) {
  assert(route.h1 && route.h1.trim().length > 0, `[MISSING H1] Route "${route.slug}" missing H1`);
  assert(!route.h1.includes('<h1'), `[NESTED H1] Route "${route.slug}" contains nested <h1> tag`);
}
for (const cs of caseStudiesData) {
  assert(cs.h1 && cs.h1.trim().length > 0, `[MISSING H1] Case study "${cs.slug}" missing H1`);
  assert(!cs.h1.includes('<h1'), `[NESTED H1] Case study "${cs.slug}" contains nested <h1> tag`);
}

// Check compiled HTML if available in .next
const serverAppDir = path.join(ROOT, '.next/server/app');
if (fs.existsSync(serverAppDir)) {
  const checkHtmlFiles = [
    'index.html',
    'areas.html',
    'areas/bang-khae.html',
    'areas/nong-khaem.html',
    'case-studies.html',
    'motorcycle-transport.html'
  ];
  for (const hf of checkHtmlFiles) {
    const fullHf = path.join(serverAppDir, hf);
    if (fs.existsSync(fullHf)) {
      const html = fs.readFileSync(fullHf, 'utf8');
      const h1Count = (html.match(/<h1[^>]*>[\s\S]*?<\/h1>/g) || []).length;
      assert(h1Count === 1, `[MULTIPLE OR MISSING H1] Rendered page ${hf} has ${h1Count} <h1> tags (must be exactly 1)`);
    }
  }
}

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
