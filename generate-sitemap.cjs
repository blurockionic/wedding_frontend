const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 }, // Root homepage
  { url: '/Home', changefreq: 'daily', priority: 1.0 }, // Another home section page
  { url: '/aboutus', changefreq: 'weekly', priority: 0.9 },
  { url: '/contactus', changefreq: 'weekly', priority: 0.9 },
  { url: '/login', changefreq: 'weekly', priority: 0.7 },
  { url: '/signup', changefreq: 'weekly', priority: 0.7 },
  { url: '/services', changefreq: 'daily', priority: 0.7 },
  { url: '/vendorlogin', changefreq: 'daily', priority: 0.8},
  { url: '/vendorsignup', changefreq: 'daily', priority: 0.8},

  
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
