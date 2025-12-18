# 🚀 Guia Rápido de Deploy - Conversão Extrema

## ⚡ Deploy em 15 Minutos (Vercel)

### Pré-requisitos

- ✅ GitHub account
- ✅ Vercel account (free)
- ✅ Projeto pronto (você tem!)

---

## 📋 Checklist Pré-Deploy

### 1. Código

- [x] Build local passa: `npm run build` ✅
- [x] Sem erros de TypeScript/ESLint
- [x] Formulário testado localmente
- [x] Animações funcionando
- [x] Responsivo em mobile ✅

### 2. Configuração

- [ ] `.env.local` criado (local)
- [ ] `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` preenchido
- [ ] Nenhuma senha/API key exposta
- [ ] `.gitignore` configurado (já está)

### 3. Git

- [ ] Repositório inicializado
- [ ] Todos os arquivos commitados
- [ ] Código pronto em `main` branch

---

## 🔧 Passo 1: Preparar Git (5 min)

### 1.1 Inicializar Repositório Localmente

```bash
cd "c:\Users\devel\OneDrive\Documentos\projetos\lp-conversãoextrema-esther"

# Inicializar git
git init

# Adicionar todos os arquivos
git add .

# Criar commit inicial
git commit -m "Landing page Conversão Extrema - v1.0 (13 seções)"

# Renomear branch para main
git branch -M main
```

### 1.2 Criar Repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Nome: `lp-conversaoextrema`
3. Descrição: "Landing page de alta conversão - Conversão Extrema"
4. Deixar **public** (grátis) ou **private**
5. Click "Create repository"

### 1.3 Conectar ao GitHub

```bash
# Substituir seu-usuario pelo seu GitHub username
git remote add origin https://github.com/seu-usuario/lp-conversaoextrema.git

# Fazer push
git push -u origin main
```

---

## 🌐 Passo 2: Deploy no Vercel (10 min)

### 2.1 Conectar Vercel ao GitHub

1. Acesse [vercel.com](https://vercel.com)
2. Se necessário, crie conta (free)
3. Clique "New Project"
4. Clique "Import Git Repository"
5. Procure por `lp-conversaoextrema`
6. Clique "Import"

### 2.2 Configurar Variáveis de Ambiente

Na página de importação do Vercel:

1. Procure por "Environment Variables"
2. Clique "Add"
3. Preencha:
   - **Name**: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
   - **Value**: `seu-dominio.com` (ex: `conversaoextrema.com`)
   - **Scope**: All (Production, Preview, Development)
4. Clique "Save"

### 2.3 Deploy!

1. Clique "Deploy"
2. Espere 1-2 minutos
3. Quando verde: ✅ "Deployment successful"
4. Clique "Visit" para ver ao vivo!

**URL gerada automaticamente**: `seu-projeto.vercel.app`

---

## 🎯 Passo 3: Configurar Domínio Customizado (Opcional)

### 3.1 Se Você Já Tem Domínio

1. No painel Vercel, vá para "Domains"
2. Clique "Add"
3. Digite seu domínio (ex: `conversaoextrema.com`)
4. Clique "Add"
5. Vercel mostrará os nameservers
6. Va para seu registrador de domínio (Godaddy, Namecheap, etc)
7. Atualize os nameservers
8. Espere ~30 min para propagar

### 3.2 Se Não Tem Domínio

1. Compre em Namecheap/Godaddy (R$15-30/ano)
2. Siga os passos acima
3. Ou use `seu-projeto.vercel.app` de graça

---

## ✅ Passo 4: Verificar Deploy

### 4.1 Checklist Pós-Deploy

- [ ] Site abre sem erro (status 200)
- [ ] Todas as seções visíveis
- [ ] Animações funcionam
- [ ] Botões clicáveis
- [ ] Formulário funciona
- [ ] Mobile responsivo
- [ ] Não há console errors

### 4.2 Testar Formulário

1. Vá para seu site
2. Scroll até o formulário
3. Preencha: nome + email
4. Clique "Quero Parar de Perder Agora"
5. Veja mensagem de sucesso
6. Dados devem aparecer em... (depende da integração CRM)

### 4.3 Testar Analytics

1. Aceite o banner de consentimento (se aparecer)
2. Acesse [plausible.io](https://plausible.io) dashboard
3. Veja página rastreada
4. ✅ Analytics funcionando!

---

## 🔗 Passo 5: Integrar CRM (Próximo Passo)

### Para Receber Leads via Email

#### Opção 1: SendGrid (Recomendado para iniciantes)

```javascript
// pages/api/submit.js
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default async function handler(req, res) {
  const { name, email } = req.body

  try {
    await sgMail.send({
      to: 'seu-email@exemplo.com',
      from: 'noreply@conversaoextrema.com',
      subject: `🎯 Novo Lead: ${name}`,
      html: `
        <h2>Novo lead capturado!</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Data:</strong> ${new Date().toLocaleString()}</p>
      `,
    })
    return res.status(200).json({ success: true })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false })
  }
}
```

1. Crie conta grátis em [SendGrid](https://sendgrid.com)
2. Gere API key
3. Configure em Vercel: `SENDGRID_API_KEY`
4. Rode deploy

#### Opção 2: Zapier (Zero Código)

1. Crie conta em [Zapier](https://zapier.com)
2. Novo Zap: "Webhook" → "Catch Raw Hook"
3. Copie URL
4. Configure em `/api/submit` para fazer POST para Zapier
5. Conecte a Google Sheets / Email / HubSpot

---

## 📊 Monitorar Performance

### Analytics

- **Plausible**: Já integrado, vá para painel
- **Vercel Analytics**: Automático no painel
- **Conversões**: Monitorar em CRM

### Otimizações Futuras

```bash
# Testar Lighthouse score
vercel analytics --enable

# Ver logs
vercel logs

# Rebuild se necessário
vercel deploy --prod --force
```

---

## 🎯 Próximas Ações

### Assim que Deploy Funcionar

1. [ ] Testar formulário em produção
2. [ ] Compartilhar URL com stakeholders
3. [ ] Fazer A/B test de headlines
4. [ ] Integrar CRM (SendGrid/HubSpot)
5. [ ] Monitorar analytics por 1 semana

### Primeira Semana

1. [ ] Coletar 10+ leads
2. [ ] Testar taxa de conversão
3. [ ] Ajustar copy baseado em feedback
4. [ ] Integrar com email sequence

### Primeira Mês

1. [ ] Otimizar baseado em data
2. [ ] Adicionar video hero
3. [ ] A/B test seções
4. [ ] Aumentar tráfego (ads/organic)

---

## ⚙️ Troubleshooting Deploy

### "Deployment failed"

```bash
# Verificar build localmente
npm run build

# Se falhar, verificar erros
npm run build 2>&1 | tail -50

# Se OK localmente, push novamente
git push
```

### Formulário não funciona

- Verificar se `.env.local` foi setada em Vercel
- Verificar logs: `vercel logs`
- Fazer test POST: `curl -X POST https://seu-dominio/api/submit`

### Animações não funcionam

- Limpar cache Vercel
- Verificar `styles/globals.css` foi deployada
- Verificar `tailwind.config.cjs` cores

### Lento em produção

- Verificar Lighthouse score (vercel.com/analytics)
- Otimizar imagens
- Habilitar cache

---

## 🎉 Checklist Final

- [ ] Git repository criado
- [ ] GitHub conectado
- [ ] Vercel deployment feito
- [ ] Domain configurado (opcional)
- [ ] Env vars setadas
- [ ] Site abrindo sem erros
- [ ] Formulário enviando
- [ ] Analytics funcionando
- [ ] Mobile responsivo
- [ ] URL compartilhada com cliente

---

## 📞 Suporte Rápido

| Problema                   | Solução                        |
| -------------------------- | ------------------------------ |
| "Module not found"         | `npm install` + rebuild        |
| Vercel says "Build failed" | Check `npm run build` locally  |
| Formulário não envia       | Verificar `/api/submit` logs   |
| Site muito lento           | Verificar Lighthouse, otimizar |
| Domínio não funciona       | Aguardar DNS propagar (30 min) |

---

## ✨ Resultado Final

Você terá:

- ✅ Landing page ao vivo em produção
- ✅ URL customizável
- ✅ Analytics rodando
- ✅ Leads sendo capturados
- ✅ Pronto para otimizar

**Tempo total: ~15 minutos**

---

## 🚀 Começar Agora!

```bash
# 1. Git setup
git init
git add .
git commit -m "Initial commit"

# 2. GitHub (web)
# Criar repo em github.com/new

# 3. Connect local
git remote add origin https://github.com/seu-usuario/repo.git
git push -u origin main

# 4. Vercel (web)
# Acesse vercel.com → Import GitHub

# ✅ Deploy pronto em ~2 min!
```

---

**Sucesso! Sua landing page está ao vivo. 🎉**
