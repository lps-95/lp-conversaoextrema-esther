# Templates do WhatsApp Business API

## 📋 Como Criar Templates

### Via Meta Business Manager

1. Acesse: https://business.facebook.com/wa/manage/message-templates/
2. Selecione sua conta do WhatsApp Business
3. Clique em "Criar modelo"
4. Preencha os campos conforme os exemplos abaixo

---

## 🎯 Templates Recomendados

### 1. **Confirmação de Lead** (Alta prioridade)

**Nome do template:** `lead_confirmation`  
**Categoria:** UTILITY (Utilitário)  
**Idioma:** Portuguese (BR)

**Cabeçalho:** Sem cabeçalho

**Corpo da mensagem:**

```
Olá {{1}}! 👋

Recebemos seu interesse na Mentoria Esther Social Media!

📋 Seus dados:
• E-mail: {{2}}
• Plano: {{3}}
• WhatsApp: {{4}}

✅ Próximos passos:
Nossa equipe entrará em contato em breve para agendar uma conversa inicial e explicar tudo sobre o programa.

🚀 Prepare-se para transformar seu Instagram em uma máquina de autoridade!

_Esta é uma mensagem automática de confirmação._
```

**Rodapé:** Esther Social Media © 2025

**Botões:**

- Resposta rápida: "Tenho dúvidas" → mensagem do cliente
- URL: "Ver site" → https://lp-conversaoextrema-esther.vercel.app

**Variáveis:**

- {{1}} = Nome do lead
- {{2}} = E-mail
- {{3}} = Plano escolhido
- {{4}} = WhatsApp formatado

---

### 2. **Boas-vindas Simples** (Aprovação rápida)

**Nome do template:** `boas_vindas`  
**Categoria:** UTILITY  
**Idioma:** Portuguese (BR)

**Corpo:**

```
Olá {{1}}! 🌟

Obrigada pelo seu interesse na Mentoria Esther Social Media!

Nossa equipe vai entrar em contato em breve.

Enquanto isso, fique à vontade para tirar dúvidas aqui no WhatsApp.

Abraços,
Equipe Esther Social Media
```

**Variáveis:**

- {{1}} = Nome

---

### 3. **Alerta Interno para o Time**

**Nome do template:** `novo_lead_interno`  
**Categoria:** UTILITY  
**Idioma:** Portuguese (BR)

**Corpo:**

```
🔔 NOVO LEAD CAPTURADO!

👤 Nome completo: {{1}}
📧 E-mail de contato: {{2}}
📱 Número WhatsApp: {{3}}
💎 Plano escolhido: {{4}}
🕐 Melhor horário: {{5}}

📊 Dados de rastreamento:
• Origem Source: {{6}}
• Origem Medium: {{7}}
• Nome da campanha: {{8}}

🌐 URL de origem: {{9}}

⏰ Recebido em {{10}}

Entre em contato em breve!
```

**Variáveis:**

- {{1}} = Nome
- {{2}} = E-mail
- {{3}} = WhatsApp
- {{4}} = Plano
- {{5}} = Melhor horário
- {{6}} = UTM Source
- {{7}} = UTM Medium
- {{8}} = UTM Campaign
- {{9}} = URL de origem
- {{10}} = Data/hora

---

### 4. **Lembrete de Agendamento**

**Nome do template:** `lembrete_reuniao`  
**Categoria:** UTILITY  
**Idioma:** Portuguese (BR)

**Corpo:**

```
Olá {{1}}! 📅

Lembrando que nossa reunião está agendada para:

📆 Data: {{2}}
🕐 Horário: {{3}}

Te aguardamos!

Caso precise reagendar, responda esta mensagem.

Abraços,
Esther Social Media
```

---

## 🔧 Como Usar no Código

Após criar e aprovar os templates, use assim:

```typescript
import { sendWhatsAppTemplate } from '../lib/whatsapp'

// Confirmação de lead
await sendWhatsAppTemplate({
  to: '5548991964517',
  templateName: 'lead_confirmation',
  language: 'pt_BR',
  components: [
    {
      type: 'body',
      parameters: [
        { type: 'text', text: 'João Silva' }, // {{1}} nome
        { type: 'text', text: 'joao@email.com' }, // {{2}} email
        { type: 'text', text: 'Premium' }, // {{3}} plano
        { type: 'text', text: '(48) 99196-4517' }, // {{4}} whatsapp
      ],
    },
  ],
})
```

---

## ✅ Boas Práticas

### Para Aprovação Rápida:

1. **Use categoria UTILITY** para confirmações e notificações transacionais
2. **Evite linguagem promocional** no primeiro template
3. **Seja claro e objetivo**
4. **Não use emojis em excesso** na primeira versão
5. **Inclua opção de opt-out** se for marketing

### Formatação:

- **Negrito:** _texto entre asteriscos_
- _Itálico:_ texto entre underscores\_
- `Monoespaçado:` texto entre crases ```
- ~~Riscado:~~ ~texto entre tils~

### Limites:

- Cabeçalho: 60 caracteres
- Corpo: 1.024 caracteres
- Rodapé: 60 caracteres
- Botões: até 3

---

## 🚀 Próximos Passos

1. **Crie o template básico** (boas_vindas) primeiro para aprovação rápida
2. **Teste no sandbox** antes de usar em produção
3. **Monitore a taxa de entrega** no Meta Business Manager
4. **Crie variações** para A/B testing

---

## 📞 Testando o Template

Após aprovação, teste via cURL:

```bash
curl -X POST "https://graph.facebook.com/v20.0/SEU_PHONE_NUMBER_ID/messages" \
  -H "Authorization: Bearer SEU_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "messaging_product": "whatsapp",
    "to": "5548999999999",
    "type": "template",
    "template": {
      "name": "boas_vindas",
      "language": { "code": "pt_BR" },
      "components": [
        {
          "type": "body",
          "parameters": [
            { "type": "text", "text": "João" }
          ]
        }
      ]
    }
  }'
```

---

## 📚 Recursos Úteis

- [Documentação oficial de templates](https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates)
- [Exemplos de templates aprovados](https://developers.facebook.com/docs/whatsapp/message-templates/guidelines)
- [Meta Business Manager](https://business.facebook.com/wa/manage/message-templates/)

---

**Dica:** Comece com templates simples e transacionais (UTILITY). Após aprovação, você pode criar templates mais elaborados e de marketing (MARKETING).
