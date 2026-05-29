'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap/config'
import styles from './Servicos.module.css'

const SERVICES = [
  {
    number: '01',
    title: 'Tráfego Pago',
    description:
      'Google Ads, Meta Ads e campanhas de performance com foco em ROI mensurável.',
  },
  {
    number: '02',
    title: 'Social Media',
    description:
      'Estratégia, criação de conteúdo e gestão de comunidade para crescimento orgânico.',
  },
  {
    number: '03',
    title: 'Branding',
    description:
      'Identidade visual, posicionamento e narrativa de marca que ficam na memória.',
  },
  {
    number: '04',
    title: 'SEO',
    description:
      'Autoridade orgânica construída com estratégia de longo prazo e resultados duradouros.',
  },
  {
    number: '05',
    title: 'Criação de Sites',
    description:
      'Landing pages, e-commerce e sites institucionais que convertem visitantes em clientes.',
  },
]

export function Servicos() {
  const sectionRef = useRef<HTMLElement>(null)
  const headLeftRef = useRef<HTMLDivElement>(null)
  const headRightRef = useRef<HTMLParagraphElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) return

      const items = listRef.current
        ? Array.from(listRef.current.querySelectorAll<HTMLElement>(':scope > li'))
        : []

      gsap.set(headLeftRef.current, { opacity: 0, x: -40 })
      gsap.set(headRightRef.current, { opacity: 0, x: 40 })
      gsap.set(items, { opacity: 0, y: 30 })

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
            items,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              stagger: 0.1,
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

        {/* Section header */}
        <div className={styles.header}>
          <div ref={headLeftRef} className={styles.headLeft}>
            <div className={styles.tag}>
              <span className={styles.tagLine} aria-hidden="true" />
              02 — Serviços
            </div>
            <h2 className={styles.title}>
              <span>O que fazemos</span>
              <span>com excelência.</span>
            </h2>
          </div>

          <p ref={headRightRef} className={styles.headRight}>
            Cada serviço integrado ao outro.
            Estratégia, execução e resultado
            no mesmo lugar.
          </p>
        </div>

        {/* Services list */}
        <ul ref={listRef} className={styles.list}>
          {SERVICES.map(({ number, title, description }) => (
            <li key={number} className={styles.item}>
              <span className={styles.number}>{number}</span>
              <div className={styles.content}>
                <span className={styles.serviceTitle}>{title}</span>
                <p className={styles.description}>{description}</p>
              </div>
              <span className={styles.arrow} aria-hidden="true">→</span>
            </li>
          ))}
        </ul>

      </div>
    </section>
  )
}
