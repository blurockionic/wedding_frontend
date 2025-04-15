const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 }, // Root homepage
  { url: '/about', changefreq: 'weekly', priority: 0.9 },
  { url: '/contactus', changefreq: 'weekly', priority: 0.9 },
  { url: '/login', changefreq: 'weekly', priority: 0.7 },
  { url: '/signup', changefreq: 'weekly', priority: 0.7 },
  { url: '/services', changefreq: 'daily', priority: 0.7 },
  { url: '/vendorlogin', changefreq: 'daily', priority: 0.8},
  { url: '/vendorsignup', changefreq: 'daily', priority: 0.8},
  { url: '/all', changefreq: 'daily', priority: 0.8},
  { url: 'https://www.marriagevendors.com/all/undefined/caterers/madhya%20pradesh/gwalior/67acb750e27184a237864d2c', changefreq: 'daily', priority: 0.8 },
  { url: 'https://www.marriagevendors.com/all/undefined/tent%20house/jharkhand/chaibasa/67f2b072394325935acd4cad', changefreq: 'daily', priority: 0.8 },
  { url: 'https://www.marriagevendors.com/all/undefined/wedding%20photographers/jharkhand/jamshedpur/67f38783dcc8b080bff96e7c', changefreq: 'daily', priority: 0.8 },
  { url: 'https://www.marriagevendors.com/all/undefined/wedding%20photographers/jharkhand/chaibasa/67f3f45f880a10cefe3cf49d', changefreq: 'daily', priority: 0.8 },
  { url: 'https://www.marriagevendors.com/all/undefined/wedding%20photographers/jharkhand/ranchi/67f76f42c96e1f46a3b2e2db', changefreq: 'daily', priority: 0.8 },
  { url: 'https://www.marriagevendors.com/all/undefined/caterers/jammu%20and%20kashmir/jammu/67f771a9c96e1f46a3b2e2e0', changefreq: 'daily', priority: 0.8 },
  { url: 'https://www.marriagevendors.com/all/undefined/wedding%20videographers/jharkhand/ranchi/67f7728ec96e1f46a3b2e2e2', changefreq: 'daily', priority: 0.8 },

  

  
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
