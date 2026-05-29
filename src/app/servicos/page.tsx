import type { Metadata } from 'next'
import { ServicosHero } from '@/components/sections/servicos-page/ServicosHero'
import { ServicosDetalhe } from '@/components/sections/servicos-page/ServicosDetalhe'

export const metadata: Metadata = {
  title: 'Serviços — Nero Studio',
  description:
    'Tráfego pago, social media, branding, SEO e criação de sites. Estratégia integrada para marcas que querem liderar.',
  alternates: { canonical: '/servicos' },
}

export default function ServicosPage() {
  return (
    <main>
      <ServicosHero />
      <ServicosDetalhe />
    </main>
  )
}
