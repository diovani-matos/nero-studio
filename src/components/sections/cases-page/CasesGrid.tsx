'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap/config'
import styles from './CasesGrid.module.css'

const FILTERS = ['Todos', 'Tráfego Pago', 'Social Media', 'Branding', 'SEO']

const CASES = [
  {
    number: '01',
    category: 'E-commerce · Moda',
    year: '2024',
    title: 'Loja de moda que triplicou as vendas',
    resultValue: '+340%',
    resultLabel: 'em vendas em 6 meses',
    description:
      'Uma loja de moda feminina com presença apenas local precisava escalar para o digital. Desenvolvemos estratégia completa de tráfego pago no Meta e Google, combinada com gestão de social media focada em conversão. Em 6 meses, as vendas triplicaram e a marca se tornou referência no segmento.',
    services: ['Tráfego Pago', 'Social Media'],
    metric: 'ROI de 8:1',
    href: '#',
  },
  {
    number: '02',
    category: 'Saúde · Performance',
    year: '2024',
    title: 'Clínica médica com agenda lotada',
    resultValue: '+180%',
    resultLabel: 'de agendamentos',
    description:
      'Clínica de medicina integrativa com baixa visibilidade digital e agenda com muitos horários vazios. Implementamos SEO local, Google Ads segmentado por especialidade e presença estratégica no Instagram. Em 90 dias, a agenda estava lotada com lista de espera.',
    services: ['SEO', 'Tráfego Pago', 'Social Media'],
    metric: '90 dias para agenda cheia',
    href: '#',
  },
  {
    number: '03',
    category: 'Imóveis · Performance',
    year: '2023',
    title: 'Construtora que vendeu R$8M em 60 dias',
    resultValue: 'R$8M',
    resultLabel: 'em imóveis vendidos',
    description:
      'Construtora com novo lançamento residencial de alto padrão precisava gerar leads qualificados rapidamente. Criamos landing pages otimizadas para cada perfil de comprador e campanhas segmentadas no Meta e Google. Em 60 dias, todas as unidades foram vendidas.',
    services: ['Tráfego Pago', 'Branding'],
    metric: '100% das unidades vendidas',
    href: '#',
  },
]

export function CasesGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState('Todos')

  const filteredCases =
    activeFilter === 'Todos'
      ? CASES
      : CASES.filter((c) => c.services.includes(activeFilter))

  const handleFilter = (filter: string) => {
    setActiveFilter(filter)

    // Animate filtered cards in — kill any running tweens first
    if (gridRef.current) {
      const cards = Array.from(
        gridRef.current.querySelectorAll<HTMLElement>(`.${styles.card}`),
      )
      gsap.killTweensOf(cards)
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.1,
        },
      )
    }
  }

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) return

      const cards = gridRef.current
        ? Array.from(gridRef.current.querySelectorAll<HTMLElement>(`:scope > *`))
        : []

      gsap.set(cards, { opacity: 0, y: 40 })

      const tl = gsap.timeline({ paused: true })
      tl.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
      })

      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 80%',
        onEnter: () => tl.play(),
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>

        {/* Filters */}
        <div className={styles.filters} role="group" aria-label="Filtrar cases">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              className={`${styles.filterBtn} ${activeFilter === filter ? styles.filterBtnActive : ''}`}
              onClick={() => handleFilter(filter)}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef} className={styles.grid}>
          {filteredCases.map(
            ({
              number,
              category,
              year,
              title,
              resultValue,
              resultLabel,
              description,
              services,
              metric,
              href,
            }) => (
              <Link key={number} href={href} className={styles.card} onClick={(e) => e.preventDefault()}>
                {/* Card top */}
                <div className={styles.cardTop}>
                  <span className={styles.caseNumber} aria-hidden="true">
                    {number}
                  </span>
                  <div className={styles.metaRight}>
                    <span className={styles.category}>{category}</span>
                    <span className={styles.year}>{year}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className={styles.caseTitle}>{title}</h2>

                {/* Result badge */}
                <div className={styles.result}>
                  <span className={styles.resultValue}>{resultValue}</span>
                  <span className={styles.resultLabel}>{resultLabel}</span>
                </div>

                {/* Description */}
                <p className={styles.description}>{description}</p>

                {/* Services */}
                <div className={styles.servicesBlock}>
                  <span className={styles.servicesLabel}>Serviços aplicados</span>
                  <div className={styles.serviceTags}>
                    {services.map((s) => (
                      <span key={s} className={styles.serviceTag}>{s}</span>
                    ))}
                  </div>
                </div>

                {/* Card footer */}
                <div className={styles.cardFooter}>
                  <span className={styles.caseLink}>Ver detalhes →</span>
                  <span className={styles.secondaryMetric}>{metric}</span>
                </div>
              </Link>
            ),
          )}
        </div>

      </div>
    </section>
  )
}
