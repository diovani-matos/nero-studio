'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap/config'
import styles from './Footer.module.css'

const SERVICES = [
  { label: 'Tráfego Pago', href: '/servicos#trafego-pago' },
  { label: 'Social Media', href: '/servicos#social-media' },
  { label: 'Branding', href: '/servicos#branding' },
  { label: 'SEO', href: '/servicos#seo' },
  { label: 'Criação de Sites', href: '/servicos#criacao-de-sites' },
]

const COMPANY = [
  { label: 'Sobre nós', href: '/sobre' },
  { label: 'Cases', href: '/cases' },
]

export function Footer() {
  const colsRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const cols = colsRef.current
      ? Array.from(colsRef.current.querySelectorAll<HTMLElement>(':scope > *'))
      : []

    gsap.set(cols, { opacity: 0, y: 30 })
    gsap.set(bottomRef.current, { opacity: 0 })

    ScrollTrigger.create({
      trigger: colsRef.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(cols, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          onComplete: () => {
            gsap.to(bottomRef.current, {
              opacity: 1,
              duration: 0.5,
              ease: 'power3.out',
            })
          },
        })
      },
    })
  }, [])

  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top grid */}
        <div ref={colsRef} className={styles.grid}>

          {/* Col 1 — Identity */}
          <div className={styles.col}>
            <Link href="/" className={styles.logo} aria-label="Nero Studio — página inicial">
              NERO
              <span className={styles.logoDot} aria-hidden="true" />
            </Link>

            <p className={styles.tagline}>
              Marcas que dominam.<br />
              Resultados que provam.
            </p>

            <div className={styles.socials}>
              <a
                href="https://instagram.com/nerostudio"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram da Nero Studio"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>

              <a
                href="https://linkedin.com/company/nerostudio"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn da Nero Studio"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
                  <path d="M7 10v7M7 7v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M11 17v-4c0-1.5 1-2 2-2s2 .5 2 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M11 10v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Services */}
          <div className={styles.col}>
            <span className={styles.colTitle}>Serviços</span>
            <ul className={styles.linkList}>
              {SERVICES.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={styles.footerLink}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div className={styles.col}>
            <span className={styles.colTitle}>Empresa</span>
            <ul className={styles.linkList}>
              {COMPANY.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={styles.footerLink}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div className={styles.col}>
            <span className={styles.colTitle}>Contato</span>
            <ul className={styles.linkList}>
              <li>
                <a
                  href="mailto:contato@nerostudio.com.br"
                  className={`${styles.footerLink} ${styles.footerLinkAccent}`}
                >
                  contato@nerostudio.com.br
                </a>
              </li>
              <li>
                <a
                  href="tel:+5511999990000"
                  className={`${styles.footerLink} ${styles.footerLinkAccent}`}
                >
                  +55 (11) 99999-0000
                </a>
              </li>
              <li>
                <span className={styles.footerText}>São Paulo, SP</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div ref={bottomRef} className={styles.bottom}>
          <p className={styles.copyright}>
            © {year} Nero Studio. Todos os direitos reservados.
          </p>
          <div className={styles.legal}>
            <Link href="#" className={styles.legalLink}>
              Privacidade
            </Link>
            <span className={styles.legalDot} aria-hidden="true">·</span>
            <Link href="#" className={styles.legalLink}>
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
