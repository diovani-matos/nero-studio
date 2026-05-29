import type { Metadata } from 'next'
import { ContatoHero } from '@/components/sections/contato-page/ContatoHero'
import { ContatoForm } from '@/components/sections/contato-page/ContatoForm'

export const metadata: Metadata = {
  title: 'Contato — Nero Studio',
  description:
    'Vamos construir juntos a estratégia que vai levar sua marca ao próximo nível. Entre em contato com a Nero Studio.',
  alternates: { canonical: '/contato' },
}

export default function ContatoPage() {
  return (
    <main>
      <ContatoHero />
      <ContatoForm />
    </main>
  )
}
