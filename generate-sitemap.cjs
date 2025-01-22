const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 }, // Root homepage
  { url: '/section/Home', changefreq: 'daily', priority: 1.0 }, // Another home section page
  { url: '/section/About', changefreq: 'weekly', priority: 0.9 },
  { url: 'section/Bride', changefreq: 'weekly', priority: 0.7 },
  { url: 'section/PanningTools', changefreq: 'weekly', priority: 0.7 },
  { url: 'section/WeddingVendors', changefreq: 'weekly', priority: 0.7 },
  { url: 'section/WeddingVenues', changefreq: 'weekly', priority: 0.6 },
  { url: 'section/Grooms', changefreq: 'monthly', priority: 0.6 },
  // Add other routes here
];

(async () => {
  const stream = new SitemapStream({ hostname: 'https://www.marriagevendors.com/' });
  const writeStream = createWriteStream('./public/sitemap.xml');
  
  stream.pipe(writeStream);
  
  links.forEach(link => stream.write(link));
  stream.end();

  await streamToPromise(stream);
  console.log('Sitemap generated successfully!');
})();
