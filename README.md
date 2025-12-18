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

Projeto modularizado com componentes em TypeScript:

```
components/
├── LandingPage.tsx          # Container principal
├── Motion.tsx               # Wrappers Framer Motion tipados
├── ParallaxLayer.tsx        # Parallax customizado
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
```

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
- **ESLint** para linting

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
