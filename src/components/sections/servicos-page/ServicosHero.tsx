'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap/config'
import styles from './ServicosHero.module.css'

export function ServicosHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)

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
      gsap.set(subtextRef.current, { opacity: 0, y: 20 })

      const tl = gsap.timeline({ delay: 0.3 })

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
          subtextRef.current,
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.3',
        )
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div ref={tagRef} className={styles.tag}>
          <span className={styles.tagLine} aria-hidden="true" />
          Serviços
        </div>

        <h1 className={styles.title}>
          <span ref={line1Ref}>Estratégia</span>
          <span ref={line2Ref}>
            que <em className={styles.titleAccent}>converte.</em>
          </span>
        </h1>

        <p ref={subtextRef} className={styles.subtext}>
          Cinco serviços integrados. Uma estratégia completa. Resultados
          que você consegue medir desde o primeiro mês.
        </p>
      </div>
    </section>
  )
}
