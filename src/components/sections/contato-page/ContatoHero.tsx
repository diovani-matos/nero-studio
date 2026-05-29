'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap/config'
import styles from './ContatoHero.module.css'

export function ContatoHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

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
        {/* Left */}
        <div className={styles.left}>
          <div ref={tagRef} className={styles.tag}>
            <span className={styles.tagLine} aria-hidden="true" />
            Contato
          </div>
          <h1 className={styles.title}>
            <span ref={line1Ref}>Vamos</span>
            <span ref={line2Ref} className={styles.titleAccent}>conversar.</span>
          </h1>
        </div>

        {/* Right */}
        <div ref={rightRef} className={styles.right}>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>Email</span>
            <a
              href="mailto:contato@nerostudio.com.br"
              className={styles.contactValue}
            >
              contato@nerostudio.com.br
            </a>
          </div>

          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>WhatsApp</span>
            <a
              href="https://wa.me/5511999990000"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactValue}
            >
              +55 (11) 99999-0000
            </a>
          </div>

          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>Localização</span>
            <span className={styles.contactValue}>São Paulo, SP — Brasil</span>
          </div>

          <div className={styles.availability}>
            <span className={styles.availabilityDot} aria-hidden="true" />
            <span className={styles.availabilityText}>
              Disponível para novos projetos
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
