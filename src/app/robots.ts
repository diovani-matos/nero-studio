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
    sitemap: 'https://nerostudio.com.br/sitemap.xml',
    host: 'https://nerostudio.com.br',
  }
}
