'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap/config'
import styles from './ServicosDetalhe.module.css'

const SERVICES = [
  {
    number: '01',
    title: 'Tráfego Pago',
    tags: ['Google Ads', 'Meta Ads', 'LinkedIn Ads'],
    description:
      'Campanhas de performance com metodologia própria de otimização. Cada real investido é acompanhado de perto para garantir o melhor retorno possível.',
    deliverables: [
      'Auditoria e setup de conta',
      'Criação de campanhas segmentadas',
      'Testes A/B de criativos',
      'Relatórios semanais de performance',
      'Gestão contínua e otimização',
    ],
  },
  {
    number: '02',
    title: 'Social Media',
    tags: ['Instagram', 'TikTok', 'LinkedIn', 'YouTube'],
    description:
      'Conteúdo estratégico que constrói audiência qualificada e gera negócios reais. Não apenas likes — conversas que viram clientes.',
    deliverables: [
      'Planejamento editorial mensal',
      'Produção de conteúdo (copy + design)',
      'Gestão de comunidade',
      'Stories e reels estratégicos',
      'Relatório mensal de resultados',
    ],
  },
  {
    number: '03',
    title: 'Branding',
    tags: ['Identidade Visual', 'Naming', 'Posicionamento'],
    description:
      'Marcas que as pessoas reconhecem, lembram e recomendam. Construímos identidades que resistem ao tempo e se destacam na multidão.',
    deliverables: [
      'Pesquisa e estratégia de marca',
      'Naming e tagline',
      'Identidade visual completa',
      'Manual de marca',
      'Aplicações e mockups',
    ],
  },
  {
    number: '04',
    title: 'SEO',
    tags: ['On-page', 'Off-page', 'Técnico', 'Local'],
    description:
      'Visibilidade orgânica que cresce mês a mês. Estratégia de longo prazo que reduz dependência de tráfego pago com o tempo.',
    deliverables: [
      'Auditoria técnica completa',
      'Pesquisa de palavras-chave',
      'Otimização on-page',
      'Construção de autoridade (link building)',
      'Relatório mensal de posições',
    ],
  },
  {
    number: '05',
    title: 'Criação de Sites',
    tags: ['Next.js', 'React', 'WordPress', 'Shopify'],
    description:
      'Sites que vendem. Performance, design e conversão no mesmo projeto. Cada elemento existe para gerar resultado.',
    deliverables: [
      'Design personalizado (sem templates)',
      'Desenvolvimento responsivo',
      'SEO técnico desde o início',
      'Integração com analytics',
      'Suporte pós-lançamento',
    ],
  },
]

export function ServicosDetalhe() {
  const sectionRef = useRef<HTMLElement>(null)
  const blocksRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) return

      blocksRef.current.forEach((block) => {
        if (!block) return

        const cols = Array.from(block.querySelectorAll<HTMLElement>(':scope > *'))

        gsap.set(cols, { opacity: 0, y: 30 })

        const tl = gsap.timeline({ paused: true })
        tl.to(cols, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
        })

        ScrollTrigger.create({
          trigger: block,
          start: 'top 80%',
          onEnter: () => tl.play(),
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        {SERVICES.map(({ number, title, tags, description, deliverables }, i) => (
          <div
            key={number}
            id={title.toLowerCase().replace(/\s+/g, '-')}
            ref={(el) => { blocksRef.current[i] = el }}
            className={styles.block}
          >
            {/* Col 1 — Number */}
            <span className={styles.number}>{number}</span>

            {/* Col 2 — Info */}
            <div className={styles.info}>
              <h2 className={styles.title}>{title}</h2>
              <div className={styles.tags}>
                {tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Col 3 — Description + deliverables */}
            <div className={styles.detail}>
              <p className={styles.description}>{description}</p>
              <span className={styles.deliverablesTitle}>O que inclui</span>
              <ul className={styles.deliverables}>
                {deliverables.map((item) => (
                  <li key={item} className={styles.deliverableItem}>
                    <span className={styles.bullet} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
