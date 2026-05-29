'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap/config'
import styles from './SobreValores.module.css'

const VALUES = [
  {
    number: '01',
    title: 'Resultado acima de tudo',
    description:
      'Não medimos sucesso em seguidores ou impressões. Medimos em faturamento, leads e ROI. Se não há resultado, não há trabalho bem feito.',
  },
  {
    number: '02',
    title: 'Transparência total',
    description:
      'Você vê tudo: gastos, resultados, estratégias e erros. Relatórios semanais sem filtro e reuniões onde dizemos o que precisa ser dito.',
  },
  {
    number: '03',
    title: 'Velocidade de execução',
    description:
      'Ideias sem execução são inúteis. Nosso processo é ágil por design — testamos rápido, aprendemos rápido e escalamos o que funciona.',
  },
  {
    number: '04',
    title: 'Parceria de longo prazo',
    description:
      'Não queremos clientes, queremos parceiros. Nossa taxa de retenção de 98% não é coincidência — é consequência de tratar cada negócio como se fosse o nosso.',
  },
]

export function SobreValores() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) return

      const cards = gridRef.current
        ? Array.from(gridRef.current.querySelectorAll<HTMLElement>(':scope > *'))
        : []

      gsap.set(headerRef.current, { opacity: 0, y: 30 })
      gsap.set(cards, { opacity: 0, y: 30 })

      const tlHeader = gsap.timeline({ paused: true })
      tlHeader.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      })

      const tlCards = gsap.timeline({ paused: true })
      tlCards.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
      })

      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 75%',
        onEnter: () => tlHeader.play(),
      })

      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 75%',
        onEnter: () => tlCards.play(),
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>

        {/* Header */}
        <div ref={headerRef} className={styles.header}>
          <div className={styles.tag}>
            <span className={styles.tagLine} aria-hidden="true" />
            Nossos valores
          </div>
          <h2 className={styles.title}>O que nos move.</h2>
        </div>

        {/* Values grid */}
        <div ref={gridRef} className={styles.grid}>
          {VALUES.map(({ number, title, description }) => (
            <div key={number} className={styles.card}>
              <span className={styles.number}>{number}</span>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.description}>{description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
