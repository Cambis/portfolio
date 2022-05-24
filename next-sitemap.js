/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_SITE_URL || process.env.VERCEL_URL || 'localhost:3000',
  generateRobotsTxt: true,
  exclude: [''],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'DatoCmsSearchBot',
        disallow: ['/search', '/404', '/500'],
      },
    ],
  },
};
