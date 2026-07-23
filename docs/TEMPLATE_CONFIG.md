# 📋 Configuração dos Templates WhatsApp

## ✅ Template: `lead_confirmation` (FUNCIONANDO)

**Parâmetros esperados:** 4

```
{{1}} = Nome do lead
{{2}} = E-mail
{{3}} = Plano escolhido
{{4}} = WhatsApp formatado (55 XX XXXXX-XXXX)
```

**Exemplo de uso:**

```
Olá {{1}}!

Recebemos seu interesse na Mentoria Esther Social Media!

📋 Seus dados foram registrados:
• E-mail: {{2}}
• Plano: {{3}}
• WhatsApp: {{4}}

✅ Próximos passos:
Nossa equipe entrará em contato em breve...
```

---

## 🔧 Template: `novo_lead_interno` (NECESSITA VERIFICAÇÃO)

**Parâmetros esperados:** 10

```
{{1}} = Nome do lead
{{2}} = E-mail
{{3}} = WhatsApp (APENAS NÚMEROS: 5592991799317)
{{4}} = Plano escolhido
{{5}} = Melhor horário
{{6}} = UTM Source
{{7}} = UTM Medium
{{8}} = UTM Campaign
{{9}} = URL de origem
{{10}} = Data/hora (formato: 20/12/2025, 14:20:52)
```

**Corpo do template no Meta Business deve ser:**

```
🔥 NOVO LEAD CAPTURADO!

👤 Nome: {{1}}
📧 E-mail: {{2}}
📱 WhatsApp: {{3}}
💎 Plano: {{4}}
🕐 Melhor horário: {{5}}

📊 Origem do Lead:
• Source: {{6}}
• Medium: {{7}}
• Campaign: {{8}}
• URL: {{9}}

⏰ {{10}}
```

---

## 🚨 CHECKLIST DE VERIFICAÇÃO

### No Meta Business Manager:

1. **Acesse:** [Meta Business Suite](https://business.facebook.com)
2. **Vá em:** WhatsApp > Message Templates
3. **Localize:** `novo_lead_interno`
4. **Verifique:**
   - [ ] Status: **APPROVED** (verde)
   - [ ] Número de variáveis: **Exatamente 10**
   - [ ] Ordem das variáveis: Conforme lista acima
   - [ ] Idioma: **pt_BR**

### Possíveis problemas:

#### ❌ Erro: "Invalid parameter"

**Causas comuns:**

1. Número de parâmetros diferente (esperado: 10, enviado: outro valor)
2. Parâmetro vazio ou null sendo enviado
3. Formato do template no Meta diferente do código
4. Template ainda está em "PENDING" (não totalmente aprovado)

#### ✅ Solução:

1. Conte quantas variáveis `{{X}}` existem no template do Meta
2. Verifique a ordem exata de cada variável
3. Se o template tiver **formato diferente**, ajuste o código em:
   - `lib/whatsapp.ts` → função `sendInternalLeadAlert`

---

## 🧪 TESTE MANUAL

Para testar o template manualmente via API do Meta:

```bash
curl -X POST \
  "https://graph.facebook.com/v20.0/YOUR_PHONE_ID/messages" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "messaging_product": "whatsapp",
    "to": "5548991964517",
    "type": "template",
    "template": {
      "name": "novo_lead_interno",
      "language": { "code": "pt_BR" },
      "components": [{
        "type": "body",
        "parameters": [
          {"type": "text", "text": "João Silva"},
          {"type": "text", "text": "joao@email.com"},
          {"type": "text", "text": "5511999999999"},
          {"type": "text", "text": "Premium"},
          {"type": "text", "text": "Manhã"},
          {"type": "text", "text": "google"},
          {"type": "text", "text": "cpc"},
          {"type": "text", "text": "black-friday"},
          {"type": "text", "text": "https://exemplo.com"},
          {"type": "text", "text": "20/12/2025, 15:00:00"}
        ]
      }]
    }
  }'
```

---

## 📝 COMO AJUSTAR O CÓDIGO

Se o template no Meta tiver **formato diferente**, você precisa:

### 1. Contar as variáveis no Meta

Exemplo: Se o template tiver 8 variáveis em vez de 10

### 2. Ajustar o código

Abra: `lib/whatsapp.ts` → linha ~412

Modifique o array `templateParams` para corresponder ao template do Meta:

```typescript
const templateParams = [
  String(params.name || 'Nome não informado').trim(),
  String(params.email || 'Email não informado').trim(),
  String(cleanPhone(params.whatsapp) || 'Não informado').trim(),
  String(params.plan || 'Não especificado').trim(),
  String(params.bestTime || 'Não informado').trim(),
  String(params.utmSource || 'direto').trim(),
  String(params.utmMedium || 'direto').trim(),
  String(params.utmCampaign || 'organico').trim(),
  String(params.origin || 'Landing Page').trim(),
  String(now).trim(),
]
```

### 3. Atualizar a constante EXPECTED_PARAMS

Em `lib/whatsapp.ts` → linha ~18:

```typescript
const EXPECTED_PARAMS: Record<string, number> = {
  lead_confirmation: 4,
  boas_vindas: 1,
  lembrete_reuniao: 3,
  novo_lead_interno: 10, // ← Ajuste este número
}
```

---

## 🎯 PRÓXIMO TESTE

Depois de verificar no Meta, faça um novo teste preenchendo o formulário.

O log deve mostrar:

```
[WhatsApp] 📋 Parâmetros do template interno: [
  'ESTHER LOPES',
  'Esther.lps27@gmail.com',
  '5592991799317',
  'Não especificado',
  'Manhã',
  'direto',
  'direto',
  'organico',
  'https://lp-conversaoextrema-esther.vercel.app/',
  '20/12/2025, 14:20:52'
]
```

Se ainda falhar, compartilhe:

1. Screenshot do template no Meta Business
2. O log completo com os parâmetros
