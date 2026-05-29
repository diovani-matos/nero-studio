# Nero Studio — Site Institucional

## Identidade do Projeto
- Cliente fictício: Nero Studio
- Segmento: Agência de Marketing Digital Full Service
- Posicionamento: Premium, resultados, autoridade
- Localização fictícia: São Paulo, SP
- URL futura: [url]
- Objetivo: Case de portfólio demonstrando
  animações cinematográficas e design premium

## Stack Obrigatória
- Next.js 15, App Router, TypeScript estrito
- CSS Modules exclusivamente
- GSAP para todas as animações
- Lenis para scroll suave
- next/image para todas as imagens
- next/font para todas as fontes
- Sem Tailwind, sem bibliotecas de UI

## Identidade Visual
- Tema: dark exclusivamente
- Fundo base: #080808
- Fundo cards: #111111
- Bordas: #1A1A1A
- Texto principal: #F5F5F5
- Texto muted: #888888
- Acento dourado: #C9A84C
- Dourado claro (hover): #E8C96A
- Dourado escuro (bg): #2A1F0A
- Grain/noise sutil no fundo via SVG

## Tipografia
- Display: Playfair Display
  (weights: 400, 500, 600, 700, 900)
  Usar em todos os headings H1-H3
- Corpo: DM Sans
  (weights: 300, 400, 500)
  Usar em parágrafos, labels, UI

## Animação (regras absolutas)
- Todo scroll usa Lenis — nunca scroll nativo
- Todo movimento usa GSAP — nunca CSS transition
  em animações de entrada
- Ease padrão: power3.out
- Duration mínima: 0.6s
- Entradas sempre de baixo para cima: y: 60 → 0
- Stagger entre elementos: 0.08s
- Nunca bounce, nunca elastic, nunca ease-in-out
- Cursor customizado: círculo dourado 12px
  que segue o mouse com lerp suave
  Escala para 40px ao hover em links/botões
  Mostra texto "VER" ao hover em imagens

## Lenis + ScrollTrigger
- Inicializar Lenis no providers.tsx
- Conectar ao ScrollTrigger via
  lenis.on('scroll', ScrollTrigger.update)
- NUNCA window.addEventListener('scroll')
- ScrollTrigger.refresh() só após Lenis pronto

## Componentes
- Um componente = um .tsx + um .module.css
- useGSAP do @gsap/react com cleanup obrigatório
- Nenhum estilo inline — tudo em .module.css

## Páginas
1. / — Home completa
2. /servicos — Detalhamento de serviços
3. /cases — Portfólio de resultados
4. /sobre — Equipe e história
5. /contato — Formulário

## Serviços (Full Service)
1. Tráfego Pago — Google Ads, Meta Ads, ROI
2. Social Media — Conteúdo, engajamento, comunidade
3. Branding — Identidade visual, posicionamento
4. SEO — Orgânico, autoridade, long-term
5. Criação de Sites — Landing pages, e-commerce, institucional

## Números fictícios (usar nos componentes)
- R$ 50M+ em vendas geradas para clientes
- 200+ clientes atendidos
- 8 anos de mercado
- 98% taxa de retenção

## Cases fictícios (3 projetos)
1. E-commerce de moda — "+340% em vendas em 6 meses"
2. Clínica médica — "+180% de agendamentos via digital"
3. Construtora — "R$ 8M em imóveis vendidos via tráfego"

## Copy e Tom
- Direto, sem adjetivos vazios
- Foco em resultado e número
- Nunca: "soluções inovadoras", "equipe apaixonada"
- Sempre: métricas, resultados, provas

## SEO
- lang="pt-BR"
- Meta title e description únicos por página
- Schema.org: Organization + LocalBusiness
- Canonical em todas as páginas
- OG tags completas

## Performance
- Imagens via next/image com WebP
- Fontes via next/font com display: swap
- CSS Modules elimina CSS não usado
- Sem dependências além da stack definida

## Compatibilidade Mobile e Safari
- ScrollTrigger.refresh() só após Lenis pronto
- gsap.set() sempre antes de ScrollTrigger
- Pin desabilitado em viewport < 768px
- Testar animações no Safari antes de considerar pronto

## O que nunca fazer
- Tailwind de qualquer forma
- Cores hardcoded — sempre var()
- border-radius > 6px (exceto botões: 4px)
- Gradiente roxo
- Animações simultâneas demais na mesma viewport
- Layout perfeitamente simétrico em todas as seções