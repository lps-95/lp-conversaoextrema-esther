# Mensagens - API e Integração

Visão geral

- Este app agora persiste mensagens recebidas do WhatsApp (arquivo volátil) e expõe APIs para listar e enviar mensagens.
- Opcionalmente, cada mensagem recebida é encaminhada para um webhook da sua aplicação (gestao-clientesV2.0) para persistência real.

Endpoints

- GET /api/messages?phone=E164&limit=100: Lista mensagens armazenadas localmente (debug/rápido).
- POST /api/messages/send: Envia mensagem via WhatsApp Cloud API.
  Body JSON:
  { "to": "+55DDDNNNNNNNN", "body": "texto" }
  ou
  { "to": "+55...", "templateName": "lead_confirmation", "templateParams": ["...", "..."] }

Encaminhamento para aplicação externa (recomendado)

1. Configure envs neste app:
   - GESTAO_CLIENTES_WEBHOOK_URL=https://sua-app/api/integrations/whatsapp/webhook
   - GESTAO_CLIENTES_WEBHOOK_SECRET=uma_chave_segura
2. Toda mensagem recebida será POSTada como:
   {
   "event": "message" | "status",
   "data": { ...campos },
   }
   Headers: x-signature: HMAC-SHA256(payload, secret)

Código para sua aplicação (Next.js route exemplo)
// src/app/api/integrations/whatsapp/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

function verifySignature(secret: string, payload: string, sig?: string|null) {
if (!secret) return true
if (!sig) return false
const h = crypto.createHmac('sha256', secret).update(payload).digest('hex')
return crypto.timingSafeEqual(Buffer.from(h), Buffer.from(sig))
}

export async function POST(req: NextRequest) {
const secret = process.env.WHATSAPP_WEBHOOK_SECRET || ''
const raw = await req.text()
const ok = verifySignature(secret, raw, req.headers.get('x-signature'))
if (!ok) return NextResponse.json({ error: 'invalid signature' }, { status: 401 })
const body = JSON.parse(raw)

// TODO: persistir body em banco (ex.: Prisma) e gerar notificações
console.log('Inbound WhatsApp event:', body)
return NextResponse.json({ received: true })
}

Observações

- Em Vercel, o arquivo local em /tmp é temporário; para histórico real, persista no seu banco pela aplicação externa.
