'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap/config'
import styles from './CasesHero.module.css'

export function CasesHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const rightRef = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) return

      gsap.set(tagRef.current, { opacity: 0, y: 20 })
      gsap.set([line1Ref.current, line2Ref.current], {
        opacity: 0,
        clipPath: 'inset(100% 0 0 0)',
      })
      gsap.set(rightRef.current, { opacity: 0, x: 40 })

      const tl = gsap.timeline({ paused: true })

      tl.to(tagRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
        .to(
          [line1Ref.current, line2Ref.current],
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
          rightRef.current,
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.4',
        )

      gsap.delayedCall(0.3, () => tl.play())
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div ref={tagRef} className={styles.tag}>
            <span className={styles.tagLine} aria-hidden="true" />
            Cases
          </div>

          <h1 className={styles.title}>
            <span ref={line1Ref}>Resultados</span>
            <span ref={line2Ref}>
              que <em className={styles.titleAccent}>provam.</em>
            </span>
          </h1>
        </div>

        <p ref={rightRef} className={styles.right}>
          Números reais de clientes reais. Cada case representa uma
          estratégia customizada e executada com precisão.
        </p>
      </div>
    </section>
  )
}
