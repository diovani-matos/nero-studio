import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://nero-studio.vercel.app/sitemap.xml',
    host: 'https://nero-studio.vercel.app',
  }
}
