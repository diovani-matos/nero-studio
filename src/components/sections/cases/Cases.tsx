'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap/config'
import styles from './Cases.module.css'

const CASES = [
  {
    number: '01',
    category: 'E-commerce · Moda',
    title: 'Loja de moda que triplicou as vendas',
    resultValue: '+340%',
    resultLabel: 'em vendas em 6 meses',
    description:
      'Estratégia completa de tráfego pago e social media que transformou uma loja local em referência nacional do segmento.',
    href: '#',
  },
  {
    number: '02',
    category: 'Saúde · Performance',
    title: 'Clínica médica com agenda lotada',
    resultValue: '+180%',
    resultLabel: 'de agendamentos via digital',
    description:
      'SEO local, Google Ads e presença nas redes sociais que eliminou os horários vazios em menos de 90 dias.',
    href: '#',
  },
  {
    number: '03',
    category: 'Imóveis · Tráfego Pago',
    title: 'Construtora que vendeu R$8M em 60 dias',
    resultValue: 'R$8M',
    resultLabel: 'em imóveis vendidos',
    description:
      'Campanhas de Meta Ads e Google Ads com landing pages otimizadas que geraram leads qualificados de alto ticket.',
    href: '#',
  },
]

export function Cases() {
  const sectionRef = useRef<HTMLElement>(null)
  const headLeftRef = useRef<HTMLDivElement>(null)
  const headRightRef = useRef<HTMLAnchorElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) return

      const cards = gridRef.current
        ? Array.from(
            gridRef.current.querySelectorAll<HTMLElement>(`:scope > *`),
          )
        : []

      gsap.set(headLeftRef.current, { opacity: 0, x: -40 })
      gsap.set(headRightRef.current, { opacity: 0, x: 40 })
      gsap.set(cards, { opacity: 0, y: 50 })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: () => {
          const tl = gsap.timeline()

          tl.to([headLeftRef.current, headRightRef.current], {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
          }).to(
            cards,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.15,
            },
            '+=0.2',
          )
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <div ref={headLeftRef} className={styles.headLeft}>
            <div className={styles.tag}>
              <span className={styles.tagLine} aria-hidden="true" />
              03 — Cases
            </div>
            <h2 className={styles.title}>
              <span>Resultados que</span>
              <span>falam por si.</span>
            </h2>
          </div>

          <Link
            ref={headRightRef}
            href="/cases"
            className={styles.viewAll}
          >
            Ver todos os cases →
          </Link>
        </div>

        {/* Cases grid */}
        <div ref={gridRef} className={styles.grid}>
          {CASES.map(({ number, category, title, resultValue, resultLabel, description, href }) => (
            <Link key={number} href={href} className={styles.card} onClick={(e) => e.preventDefault()}>
              <span className={styles.caseNumber} aria-hidden="true">
                {number}
              </span>

              <span className={styles.category}>{category}</span>

              <h3 className={styles.caseTitle}>{title}</h3>

              <div className={styles.result}>
                <span className={styles.resultValue}>{resultValue}</span>
                <span className={styles.resultLabel}>{resultLabel}</span>
              </div>

              <p className={styles.description}>{description}</p>

              <span className={styles.caseLink}>Ver case completo →</span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
