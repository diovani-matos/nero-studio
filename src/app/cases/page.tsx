import type { Metadata } from 'next'
import { CasesHero } from '@/components/sections/cases-page/CasesHero'
import { CasesGrid } from '@/components/sections/cases-page/CasesGrid'

export const metadata: Metadata = {
  title: 'Cases — Nero Studio',
  description:
    'Resultados reais de clientes reais. +340% em vendas, R$8M em imóveis vendidos, +180% de agendamentos. Veja como fazemos.',
  alternates: { canonical: '/cases' },
}

export default function CasesPage() {
  return (
    <main>
      <CasesHero />
      <CasesGrid />
    </main>
  )
}
