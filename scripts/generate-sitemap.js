// scripts/generate-sitemap.js
(async function() {
  try {
    const { SitemapStream, streamToPromise } = require('sitemap');
    const fs = require('fs');

    const smStream = new SitemapStream({ hostname: 'https://www.textdiffchecker.net' });

    smStream.write({ url: '/', changefreq: 'weekly', priority: 1.0, lastmodISO: new Date().toISOString() });

    // add other pages if you have them:
    // smStream.write({ url: '/about', changefreq: 'monthly', priority: 0.6, lastmodISO: new Date().toISOString() });

    smStream.end();
    const data = await streamToPromise(smStream);
    fs.writeFileSync('public/sitemap.xml', data.toString());
    console.log('sitemap.xml written to public/sitemap.xml');
    process.exit(0);
  } catch (err) {
    // If the module is missing, print friendly message and exit 0 so build continues.
    if (err.code === 'MODULE_NOT_FOUND') {
      console.error('sitemap module not found. Skipping sitemap generation. Install "sitemap" in package.json to enable it.');
      process.exit(0);
    }
    console.error('Error while generating sitemap:', err);
    process.exit(1);
  }
})();
