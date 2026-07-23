# 📚 Guia Prático: Como Usar os Templates do WhatsApp

## 🎯 Templates Disponíveis e Como Usar

### 1️⃣ **lead_confirmation** - Confirmação de Lead

**O que faz:** Envia mensagem automática quando alguém preenche o formulário.

**Quando usar:** Automático (já está configurado!)

**Como funciona:**

```typescript
// Em pages/api/submit.ts - JÁ ESTÁ ATIVO!
await sendLeadConfirmation(
  normalizedPhone, // WhatsApp do lead
  name, // Nome do lead
  email, // E-mail do lead
  plan // Plano escolhido
)
```

**✅ O que fazer:**

1. Criar o template `lead_confirmation` no Meta Business Manager
2. Aprovar o template (24-48h)
3. Adicionar no `.env.local`:
   ```bash
   WHATSAPP_TEMPLATE_LEAD_CONFIRM=lead_confirmation
   ```
4. Pronto! Funciona automaticamente quando alguém preencher o formulário

---

### 2️⃣ **boas_vindas** - Boas-vindas Simples

**O que faz:** Versão mais curta e direta da confirmação.

**Quando usar:** Como alternativa ao `lead_confirmation` ou para testes iniciais.

**Como ativar:**

```typescript
// Em pages/api/submit.ts, substitua a linha:
await sendLeadConfirmation(normalizedPhone, name, email, entry.plan)

// Por:
await sendWelcomeMessage(normalizedPhone, name)
```

**✅ O que fazer:**

1. Criar o template `boas_vindas` no Meta (é mais simples, aprova rápido!)
2. Adicionar no `.env.local`:
   ```bash
   WHATSAPP_TEMPLATE_WELCOME=boas_vindas
   ```
3. Modificar `pages/api/submit.ts` conforme acima

**💡 Dica:** Crie este primeiro! É mais simples e será aprovado rapidamente.

---

### 3️⃣ **lembrete_reuniao** - Lembrete de Reunião

**O que faz:** Envia lembrete para reuniões agendadas.

**Quando usar:** Manualmente ou via automação externa (Zapier, n8n, etc).

**Como usar manualmente:**

**Opção A: Via API (Insomnia, Postman, cURL)**

```bash
# Criar arquivo: pages/api/send-reminder.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { sendMeetingReminder } from '../../lib/whatsapp'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { phone, name, date, time } = req.body

  if (!phone || !name || !date || !time) {
    return res.status(400).json({ error: 'Campos obrigatórios: phone, name, date, time' })
  }

  try {
    const result = await sendMeetingReminder(phone, name, date, time)
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao enviar lembrete' })
  }
}
```

**Depois, faça POST para:**

```bash
POST https://sua-landing.vercel.app/api/send-reminder
Content-Type: application/json

{
  "phone": "5548991964517",
  "name": "João Silva",
  "date": "22/12/2024",
  "time": "14:00"
}
```

**Opção B: Direto no código (agenda interna)**

```typescript
import { sendMeetingReminder } from '../lib/whatsapp'

// Exemplo: agendar lembrete para amanhã às 14h
await sendMeetingReminder('5548991964517', 'Maria Souza', '22/12/2024', '14:00')
```

**✅ O que fazer:**

1. Criar o template `lembrete_reuniao` no Meta
2. Adicionar no `.env.local`:
   ```bash
   WHATSAPP_TEMPLATE_MEETING=lembrete_reuniao
   ```
3. Criar a rota `/api/send-reminder.ts` (opcional)
4. Integrar com seu sistema de agendamento

---

### 4️⃣ **novo_lead_interno** - Alerta para o Time

**O que faz:** Notifica a equipe quando entra um novo lead.

**Quando usar:** Automático (já está configurado!)

**Como funciona:**

```typescript
// Em pages/api/submit.ts - JÁ ESTÁ ATIVO!
await sendInternalLeadAlert({
  name,
  email,
  plan: entry.plan,
  whatsapp: normalizedPhone,
  bestTime: entry.bestTime,
  utmSource: entry.utmSource,
  utmMedium: entry.utmMedium,
  utmCampaign: entry.utmCampaign,
  origin: entry.origin,
})
```

**✅ O que fazer:**

1. Criar o template `novo_lead_interno` no Meta
2. Adicionar no `.env.local`:
   ```bash
   WHATSAPP_TEMPLATE_INTERNAL_ALERT=novo_lead_interno
   INTERNAL_ALERT_NUMBER=5548991964517  # Número da equipe
   ```
3. Pronto! Você receberá alertas automáticos

---

## 🚀 Passo a Passo Completo

### Fase 1: Setup Inicial (5 min)

1. **Adicionar variáveis de ambiente:**

```bash
# .env.local

# Templates do WhatsApp
WHATSAPP_TEMPLATE_LEAD_CONFIRM=lead_confirmation
WHATSAPP_TEMPLATE_WELCOME=boas_vindas
WHATSAPP_TEMPLATE_MEETING=lembrete_reuniao
WHATSAPP_TEMPLATE_INTERNAL_ALERT=novo_lead_interno

# Número para alertas internos
INTERNAL_ALERT_NUMBER=5548991964517

# Idioma dos templates
WHATSAPP_TEMPLATE_LANGUAGE=pt_BR
```

2. **Copiar para Vercel:**
   - Acesse: https://vercel.com/seu-projeto/settings/environment-variables
   - Adicione cada variável acima
   - Redeploy o projeto

---

### Fase 2: Criar Templates no Meta (20-30 min)

1. **Acesse:** https://business.facebook.com/wa/manage/message-templates/

2. **Crie na seguinte ordem:**

   **1º - boas_vindas** (aprovação rápida)

   - Categoria: UTILITY
   - Nome: `boas_vindas`
   - Corpo: (ver WHATSAPP_TEMPLATES.md)
   - ⏱️ Aguarde aprovação: ~24h

   **2º - lead_confirmation** (após boas_vindas aprovado)

   - Categoria: UTILITY
   - Nome: `lead_confirmation`
   - Corpo: (ver WHATSAPP_TEMPLATES.md)
   - ⏱️ Aguarde aprovação: ~24-48h

   **3º - novo_lead_interno**

   - Categoria: UTILITY
   - Nome: `novo_lead_interno`
   - Corpo: (ver WHATSAPP_TEMPLATES.md)

   **4º - lembrete_reuniao**

   - Categoria: UTILITY
   - Nome: `lembrete_reuniao`
   - Corpo: (ver WHATSAPP_TEMPLATES.md)

---

### Fase 3: Testar (após aprovação)

**Teste 1: Confirmação de Lead**

```bash
# Preencha o formulário da landing page
# Verifique se recebeu a mensagem automática no WhatsApp
```

**Teste 2: Alerta Interno**

```bash
# Após preencher o formulário
# Verifique se o número INTERNAL_ALERT_NUMBER recebeu o alerta
```

**Teste 3: Lembrete de Reunião (manual)**

```bash
# Via cURL ou Postman:
curl -X POST https://sua-landing.vercel.app/api/send-reminder \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "5548999999999",
    "name": "Teste",
    "date": "22/12/2024",
    "time": "14:00"
  }'
```

---

## 🔍 Monitoramento

### Ver logs em tempo real:

```bash
# Terminal local
npm run dev

# Vercel (produção)
vercel logs --follow
```

### Verificar status no Meta:

1. Acesse: https://business.facebook.com/wa/manage/phone-numbers/
2. Clique no seu número
3. Vá em "Insights" → "Templates"
4. Veja taxa de entrega, leitura e erros

---

## 🐛 Troubleshooting

### ❌ Erro: "Template not found"

**Causa:** Template ainda não aprovado ou nome errado  
**Solução:**

1. Verifique se está aprovado no Meta Business Manager
2. Confirme se o nome no `.env` é exatamente igual ao criado
3. Aguarde até 24-48h após criação

### ❌ Erro: "Recipient phone number not valid"

**Causa:** Número sem DDI ou formatação incorreta  
**Solução:**

- Usar formato: `5548991964517` (55 + DDD + número)
- Sem caracteres especiais: `(), -, espaços`

### ❌ Não recebo mensagens

**Causa:** Variáveis de ambiente faltando  
**Solução:**

1. Verifique se `WHATSAPP_TOKEN` e `WHATSAPP_PHONE_NUMBER_ID` estão configurados
2. Confirme no Vercel: Settings → Environment Variables
3. Redeploy após adicionar variáveis

### ❌ Alerta interno não chega

**Causa:** `INTERNAL_ALERT_NUMBER` não configurado  
**Solução:**

```bash
# Adicione no .env.local e na Vercel:
INTERNAL_ALERT_NUMBER=5548991964517
```

---

## 💡 Dicas Avançadas

### 1. A/B Testing de Templates

```typescript
// Testar qual template converte melhor
const useTemplateA = Math.random() > 0.5

if (useTemplateA) {
  await sendLeadConfirmation(phone, name, email, plan)
} else {
  await sendWelcomeMessage(phone, name)
}

// Track qual foi enviado
track('template_sent', { version: useTemplateA ? 'A' : 'B' })
```

### 2. Envio em Horário Específico

```typescript
// Agendar lembrete para 1 dia antes da reunião
const reminderDate = new Date(meetingDate)
reminderDate.setDate(reminderDate.getDate() - 1)

// Usar lib como node-cron ou agenda.js
schedule(reminderDate, async () => {
  await sendMeetingReminder(phone, name, date, time)
})
```

### 3. Personalização por Plano

```typescript
// Mensagem diferente por plano escolhido
if (plan === 'Premium') {
  await sendPremiumWelcome(phone, name)
} else if (plan === 'Profissional') {
  await sendProWelcome(phone, name)
} else {
  await sendWelcomeMessage(phone, name)
}
```

---

## 📊 Métricas Importantes

Monitore no Meta Business Manager:

- **Taxa de entrega:** > 95% é bom
- **Taxa de leitura:** > 80% é excelente
- **Taxa de resposta:** > 10% é ótimo
- **Bloqueios:** < 1% (se alto, revise conteúdo)

---

## 🎓 Recursos Úteis

- [Documentação Oficial](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-message-templates)
- [Políticas de Templates](https://www.facebook.com/business/help/2055875911147364)
- [Melhores Práticas](https://developers.facebook.com/docs/whatsapp/message-templates/guidelines)

---

**Dúvidas?** Verifique os logs da aplicação ou teste cada template individualmente no Meta Business Manager antes de colocar em produção.
