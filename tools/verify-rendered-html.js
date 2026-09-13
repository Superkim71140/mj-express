const fs = require('fs');
const path = require('path');

const targets = [
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
  for (const m of jsonLdMatches) {
    try {
      const parsed = JSON.parse(m[1]);
      if (Array.isArray(parsed)) {
        parsed.forEach(p => jsonLdSchemas.push(p['@type'] || 'unknown'));
      } else {
        jsonLdSchemas.push(parsed['@type'] || 'unknown');
      }
    } catch (e) {
      jsonLdSchemas.push('INVALID_JSON');
    }
  }

  const passRating = !hasAggregateRating;
  const passGeo = !hasMultipleGeo;
  const passReviews = !hasFakeStudentReviews;
  const passSameAs = !hasMahidolSameAs;

  if (!passRating || !passGeo || !passReviews || !passSameAs) {
    allPassed = false;
  }

  console.log(`URL: /${t}`);
  console.log(`  Title: ${title}`);
  console.log(`  Canonical: ${canonical}`);
  console.log(`  H1 (${h1Count}): ${h1}`);
  console.log(`  Robots: ${robots}`);
  console.log(`  Schemas: [${jsonLdSchemas.join(', ')}]`);
  console.log(`  Safety Checks:`);
  console.log(`    - Has aggregateRating: ${passRating ? '✅ NONE' : '❌ FAIL'}`);
  console.log(`    - Multiple / Fake Coordinates: ${passGeo ? '✅ NONE' : '❌ FAIL'}`);
  console.log(`    - Fake student reviews: ${passReviews ? '✅ NONE' : '❌ FAIL'}`);
  console.log(`    - Mahidol sameAs: ${passSameAs ? '✅ NONE' : '❌ FAIL'}`);
  console.log('');
}

if (!allPassed) {
  console.error('❌ SOME HTML SAFETY CHECKS FAILED');
  process.exit(1);
} else {
  console.log('✅ ALL RENDERED HTML SAFETY CHECKS PASSED!');
}
