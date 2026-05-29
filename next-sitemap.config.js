/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://nero-studio.vercel.app',
  generateRobotsTxt: false,
  changefreq: 'monthly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*'],
}
