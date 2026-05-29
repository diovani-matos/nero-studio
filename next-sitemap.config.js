/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://nerostudio.com.br',
  generateRobotsTxt: false,
  changefreq: 'monthly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*'],
}
