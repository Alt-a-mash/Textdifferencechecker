// scripts/generate-sitemap.js
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');


async function generate() {
const smStream = new SitemapStream({ hostname: 'https://www.textdiffchecker.net' });


// Add pages here. Add more entries when you add more routes
smStream.write({ url: '/', changefreq: 'weekly', priority: 1.0, lastmodISO: new Date().toISOString() });


// If you add more pages, push them similarly:
// smStream.write({ url: '/about', changefreq: 'monthly', priority: 0.6, lastmodISO: new Date().toISOString() });


smStream.end();


const data = await streamToPromise(smStream);
require('fs').writeFileSync('public/sitemap.xml', data.toString());
console.log('sitemap.xml written to public/sitemap.xml');
}


generate().catch(err => {
console.error(err);
process.exit(1);
});
