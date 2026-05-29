import type { Metadata } from 'next'
import { Hero } from '@/components/sections/hero/Hero'
import { Servicos } from '@/components/sections/servicos/Servicos'
import { Numeros } from '@/components/sections/numeros/Numeros'
import { Cases } from '@/components/sections/cases/Cases'
import { CTA } from '@/components/sections/cta/CTA'

export const metadata: Metadata = {
  title: 'Nero Studio — Agência de Marketing Digital em São Paulo',
  description:
    'Geração de resultados reais: R$ 50M+ em vendas, 200+ clientes, 8 anos de mercado. Tráfego pago, social media, branding, SEO e sites.',
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Servicos />
      <Numeros />
      <Cases />
      <CTA />
    </main>
  )
}
