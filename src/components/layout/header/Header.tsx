'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap/config'
import { useLenis } from '@/lib/lenis/provider'
import styles from './Header.module.css'

const NAV_LINKS = [
  { label: 'Início', href: '/' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Cases', href: '/cases' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
]

export function Header() {
  const pathname = usePathname()
  const lenis = useLenis()

  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const navLinksRef = useRef<HTMLUListElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Scroll detection via Lenis or fallback
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }

    if (lenis) {
      lenis.on('scroll', handleScroll)
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    return () => {
      if (lenis) {
        lenis.off('scroll', handleScroll)
      } else {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [lenis])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Entrance animation
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const navItems = navLinksRef.current
      ? Array.from(navLinksRef.current.querySelectorAll('li'))
      : []

    gsap.set(logoRef.current, { opacity: 0, x: -20 })
    gsap.set(navItems, { opacity: 0, y: -15 })
    gsap.set(ctaRef.current, { opacity: 0, y: -15 })

    const tl = gsap.timeline({ delay: 0.3 })

    tl.to(logoRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.7,
      ease: 'power3.out',
    })
      .to(
        navItems,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.06,
        },
        '-=0.4',
      )
      .to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.3',
      )
  }, [])

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith('#') && lenis) {
      e.preventDefault()
      lenis.scrollTo(href)
    }
    if (menuOpen) setMenuOpen(false)
  }

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
    >
      <div className={styles.inner}>
        {/* Logo */}
        <Link
          ref={logoRef}
          href="/"
          className={styles.logo}
          aria-label="Nero Studio — página inicial"
        >
          NERO
          <span className={styles.logoDot} aria-hidden="true" />
        </Link>

        {/* Desktop nav */}
        <nav className={styles.nav} aria-label="Navegação principal">
          <ul ref={navLinksRef} className={styles.navList}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.navLink} ${pathname === href ? styles.navLinkActive : ''}`}
                  onClick={(e) => handleNavClick(e, href)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            ref={ctaRef}
            href="/contato"
            className={styles.cta}
            onClick={(e) => handleNavClick(e, '/contato')}
          >
            Falar com a gente
          </Link>
        </nav>

        {/* Hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <button
          className={styles.closeBtn}
          onClick={() => setMenuOpen(false)}
          aria-label="Fechar menu"
        >
          <span className={styles.closeLine} />
          <span className={styles.closeLine} />
        </button>

        <nav aria-label="Navegação mobile">
          <ul className={styles.mobileNavList}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.mobileNavLink} ${pathname === href ? styles.mobileNavLinkActive : ''}`}
                  onClick={(e) => handleNavClick(e, href)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
