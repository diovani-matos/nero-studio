import type { Metadata } from 'next'
import { SobreHero } from '@/components/sections/sobre-page/SobreHero'
import { SobreValores } from '@/components/sections/sobre-page/SobreValores'

export const metadata: Metadata = {
  title: 'Sobre — Nero Studio',
  description:
    'Conheça a Nero Studio. 8 anos de mercado, 200+ clientes atendidos e R$50M em vendas geradas. Estratégia, execução e resultado.',
  alternates: { canonical: '/sobre' },
}

export default function SobrePage() {
  return (
    <main>
      <SobreHero />
      <SobreValores />
    </main>
  )
}
