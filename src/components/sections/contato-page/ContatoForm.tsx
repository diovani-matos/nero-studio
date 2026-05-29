'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap/config'
import styles from './ContatoForm.module.css'

type FormFields = {
  nome: string
  email: string
  telefone: string
  servico: string
  mensagem: string
  website: string // honeypot
}

type FormErrors = Partial<Record<keyof Omit<FormFields, 'website'>, string>>
type Status = 'idle' | 'loading' | 'success' | 'error'

const INITIAL: FormFields = {
  nome: '',
  email: '',
  telefone: '',
  servico: '',
  mensagem: '',
  website: '',
}

const DIFERENCIAIS = [
  {
    num: '01',
    title: 'Resposta em até 24h',
    desc: 'Analisamos seu negócio e respondemos com insights reais, não um pitch genérico.',
  },
  {
    num: '02',
    title: 'Sem contrato de fidelidade',
    desc: 'Ficamos porque entregamos resultado, não porque você é obrigado a ficar.',
  },
  {
    num: '03',
    title: 'Relatórios semanais',
    desc: 'Você acompanha tudo em tempo real. Sem surpresas no fim do mês.',
  },
  {
    num: '04',
    title: 'ROI garantido ou conversamos',
    desc: 'Se não estamos gerando resultado em 90 dias, revisamos a estratégia sem custo adicional.',
  },
]

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function validate(fields: FormFields): FormErrors {
  const errs: FormErrors = {}
  if (!fields.nome.trim()) errs.nome = 'Campo obrigatório'
  if (!fields.email.trim()) {
    errs.email = 'Campo obrigatório'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errs.email = 'Email inválido'
  }
  if (!fields.servico) errs.servico = 'Selecione um serviço'
  if (!fields.mensagem.trim()) {
    errs.mensagem = 'Campo obrigatório'
  } else if (fields.mensagem.trim().length < 20) {
    errs.mensagem = 'Mínimo 20 caracteres'
  }
  return errs
}

export function ContatoForm() {
  const sectionRef = useRef<HTMLElement>(null)
  const formColRef = useRef<HTMLDivElement>(null)
  const difsRef = useRef<HTMLDivElement>(null)

  const [fields, setFields] = useState<FormFields>(INITIAL)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>('idle')

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) return

      const difItems = difsRef.current
        ? Array.from(difsRef.current.querySelectorAll<HTMLElement>(':scope > *'))
        : []

      gsap.set(formColRef.current, { opacity: 0, y: 30 })
      gsap.set(difItems, { opacity: 0, x: 30 })

      const tlForm = gsap.timeline({ paused: true })
      tlForm.to(formColRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })

      const tlDifs = gsap.timeline({ paused: true })
      tlDifs.to(difItems, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          tlForm.play()
          tlDifs.play()
        },
      })
    },
    { scope: sectionRef },
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFields((prev) => ({
      ...prev,
      [name]: name === 'telefone' ? formatPhone(value) : value,
    }))
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target
    const fieldErrors = validate(fields)
    if (fieldErrors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name as keyof FormErrors] }))
    } else {
      setErrors((prev) => { const next = { ...prev }; delete next[name as keyof FormErrors]; return next })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot check
    if (fields.website) return

    const errs = validate(fields)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setStatus('loading')

    // TODO: integrar com Resend
    await new Promise((res) => setTimeout(res, 2000))

    setStatus('success')
    setTimeout(() => {
      setFields(INITIAL)
      setStatus('idle')
    }, 3000)
  }

  const btnLabel = {
    idle: 'Enviar mensagem →',
    loading: 'Enviando...',
    success: '✓ Mensagem enviada!',
    error: 'Erro — tente novamente',
  }[status]

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>

        {/* Form column */}
        <div ref={formColRef} className={styles.formCol}>
          <form onSubmit={handleSubmit} noValidate>

            {/* Honeypot */}
            <div style={{ display: 'none' }}>
              <input
                name="website"
                value={fields.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Nome */}
            <div className={styles.field}>
              <label htmlFor="nome" className={styles.label}>Nome</label>
              <input
                id="nome"
                name="nome"
                type="text"
                required
                autoComplete="name"
                placeholder="Seu nome completo"
                value={fields.nome}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${styles.input} ${errors.nome ? styles.inputError : ''}`}
              />
              {errors.nome && <span className={styles.errorMsg}>{errors.nome}</span>}
            </div>

            {/* Email */}
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="seu@email.com"
                value={fields.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              />
              {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
            </div>

            {/* Telefone */}
            <div className={styles.field}>
              <label htmlFor="telefone" className={styles.label}>Telefone</label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                autoComplete="tel"
                placeholder="(11) 99999-0000"
                value={fields.telefone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.input}
              />
            </div>

            {/* Serviço */}
            <div className={styles.field}>
              <label htmlFor="servico" className={styles.label}>Serviço</label>
              <div className={styles.selectWrapper}>
                <select
                  id="servico"
                  name="servico"
                  required
                  value={fields.servico}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${styles.select} ${errors.servico ? styles.inputError : ''}`}
                >
                  <option value="" disabled>Selecione um serviço</option>
                  <option value="Tráfego Pago">Tráfego Pago</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Branding">Branding</option>
                  <option value="SEO">SEO</option>
                  <option value="Criação de Sites">Criação de Sites</option>
                  <option value="Full Service">Full Service (todos)</option>
                </select>
                <span className={styles.selectArrow} aria-hidden="true">↓</span>
              </div>
              {errors.servico && <span className={styles.errorMsg}>{errors.servico}</span>}
            </div>

            {/* Mensagem */}
            <div className={styles.field}>
              <label htmlFor="mensagem" className={styles.label}>Mensagem</label>
              <textarea
                id="mensagem"
                name="mensagem"
                required
                rows={4}
                placeholder="Conte um pouco sobre seu projeto e objetivos..."
                value={fields.mensagem}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${styles.textarea} ${errors.mensagem ? styles.inputError : ''}`}
              />
              {errors.mensagem && <span className={styles.errorMsg}>{errors.mensagem}</span>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`${styles.submitBtn} ${styles[`submit_${status}`]}`}
            >
              {status === 'loading' && (
                <span className={styles.spinner} aria-hidden="true" />
              )}
              {btnLabel}
            </button>

          </form>
        </div>

        {/* Right column — diferenciais */}
        <div className={styles.rightCol}>
          <h2 className={styles.rightTitle}>Por que a Nero Studio?</h2>
          <div ref={difsRef} className={styles.difList}>
            {DIFERENCIAIS.map(({ num, title, desc }) => (
              <div key={num} className={styles.difItem}>
                <span className={styles.difNum}>{num}</span>
                <div className={styles.difContent}>
                  <span className={styles.difTitle}>{title}</span>
                  <p className={styles.difDesc}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
