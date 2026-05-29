import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { LenisProvider } from '@/lib/lenis/provider'
import { Header } from '@/components/layout/header/Header'
import { Footer } from '@/components/layout/footer/Footer'
import { ScrollToTop } from '@/components/ui/scroll-to-top/ScrollToTop'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nero Studio — Agência de Marketing Digital',
  description:
    'Nero Studio é uma agência full service de marketing digital em São Paulo. Tráfego pago, social media, branding, SEO e criação de sites com resultados comprovados.',
  metadataBase: new URL('https://nero-studio.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://nero-studio.vercel.app',
    siteName: 'Nero Studio',
    title: 'Nero Studio — Agência de Marketing Digital',
    description:
      'Agência full service em São Paulo. R$ 50M+ gerados para clientes em 8 anos de mercado.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nero Studio — Agência de Marketing Digital',
    description:
      'Agência full service em São Paulo. R$ 50M+ gerados para clientes em 8 anos de mercado.',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://nero-studio.vercel.app/#organization',
                  name: 'Nero Studio',
                  url: 'https://nero-studio.vercel.app',
                  logo: 'https://nero-studio.vercel.app/logo.png',
                  description:
                    'Agência de marketing digital full service em São Paulo. Tráfego pago, social media, branding, SEO e criação de sites.',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'São Paulo',
                    addressRegion: 'SP',
                    addressCountry: 'BR',
                  },
                  contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+55-11-99999-0000',
                    contactType: 'customer service',
                    availableLanguage: 'Portuguese',
                  },
                  sameAs: [
                    'https://instagram.com/nerostudio',
                    'https://linkedin.com/company/nerostudio',
                  ],
                },
                {
                  '@type': 'LocalBusiness',
                  '@id': 'https://nero-studio.vercel.app/#localbusiness',
                  name: 'Nero Studio',
                  url: 'https://nero-studio.vercel.app',
                  priceRange: '$$',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'São Paulo',
                    addressRegion: 'SP',
                    addressCountry: 'BR',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <LenisProvider>
          <ScrollToTop />
          <Header />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
