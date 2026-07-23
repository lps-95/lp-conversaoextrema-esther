# Landing Page - Conversão Extrema Esther

Landing page de alta conversão desenvolvida com Next.js 16, TypeScript, Tailwind CSS e Framer Motion.

## 🚀 Tecnologias

- **Next.js 16.0.10** (Turbopack)
- **TypeScript** para type safety
- **Tailwind CSS** para estilização
- **Framer Motion** para animações e transições sofisticadas
- **Parallax customizado** com requestAnimationFrame
- **Plausible Analytics** para tracking de eventos

## ✨ Features

- 🎨 Motion e parallax sofisticados em toda landing page
- 📱 Design totalmente responsivo
- ♿ Acessível (honora prefers-reduced-motion)
- 📊 Tracking integrado de eventos e conversões
- 🎯 Arquitetura modular com TypeScript
- 🚀 Otimizada para performance
- 📲 Integração com WhatsApp

## 🏗️ Arquitetura

O projeto separa **conteúdo**, **lógica** e **layout** em pastas diferentes.
Essa separação é o que permite usar este projeto como modelo pra novas
landing pages sem reescrever componentes — normalmente só mexendo em
`content/`.

```
content/                     # Textos, opções de formulário, mensagens — SEM JSX.
├── hero.ts                  # Conteúdo da seção Hero
└── form.ts                  # Labels, opções de select, mensagens de validação

hooks/                       # Lógica reutilizável, sem UI
├── useLeadForm.ts           # Estado + validação + envio do formulário de lead
├── useWhatsAppMask.ts       # Máscara de telefone
└── useSmoothScroll.ts       # Scroll suave customizado

lib/                         # Funções auxiliares puras
├── analytics.ts             # Wrapper do Plausible (função track)
└── whatsappRedirect.ts      # Monta a URL/mensagem de redirecionamento pro WhatsApp

components/
├── LandingPage.tsx          # Só COMPÕE as peças abaixo — sem lógica própria
├── hero/Hero.tsx            # Seção Hero (usa content/hero.ts)
├── form/LeadForm.tsx        # Formulário de captura (usa content/form.ts + useLeadForm)
├── Motion.tsx                # Wrappers Framer Motion tipados
├── ParallaxLayer.tsx         # Parallax customizado
└── sections/
    ├── NumbersProof.tsx     # Prova de resultados
    ├── Problem.tsx          # Seção do problema
    ├── Oportunidade.tsx     # A oportunidade
    ├── ParaQuem.tsx         # Para quem é
    ├── Beneficios.tsx       # Benefícios
    ├── Historia.tsx         # História de origem
    ├── ProvaSocial.tsx      # Depoimentos
    ├── Case.tsx             # Case de sucesso
    ├── ComoFunciona.tsx     # Como funciona
    ├── Pricing.tsx          # Planos e preços
    └── FAQ.tsx              # Perguntas frequentes

docs/                        # Documentação histórica de entregas anteriores
```

### Como usar este projeto como modelo para outra landing page

1. Duplique a pasta do projeto.
2. Edite `content/hero.ts` e `content/form.ts` com os textos da nova página
   (títulos, opções de select, mensagens).
3. Se a nova página precisar de seções diferentes das que já existem em
   `components/sections/`, copie a seção mais parecida e ajuste — o padrão
   de cada seção é: receber conteúdo já pronto e só cuidar do layout.
4. Ajuste as cores em `tailwind.config.cjs` se a identidade visual for
   diferente.
5. `components/LandingPage.tsx` normalmente não precisa mudar — é só a
   composição das seções.

### Mobile-first / performance

- A decisão do que mostrar em telas pequenas é feita **em CSS**
  (`hidden md:block` etc.), nunca com `window.innerWidth` em JavaScript.
  Isso evita que o servidor renderize uma versão e o navegador troque para
  outra depois que o JS carrega (layout shift).
- `styles/globals.css` já reduz/desliga animações custosas abaixo de 768px
  via `@media (max-width: 768px)`.
- As seções abaixo da dobra são carregadas com `next/dynamic` (lazy load),
  então não entram no JS inicial da página.

## 🛠️ Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar dev server
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start
```

## 📝 Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=+5548991964517
```

## 🔧 Configuração

O projeto utiliza:
- **PostCSS** para processamento de CSS
- **Tailwind CSS** com configuração customizada
- **TypeScript** com strict mode

## 📦 Deploy

Pronto para deploy em:
- Vercel (recomendado)
- Netlify
- Qualquer plataforma que suporte Next.js

## 🎯 Tracking

Eventos rastreados:
- `cta_click` - Cliques em CTAs
- `lead_submit` - Envio de formulário
- `lead_success` - Lead capturado com sucesso

## 📄 Licença

Todos os direitos reservados © 2025
