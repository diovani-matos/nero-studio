'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap/config'
import styles from './SobreHero.module.css'

const METRICS = [
  { value: '200', suffix: '+', label: 'Clientes' },
  { value: 'R$50', suffix: 'M+', label: 'Em vendas' },
  { value: '98', suffix: '%', label: 'Retenção' },
  { value: '8', suffix: '', label: 'Anos' },
]

export function SobreHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const line3Ref = useRef<HTMLSpanElement>(null)
  const p1Ref = useRef<HTMLParagraphElement>(null)
  const p2Ref = useRef<HTMLParagraphElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) return

      const titleLines = [line1Ref.current, line2Ref.current, line3Ref.current]

      const metricCells = metricsRef.current
        ? Array.from(
            metricsRef.current.querySelectorAll<HTMLElement>(`:scope > *`),
          )
        : []

      gsap.set(tagRef.current, { opacity: 0, y: 20 })
      gsap.set(titleLines, { opacity: 0, clipPath: 'inset(100% 0 0 0)' })
      gsap.set([p1Ref.current, p2Ref.current], { opacity: 0, y: 20 })
      gsap.set(metricCells, { opacity: 0, y: 20 })

      const tl = gsap.timeline({ paused: true })

      tl.to(tagRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
        .to(
          titleLines,
          {
            opacity: 1,
            clipPath: 'inset(0% 0 0 0)',
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.1,
          },
          '-=0.2',
        )
        .to(
          [p1Ref.current, p2Ref.current],
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.12,
          },
          '-=0.4',
        )
        .to(
          metricCells,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.08,
          },
          '-=0.3',
        )

      // delayedCall is tracked by useGSAP context — safe to kill on unmount
      gsap.delayedCall(0.3, () => tl.play())
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>

        {/* Left column */}
        <div className={styles.left}>
          <div ref={tagRef} className={styles.tag}>
            <span className={styles.tagLine} aria-hidden="true" />
            Sobre nós
          </div>

          <h1 className={styles.title}>
            <span ref={line1Ref}>Oito anos</span>
            <span ref={line2Ref}>construindo</span>
            <span ref={line3Ref} className={styles.titleAccent}>resultados.</span>
          </h1>

          <p ref={p1Ref} className={styles.paragraph}>
            A Nero Studio nasceu da frustração com agências que entregam
            relatórios bonitos mas não movem o ponteiro. Criamos uma
            metodologia baseada em dados, testes constantes e obsessão
            por resultado.
          </p>

          <p ref={p2Ref} className={styles.paragraph}>
            Hoje somos o parceiro estratégico de mais de 200 empresas que
            entenderam que marketing digital não é custo — é o investimento
            com melhor retorno do negócio.
          </p>
        </div>

        {/* Right column — metrics grid */}
        <div ref={metricsRef} className={styles.metricsGrid}>
          {METRICS.map(({ value, suffix, label }) => (
            <div key={label} className={styles.metricCell}>
              <span className={styles.metricValue}>
                {value}
                <span className={styles.metricSuffix}>{suffix}</span>
              </span>
              <span className={styles.metricLabel}>{label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
