'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap/config'
import styles from './Numeros.module.css'

export function Numeros() {
  const sectionRef = useRef<HTMLElement>(null)

  // Individual refs for each animated counter span
  const counter1Ref = useRef<HTMLSpanElement>(null)
  const counter2Ref = useRef<HTMLSpanElement>(null)
  const counter3Ref = useRef<HTMLSpanElement>(null)
  const counter4Ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      const items = sectionRef.current
        ? Array.from(
            sectionRef.current.querySelectorAll<HTMLElement>(`.${styles.item}`),
          )
        : []

      const lines = sectionRef.current
        ? Array.from(
            sectionRef.current.querySelectorAll<HTMLElement>(`.${styles.line}`),
          )
        : []

      const animateCounter = (
        el: HTMLSpanElement | null,
        target: number,
        duration: number,
      ) => {
        if (!el) return
        const proxy = { val: 0 }
        gsap.to(proxy, {
          val: target,
          duration,
          ease: 'power2.out',
          onUpdate() {
            el.textContent = Math.round(proxy.val).toString()
          },
        })
      }

      if (prefersReduced) {
        gsap.set(items, { opacity: 1, y: 0 })
        gsap.set(lines, { width: 24 })
        return
      }

      // Hide counter values immediately — prevents flash of final value
      gsap.set(
        [
          counter1Ref.current,
          counter2Ref.current,
          counter3Ref.current,
          counter4Ref.current,
        ],
        { opacity: 0 },
      )
      gsap.set(items, { opacity: 0, y: 20 })
      gsap.set(lines, { width: 0 })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          // Reset text to "0" before revealing
          if (counter1Ref.current) counter1Ref.current.textContent = '0'
          if (counter2Ref.current) counter2Ref.current.textContent = '0'
          if (counter3Ref.current) counter3Ref.current.textContent = '0'
          if (counter4Ref.current) counter4Ref.current.textContent = '0'

          // Reveal counter spans
          gsap.set(
            [
              counter1Ref.current,
              counter2Ref.current,
              counter3Ref.current,
              counter4Ref.current,
            ],
            { opacity: 1 },
          )

          // Entrance animation
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
          })

          // Decorative lines
          gsap.to(lines, {
            width: 24,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 0.3,
          })

          // Start counters after items finish entering
          setTimeout(() => {
            animateCounter(counter1Ref.current, 200, 2.5)
            animateCounter(counter2Ref.current, 50, 2.5)
            animateCounter(counter3Ref.current, 98, 2.5)
            animateCounter(counter4Ref.current, 8, 2.0)
          }, 800)
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.grid}>

        {/* Item 1 — Clientes */}
        <div className={styles.item}>
          <div className={styles.line} aria-hidden="true" />
          <div className={styles.valueRow}>
            <span className={styles.number}>
              <span ref={counter1Ref} className={styles.counterValue}>200</span>
              <span className={styles.suffix}>+</span>
            </span>
          </div>
          <span className={styles.label}>Clientes atendidos</span>
        </div>

        {/* Item 2 — Vendas */}
        <div className={styles.item}>
          <div className={styles.line} aria-hidden="true" />
          <div className={styles.valueRow}>
            <span className={styles.prefix}>R$</span>
            <span className={styles.number}>
              <span ref={counter2Ref} className={styles.counterValue}>50</span>
              <span className={styles.suffix}>M+</span>
            </span>
          </div>
          <span className={styles.label}>Em vendas geradas</span>
        </div>

        {/* Item 3 — Retenção */}
        <div className={styles.item}>
          <div className={styles.line} aria-hidden="true" />
          <div className={styles.valueRow}>
            <span className={styles.number}>
              <span ref={counter3Ref} className={styles.counterValue}>98</span>
              <span className={styles.suffix}>%</span>
            </span>
          </div>
          <span className={styles.label}>Taxa de retenção</span>
        </div>

        {/* Item 4 — Mercado */}
        <div className={styles.item}>
          <div className={styles.line} aria-hidden="true" />
          <div className={styles.valueRow}>
            <span className={styles.number}>
              <span ref={counter4Ref} className={styles.counterValue}>8</span>
              <span className={styles.suffix}> anos</span>
            </span>
          </div>
          <span className={styles.label}>De mercado</span>
        </div>

      </div>
    </section>
  )
}
