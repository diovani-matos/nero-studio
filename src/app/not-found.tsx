'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap/config'
import styles from './not-found.module.css'

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) return

      gsap.set(tagRef.current, { opacity: 0, x: -20 })
      gsap.set([line1Ref.current, line2Ref.current], { y: '105%' })
      gsap.set(subtextRef.current, { opacity: 0, y: 20 })
      gsap.set(actionsRef.current, { opacity: 0, y: 20 })
      gsap.set(decorRef.current, { opacity: 0 })

      const tl = gsap.timeline({ paused: true })

      tl.to(tagRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
        .to(
          [line1Ref.current, line2Ref.current],
          {
            y: '0%',
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
          },
          '-=0.2',
        )
        .to(
          subtextRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.3',
        )
        .to(
          actionsRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.3',
        )

      gsap.to(decorRef.current, {
        opacity: 0.15,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.4,
      })

      gsap.delayedCall(0.2, () => tl.play())
    },
    { scope: containerRef },
  )

  return (
    <div className={styles.page}>
      <div ref={containerRef} className={styles.container}>
        {/* Decorative "404" */}
        <div ref={decorRef} className={styles.decor} aria-hidden="true">
          404
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div ref={tagRef} className={styles.tag}>
            <span className={styles.tagLine} aria-hidden="true" />
            Erro 404
          </div>

          <h1 className={styles.title}>
            <span className={styles.word}>
              <span ref={line1Ref}>Página não</span>
            </span>
            <span className={styles.word}>
              <span ref={line2Ref}>encontrada.</span>
            </span>
          </h1>

          <p ref={subtextRef} className={styles.subtext}>
            Essa página não existe ou foi removida.
          </p>

          <div ref={actionsRef} className={styles.actions}>
            <Link href="/" className={styles.btnPrimary}>
              Voltar para o início
            </Link>
            <Link href="/cases" className={styles.btnSecondary}>
              Ver nossos cases →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
