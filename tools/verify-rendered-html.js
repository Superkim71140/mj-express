const fs = require('fs');
const path = require('path');

const targets = [
  'index',
  'areas',
  'areas/bang-khae',
  'areas/nong-khaem',
  'areas/bang-bon',
  'areas/phasi-charoen',
  'areas/thawi-watthana',
  'areas/krathum-baen',
  'areas/sam-phran',
  'areas/salaya',
  'motorcycle-transport',
  'services/moving-house',
  'routes/bangkok-to-chiang-mai',
  'case-studies/condo-moving-phranakhon-to-bangkae',
  'contact',
  'reviews',
  'portfolio',
  'case-studies'
];

console.log('=== VERIFYING COMPILED PRODUCTION HTML ===\n');

let allPassed = true;

for (const t of targets) {
  const htmlPath = path.join('.next/server/app', t + '.html');
  if (!fs.existsSync(htmlPath)) {
    console.error(`❌ MISSING HTML FILE: ${htmlPath}`);
    allPassed = false;
    continue;
  }
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  const title = titleMatch ? titleMatch[1] : 'NOT FOUND';

  // Meta description
  const descMatch = html.match(/<meta name="description" content="([^"]*)"/);
  const description = descMatch ? descMatch[1] : 'NOT FOUND';

  // Canonical
  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]*)"/);
  const canonical = canonicalMatch ? canonicalMatch[1] : 'NOT FOUND';

  // H1
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  const h1Count = h1Matches.length;
  const h1 = h1Matches.map(m => m[1].replace(/<[^>]+>/g, '').trim()).join(' | ');

  // Robots
  const robotsMatch = html.match(/<meta name="robots" content="([^"]*)"/);
  const robots = robotsMatch ? robotsMatch[1] : 'index, follow (default)';

  // Checks for dangerous data
  const hasAggregateRating = html.includes('"aggregateRating"') || html.includes('"ratingValue"');
  // Check for fake branch coordinates: ONLY headquarters coordinates (13.7367, 100.3632) in MovingCompany are allowed
  const geoMatches = [...html.matchAll(/"GeoCoordinates"/g)];
  const hasMultipleGeo = geoMatches.length > 1;
  const hasFakeStudentReviews = html.includes('น้องมายด์') || html.includes('เต้') || html.includes('VerifiedStudentReviews');
  const hasMahidolSameAs = html.includes('mahidol.ac.th') || html.includes('wikipedia.org/wiki/มหาวิทยาลัยมหิดล');

  // JSON-LD Scripts
  const jsonLdMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const jsonLdSchemas = [];
  const breadcrumbSchemas = [];
  for (const m of jsonLdMatches) {
    try {
      const parsed = JSON.parse(m[1]);
      const checkObj = (obj) => {
        if (!obj || typeof obj !== 'object') return;
        const type = obj['@type'] || 'unknown';
        jsonLdSchemas.push(type);
        if (type === 'BreadcrumbList') {
          breadcrumbSchemas.push(obj);
        }
      };
      if (Array.isArray(parsed)) {
        parsed.forEach(p => checkObj(p));
      } else {
        checkObj(parsed);
      }
    } catch (e) {
      jsonLdSchemas.push('INVALID_JSON');
    }
  }

  // Breadcrumb HTML verification
  const isHomepage = t === 'index';
  const hasVisibleBreadcrumb = html.includes('aria-label="Breadcrumb"');
  const hasBreadcrumbOl = html.includes('<ol');
  const hasAriaCurrent = html.includes('aria-current="page"');

  let breadcrumbHtmlPass = false;
  let breadcrumbSchemaPass = false;

  if (isHomepage) {
    breadcrumbHtmlPass = !hasVisibleBreadcrumb;
    breadcrumbSchemaPass = breadcrumbSchemas.length === 0;
  } else {
    breadcrumbHtmlPass = hasVisibleBreadcrumb && hasAriaCurrent;
    breadcrumbSchemaPass = breadcrumbSchemas.length === 1; // exactly 1 BreadcrumbList

    if (breadcrumbSchemas.length === 1) {
      const bc = breadcrumbSchemas[0];
      if (Array.isArray(bc.itemListElement) && bc.itemListElement.length >= 2) {
        const sequential = bc.itemListElement.every((item, idx) => item.position === idx + 1);
        const nonNullNames = bc.itemListElement.every(item => typeof item.name === 'string' && item.name.length > 0);
        const lastMatchesCanonical = bc.itemListElement[bc.itemListElement.length - 1].item === canonical;
        const noNonexistentHub = bc.itemListElement.every(item => !item.item.endsWith('/services') && !item.item.endsWith('/routes'));
        breadcrumbSchemaPass = sequential && nonNullNames && lastMatchesCanonical && noNonexistentHub;
      } else {
        breadcrumbSchemaPass = false;
      }
    }
  }

  const passRating = !hasAggregateRating;
  const passGeo = !hasMultipleGeo;
  const passReviews = !hasFakeStudentReviews;
  const passSameAs = !hasMahidolSameAs;

  if (!passRating || !passGeo || !passReviews || !passSameAs || !breadcrumbHtmlPass || !breadcrumbSchemaPass) {
    allPassed = false;
  }

  console.log(`URL: /${t === 'index' ? '' : t}`);
  console.log(`  Title: ${title}`);
  console.log(`  Canonical: ${canonical}`);
  console.log(`  H1 (${h1Count}): ${h1}`);
  console.log(`  Robots: ${robots}`);
  console.log(`  Schemas: [${jsonLdSchemas.join(', ')}]`);
  console.log(`  Breadcrumb Checks:`);
  console.log(`    - Visible HTML Breadcrumb: ${breadcrumbHtmlPass ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`    - BreadcrumbList Schema (count=${breadcrumbSchemas.length}): ${breadcrumbSchemaPass ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  Safety Checks:`);
  console.log(`    - Has aggregateRating: ${passRating ? '✅ NONE' : '❌ FAIL'}`);
  console.log(`    - Multiple / Fake Coordinates: ${passGeo ? '✅ NONE' : '❌ FAIL'}`);
  console.log(`    - Fake student reviews: ${passReviews ? '✅ NONE' : '❌ FAIL'}`);
  console.log(`    - Mahidol sameAs: ${passSameAs ? '✅ NONE' : '❌ FAIL'}`);
  console.log('');
}

if (!allPassed) {
  console.error('❌ SOME HTML SAFETY/BREADCRUMB CHECKS FAILED');
  process.exit(1);
} else {
  console.log('✅ ALL RENDERED HTML SAFETY & BREADCRUMB CHECKS PASSED!');
}
