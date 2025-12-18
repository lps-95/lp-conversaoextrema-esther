# 🚀 Landing Page - Conversão Extrema

Uma landing page de **alta conversão** para serviços premium de consultoria em narrativa digital e presença profissional.

**Status**: ✅ Pronto para deploy | 13 seções completas | Animações premium | Mobile-first

---

## 🎯 Stack Tecnológico

| Tecnologia           | Versão       | Propósito                          |
| -------------------- | ------------ | ---------------------------------- |
| **Next.js**          | 16.0.10      | Framework React com SSR/Static     |
| **Tailwind CSS**     | 3.4.10       | Utility-first CSS                  |
| **Playfair Display** | Google Fonts | Tipografia de headers (elegante)   |
| **Inter**            | Google Fonts | Tipografia de body (legibilidade)  |
| **Plausible**        | CDN          | Analytics privado + consent banner |

---

## 📱 Arquitetura

### Mobile-First Design

```
Mobile (360px) → Tablet (640px) → Desktop (1024px)
├─ Responsive breakpoints: sm, md, lg
├─ Touch-friendly CTAs (min 44px)
└─ Otimizado para performance em 4G
```

### Dark Theme Premium

- **Fundo**: Preto puro (#000000) com padrão SVG sutil
- **Tipografia**: Contraste máximo (branco/cream sobre preto)
- **Acentos**: Brown sofisticado + cream elegante
- **Animações**: Entradas suaves, sem excesso

---

## 📑 As 13 Seções

| #   | Seção               | Objetivo                              | CTA                           |
| --- | ------------------- | ------------------------------------- | ----------------------------- |
| 1   | **Hero**            | Proposta de valor + lead magnet       | "Quero Parar de Perder Agora" |
| 2   | **Problema**        | Diagnóstico do vazio narrativo        | Conscientização               |
| 3   | **Oportunidade**    | Apresentar a solução                  | Engajamento                   |
| 4   | **Para Quem É**     | Qualify prospects com personas        | Identificação                 |
| 5   | **Prova Social**    | Números que impressionam (487%, 3-5x) | Credibilidade                 |
| 6   | **Como Funciona**   | Processo em 4 etapas                  | Entendimento                  |
| 7   | **Antes vs Depois** | Transformação visual                  | Visualização                  |
| 8   | **Testemunho**      | Case study com resultado quantificado | Prova social                  |
| 9   | **Garantia**        | Risco reverso 90 dias                 | Segurança                     |
| 10  | **FAQ**             | 4 perguntas mais frequentes           | Objeção handling              |
| 11  | **Urgência**        | Spots limitados (3 vagas em dezembro) | Escassez                      |
| 12  | **CTA Final**       | Last chance offer com deadline        | Conversão final               |
| 13  | **Footer**          | Links + legal                         | Navegação                     |

---

## 🎨 Paleta de Cores (Semântica)

### Cores Primárias

```javascript
primary: {
  DEFAULT: '#000000',    // Preto base (background)
  dark: '#0a0a0a',       // Preto ultra-escuro
  light: '#1a1a1a'       // Preto com profundidade
}
```

### Cores de Acento

```javascript
accent: {
  brown: '#6b5344',      // Marrom sofisticado
  cream: '#e8dcc8',      // Creme/bege (decorativo)
  gold: '#d4af37',       // Ouro premium
  silver: '#c0c0c0'      // Prata subtil
}
```

### Hierarquia de Texto

```javascript
text: {
  primary: '#ffffff',    // Branco (headlines, CTAs)
  secondary: '#e8e8e8',  // Cinza muito claro (body)
  tertiary: '#a8a8a8',   // Cinza médio (complementar)
  muted: '#6a6a6a'       // Cinza escuro (footnotes)
}
```

### Cores de Botão

```javascript
button: {
  primary: '#e8dcc8',           // Cream (CTA principal)
  primaryHover: '#f5e6d3',      // Cream mais claro (hover)
  secondary: '#6b5344',         // Brown (CTA secundária)
  secondaryHover: '#8b7355'     // Brown mais claro
}
```

---

## ✨ Animações Personalizadas

### Keyframes Definidas em `styles/globals.css`

| Animação         | Duração | Efeito                      | Uso                         |
| ---------------- | ------- | --------------------------- | --------------------------- |
| **fade-in**      | 0.8s    | Entrada suave por opacidade | Seções inteiras             |
| **slide-up**     | 0.8s    | Desliza para cima + fade    | Cards, elementos principais |
| **scale-in**     | 0.6s    | Zoom sutil de entrada       | Estatísticas, boxes         |
| **pulse-glow**   | 2s      | Pulsação em números         | Dados de impacto            |
| **pulse-subtle** | 3s      | Pulsação micro no botão     | CTA principal               |
| **float-up**     | 3s      | Flutuação ascendente        | (Reservada para efeitos)    |
| **shimmer**      | 2s      | Brilho deslizante           | (Efeito premium)            |
| **glow-pulse**   | 2s      | Aura pulsante               | (Destaques especiais)       |

### Uso de `animation-delay`

```javascript
style={{ animationDelay: '0.1s' }}  // Defasada entrada de múltiplos elementos
```

---

## 🔧 Configuração

### Requisitos

```bash
Node.js 18+
npm ou yarn
```

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie arquivo `.env.local`:

```bash
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=seu-dominio.com
```

### 3. Executar Localmente

```bash
npm run dev
# Acessa em http://localhost:3000
```

### 4. Build para Produção

```bash
npm run build       # Cria otimização
npm start          # Inicia servidor
```

---

## 📊 Integração Plausible Analytics

### Setup Rápido

1. Crie conta em [plausible.io](https://plausible.io)
2. Registre seu domínio
3. Configure `.env.local` com `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=seu-dominio.com`

### Funcionamento

- **Banner de consentimento** aparece no rodapé
- Usuário clica "Aceitar" → localStorage salva preferência
- Script Plausible **só carrega** após aceitar
- **GDPR/LGPD compliant** ✓

### Código

```javascript
// Componente: ConsentBanner.js
// Gerencia localStorage + injeção dinâmica do script
```

---

## 📧 Integração de Formulário

### Endpoint Atual

- **URL**: `POST /api/submit`
- **Body**: `{ name: string, email: string }`
- **Validação**: Email obrigatório
- **Response**: `{ success: true/false }`

### Implementação Atual (Desenvolvimento)

```javascript
// pages/api/submit.js
console.log('Lead:', { name, email }) // Loga no console
return res.status(200).json({ success: true })
```

### Para Produção

Conecte a um dos serviços:

#### SendGrid

```javascript
const sgMail = require('@sendgrid/mail')
sgMail.send({
  to: 'seu-email@exemplo.com',
  from: 'noreply@conversaoextrema.com',
  subject: `Novo Lead: ${name}`,
  text: `Email: ${email}`,
})
```

#### HubSpot

```javascript
const hubspot = require('@hubspot/api-client')
hubspot.crm.contacts.basicApi.create({
  properties: [
    { name: 'firstname', value: name.split(' ')[0] },
    { name: 'email', value: email },
  ],
})
```

#### Supabase

```javascript
const { data, error } = await supabase
  .from('leads')
  .insert([{ name, email, created_at: new Date() }])
```

---

## 📦 Componentes

### Hero.js (Componente Principal - 835 linhas)

- Todas as 13 seções em um único arquivo
- Gerencia estado do formulário
- Bem organizado com comentários
- Usa classes Tailwind + animações customizadas

```javascript
// Estrutura
export default function Hero() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)

  return (
    <div>
      {/* Seção 1: Hero */}
      {/* Seção 2: Problema */}
      {/* ... até Seção 13: Footer */}
    </div>
  )
}
```

### ConsentBanner.js (Consent Manager)

- Gerencia localStorage
- Injeção dinâmica de Plausible
- Dismissível + sticky

### VisualElements.js (Utilitários Visuais)

Componentes reutilizáveis:

- `StatCard` - Card de estatística com delay
- `ProcessStep` - Etapa do processo
- `FAQItem` - Item de FAQ com accordion
- `Testimonial` - Cartão de testemunho
- `BeforeAfterCard` - Comparativo antes/depois
- `CTA` - Botão genérico
- `SectionHeading` - Heading de seção

---

## 🚀 Deploy no Vercel

### 1. Preparar Repositório

```bash
git init
git add .
git commit -m "Landing page Conversão Extrema - Versão 1"
git branch -M main
git remote add origin https://github.com/seu-usuario/lp-conversaoextrema.git
git push -u origin main
```

### 2. Conectar ao Vercel

- Acesse [vercel.com](https://vercel.com)
- Clique "New Project"
- Selecione seu repositório GitHub
- Click "Import"

### 3. Configurar Variáveis de Ambiente

No painel Vercel:

1. Vá para "Settings" → "Environment Variables"
2. Adicione: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` = `seu-dominio.com`
3. Click "Deploy"

### 4. Configurar Domínio Customizado

- Em "Domains", adicione seu domínio
- Configure DNS no registrador

### 5. Deploy Live

```
✓ Seu site estará em: https://seu-projeto.vercel.app
✓ Ou em seu domínio customizado
```

---

## 📈 Performance & SEO

### Otimizações Implementadas

- ✅ Next.js Turbopack (compilação rápida)
- ✅ CSS inline via Tailwind (zero layout shifts)
- ✅ Tipografia Google pré-carregada
- ✅ Sem imagens pesadas (SVG icons apenas)
- ✅ Mobile-first responsive
- ✅ Animações GPU-accelerated

### Lighthouse Target

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### Meta Tags (Adicionar em `pages/_app.js`)

```javascript
<Head>
  <title>Parar de Perder Contratos | Conversão Extrema</title>
  <meta
    name='description'
    content='Transforme seu Instagram em máquina de vendas...'
  />
  <meta name='og:image' content='preview.png' />
</Head>
```

---

## 🔐 Segurança

| Implementação    | Status | Detalhes                               |
| ---------------- | ------ | -------------------------------------- |
| Email validation | ✅     | Validação básica + regex               |
| CORS             | ✅     | API route com origin check             |
| Env vars         | ✅     | Nenhuma chave exposta (NEXT*PUBLIC*\*) |
| GDPR/LGPD        | ✅     | Plausible + consent banner             |
| Rate limiting    | ⚠️     | Implementar em produção                |
| CSRF             | ⚠️     | Adicionar token verification           |

---

## 📝 Checklist Pré-Deploy

- [ ] Testar em mobile (iPhone/Android)
- [ ] Testar formulário com dados reais
- [ ] Configurar Plausible + domain
- [ ] Conectar formulário a CRM
- [ ] Adicionar Google Analytics (opcional)
- [ ] Adicionar robots.txt + sitemap.xml
- [ ] Testar velocidade (GTmetrix/PageSpeed)
- [ ] Revisar copy com stakeholders
- [ ] Configurar email de notificação de leads
- [ ] Fazer deploy em staging primeiro

---

## 🎯 Próximos Passos Recomendados

### Imagem 1: Adicionar Avatares

```bash
npm install sharp    # Para otimizar imagens
```

### Integrações CRM

- [ ] SendGrid (email)
- [ ] HubSpot (CRM full)
- [ ] Zapier (automação)
- [ ] Supabase (banco de dados)

### Experiência Melhorada

- [ ] Video hero (Vimeo/YouTube)
- [ ] Countdown timer urgência
- [ ] Live chat (Drift/Intercom)
- [ ] Testimonials dinâmicos

### A/B Testing

- [ ] Testar diferentes headlines
- [ ] Variações de cores de CTA
- [ ] Ordem de seções
- [ ] Tamanho de formulário

---

## 💡 Dicas de Otimização

### Copy

1. Teste múltiplas variações de headlines
2. Mantenha parágrafos curtos (3-4 linhas max)
3. Use power words: "Extrema", "Premium", "Garantia"

### CTAs

1. Mude cor/posição e meça cliques
2. Use urgência: "Últimas 3 vagas"
3. Crie contraste com background

### Formulário

1. Comece com 2 campos (nome + email)
2. Se taxa de conversão >15%, adicione mais
3. Use placeholder descriptivo

### Social Proof

1. Adicione números reais quando possível
2. Use quotes de clientes verificados
3. Mostre logos de empresas conhecidas

---

## 📞 Troubleshooting

### Build Error: "Cannot find module"

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Tailwind colors não aparecem

- Verificar `tailwind.config.cjs` colors extend
- Rodar `npm run build` para regenerar classes
- Limpar cache: `rm -rf .next`

### Plausible não carrega

- Verificar `.env.local` tem `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- Confirmar que banner foi clicado (localStorage)
- Verificar console para erros

### Formulário não envia

- Verificar `/api/submit` retorna 200
- Ver console do navegador para erro
- Testar com curl: `curl -X POST http://localhost:3000/api/submit`

---

## 📚 Recursos Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Plausible Setup](https://plausible.io/docs)
- [GDPR Compliance](https://gdpr-info.eu/)

---

## 📄 Licença

Proprietary © 2024 Conversão Extrema. Todos os direitos reservados.

---

**Desenvolvido com precisão para máxima conversão.**

```
Status: ✅ Pronto para Deploy
Performance: 🚀 Otimizado para mobile-first
Analytics: 📊 Plausible integrado
Conversão: 💰 13 seções estratégicas
```
