'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap/config'
import styles from './Hero.module.css'

const MARQUEE_TEXT =
  'TRÁFEGO PAGO · SOCIAL MEDIA · BRANDING · SEO · CRIAÇÃO DE SITES · PERFORMANCE · '

const STATS = [
  { value: '200', suffix: '+', label: 'clientes' },
  { value: 'R$50', suffix: 'M+', label: 'em vendas' },
  { value: '8', suffix: '', label: 'de mercado' },
]

const HEADLINE_LINES = [
  ['Marcas', 'que'],
  ['dominam.'],
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) return

      const wordInners = sectionRef.current
        ? Array.from(
            sectionRef.current.querySelectorAll<HTMLElement>(
              `.${styles.wordInner}`,
            ),
          )
        : []

      const statItems = statsRef.current
        ? Array.from(statsRef.current.querySelectorAll<HTMLElement>(':scope > *'))
        : []

      // Initial states
      gsap.set(wordInners, { y: '105%' })
      gsap.set(subtitleRef.current, { opacity: 0, y: 20 })
      gsap.set(statItems, { opacity: 0, y: 20 })
      gsap.set(marqueeRef.current, { opacity: 0 })
      gsap.set(lineRef.current, { scaleY: 0, transformOrigin: 'top' })

      const tl = gsap.timeline({ delay: 0.5 })

      // 1. Headline words rise up
      tl.to(wordInners, {
        y: '0%',
        duration: 1,
        ease: 'power3.out',
        stagger: 0.08,
      })

      // 2. Marquee + subtitle together, after last word
        .to(
          marqueeRef.current,
          { opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.1',
        )
        .to(
          subtitleRef.current,
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '<',
        )

      // 3. Stats stagger
        .to(
          statItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.1,
          },
          '-=0.3',
        )

      // 4. Decorative line — absolute position inside timeline so
      //    useGSAP context tracks and kills it on unmount
      tl.to(
        lineRef.current,
        { scaleY: 1, duration: 1.2, ease: 'power3.out' },
        0.3,
      )
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className={styles.hero}>

      {/* Decorative vertical line */}
      <div ref={lineRef} className={styles.decorLine} aria-hidden="true" />

      {/* Headline */}
      <div className={styles.headlineWrapper}>
        <h1 className={styles.headline}>
          {HEADLINE_LINES.map((words, lineIdx) => (
            <span key={lineIdx} className={styles.line}>
              {words.map((word, wordIdx) => (
                <span key={wordIdx} className={styles.word}>
                  <span className={styles.wordInner}>{word}</span>
                </span>
              ))}
            </span>
          ))}
        </h1>
      </div>

      {/* Marquee */}
      <div ref={marqueeRef} className={styles.marqueeWrapper} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={styles.marqueeText}>
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* Subtitle */}
      <p ref={subtitleRef} className={styles.subtitle}>
        Agência full service para negócios que não se contentam com o segundo
        lugar. Tráfego, branding, social e SEO.
      </p>

      {/* Stats */}
      <div ref={statsRef} className={styles.stats}>
        {STATS.map(({ value, suffix, label }) => (
          <div key={label} className={styles.statItem}>
            <span className={styles.statValue}>
              {value}
              <span className={styles.statSuffix}>{suffix}</span>
            </span>
            <span className={styles.statLabel}>
              {label === 'de mercado' ? (
                <>anos<br />de mercado</>
              ) : (
                label
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom border */}
      <div className={styles.borderBottom} aria-hidden="true" />
    </section>
  )
}
