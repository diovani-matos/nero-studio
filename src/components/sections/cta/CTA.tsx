'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap/config'
import styles from './CTA.module.css'

const TRUST_ITEMS = [
  'Resposta em até 24h',
  'Sem compromisso',
  '100% personalizado',
]

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const line3Ref = useRef<HTMLSpanElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) return

      const titleLines = [line1Ref.current, line2Ref.current, line3Ref.current]

      gsap.set(tagRef.current, { opacity: 0, x: -20 })
      gsap.set(titleLines, { opacity: 0, clipPath: 'inset(100% 0 0 0)' })
      gsap.set(subtextRef.current, { opacity: 0, y: 20 })
      gsap.set(rightColRef.current, { opacity: 0, x: 40 })

      // Timeline created synchronously so useGSAP context tracks it
      const tl = gsap.timeline({ paused: true })

      tl.to(tagRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: 'power3.out',
      })
        .to(
          titleLines,
          {
            opacity: 1,
            clipPath: 'inset(0% 0 0 0)',
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
          },
          '-=0.3',
        )
        .to(
          subtextRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.2',
        )
        .to(
          rightColRef.current,
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
          '<',
        )

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => tl.play(),
      })
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
            04 — Contato
          </div>

          <h2 className={styles.title}>
            <span ref={line1Ref}>Pronto para</span>
            <span ref={line2Ref}>dominar seu</span>
            <span ref={line3Ref} className={styles.titleAccent}>mercado?</span>
          </h2>

          <p ref={subtextRef} className={styles.subtext}>
            Vamos construir juntos a estratégia que vai levar sua marca ao
            próximo nível. Sem enrolação — só resultado.
          </p>
        </div>

        {/* Right column */}
        <div ref={rightColRef} className={styles.right}>
          <Link href="/contato" className={styles.btnPrimary}>
            Iniciar projeto agora →
          </Link>

          <Link href="/cases" className={styles.btnSecondary}>
            Ver nossos cases
          </Link>

          <div className={styles.trust}>
            {TRUST_ITEMS.map((item) => (
              <div key={item} className={styles.trustItem}>
                <span className={styles.trustDot} aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
