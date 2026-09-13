const https = require('https');

const urls = [
  'https://www.mj-th-express.com/',
  'https://www.mj-th-express.com/areas',
  'https://www.mj-th-express.com/areas/bang-khae',
  'https://www.mj-th-express.com/areas/nong-khaem',
  'https://www.mj-th-express.com/areas/bang-bon',
  'https://www.mj-th-express.com/areas/phasi-charoen',
  'https://www.mj-th-express.com/areas/thawi-watthana',
  'https://www.mj-th-express.com/areas/krathum-baen',
  'https://www.mj-th-express.com/areas/sam-phran',
  'https://www.mj-th-express.com/services/moving-house',
  'https://www.mj-th-express.com/routes/bangkok-to-chiang-mai',
  'https://www.mj-th-express.com/case-studies',
  'https://www.mj-th-express.com/case-studies/condo-moving-phranakhon-to-bangkae',
  'https://www.mj-th-express.com/motorcycle-transport',
  'https://www.mj-th-express.com/portfolio',
  'https://www.mj-th-express.com/reviews',
  'https://www.mj-th-express.com/contact',
  'https://www.mj-th-express.com/sitemap.xml',
  'https://www.mj-th-express.com/robots.txt'
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) MJ-TH-Auditor/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function verifyAll() {
  console.log('=== VERIFYING LIVE PRODUCTION DEPLOYMENT (https://www.mj-th-express.com) ===\n');
  let allOk = true;

  for (const url of urls) {
    try {
      const res = await fetchUrl(url);
      const isXmlOrTxt = url.endsWith('.xml') || url.endsWith('.txt');

      if (isXmlOrTxt) {
        console.log(`URL: ${url}`);
        console.log(`  HTTP: ${res.status}`);
        console.log(`  Content-Type: ${res.headers['content-type']}`);
        console.log(`  Result: ${res.status === 200 ? '✅ PASS' : '❌ FAIL'}\n`);
        if (res.status !== 200) allOk = false;
        continue;
      }

      const html = res.body;
      const isHomepage = url === 'https://www.mj-th-express.com/';

      // 1. Visible Breadcrumb
      const hasNavBreadcrumb = html.includes('aria-label="Breadcrumb"') || html.includes('aria-label=\'Breadcrumb\'');
      const hasAriaCurrent = html.includes('aria-current="page"');

      // 2. Canonical
      const canMatch = html.match(/<link rel="canonical" href="([^"]*)"/);
      const canonical = canMatch ? canMatch[1] : 'NONE';

      // 3. JSON-LD BreadcrumbList schemas
      const jsonLdMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
      let breadcrumbCount = 0;
      let breadcrumbSchemaObj = null;

      for (const m of jsonLdMatches) {
        try {
          const parsed = JSON.parse(m[1]);
          const inspect = (item) => {
            if (item && item['@type'] === 'BreadcrumbList') {
              breadcrumbCount++;
              breadcrumbSchemaObj = item;
            }
          };
          if (Array.isArray(parsed)) parsed.forEach(inspect);
          else inspect(parsed);
        } catch (e) {}
      }

      // Check for fake hub links
      const hasServicesHubLink = html.includes('href="/services"') || html.includes('href="https://www.mj-th-express.com/services"');
      const hasRoutesHubLink = html.includes('href="/routes"') || html.includes('href="https://www.mj-th-express.com/routes"');

      let visiblePass = isHomepage ? !hasNavBreadcrumb : (hasNavBreadcrumb && hasAriaCurrent);
      let schemaPass = isHomepage ? (breadcrumbCount === 0) : (breadcrumbCount === 1);
      let hubSafetyPass = !hasServicesHubLink && !hasRoutesHubLink;
      let canonicalMatchPass = isHomepage || (breadcrumbSchemaObj && breadcrumbSchemaObj.itemListElement && breadcrumbSchemaObj.itemListElement.slice(-1)[0].item === canonical);

      let trailDisplay = 'None';
      if (breadcrumbSchemaObj && breadcrumbSchemaObj.itemListElement) {
        trailDisplay = breadcrumbSchemaObj.itemListElement.map(x => x.name).join(' > ');
      }

      const pass = res.status === 200 && visiblePass && schemaPass && hubSafetyPass && (isHomepage ? true : canonicalMatchPass);
      if (!pass) allOk = false;

      console.log(`URL: ${url}`);
      console.log(`  HTTP: ${res.status}`);
      console.log(`  Visible Breadcrumb: ${visiblePass ? '✅ PASS' : '❌ FAIL'} (hasNav=${hasNavBreadcrumb}, hasAriaCurrent=${hasAriaCurrent})`);
      console.log(`  BreadcrumbList Schemas: ${schemaPass ? '✅ PASS (count=' + breadcrumbCount + ')' : '❌ FAIL (count=' + breadcrumbCount + ')'}`);
      console.log(`  Trail: ${trailDisplay}`);
      console.log(`  Canonical: ${canonical} (match: ${canonicalMatchPass ? '✅ YES' : '❌ NO'})`);
      console.log(`  Hub Safety (no 404 hub links): ${hubSafetyPass ? '✅ SAFE' : '❌ VIOLATION'}`);
      console.log(`  Result: ${pass ? '✅ PASS' : '❌ FAIL'}\n`);

    } catch (e) {
      console.error(`Error checking ${url}:`, e.message);
      allOk = false;
    }
  }

  console.log('==================================================');
  if (allOk) {
    console.log('🎉 ALL LIVE PRODUCTION URLS VERIFIED SUCCESSFULLY!');
    process.exit(0);
  } else {
    console.log('⚠️ Some checks failed or deployment is still propagating.');
    process.exit(1);
  }
}

verifyAll();
