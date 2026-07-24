import { randomUUID } from 'crypto'
import { existsSync, mkdirSync } from 'fs'
import { appendFile } from 'fs/promises'
import path from 'path'

/**
 * Armazenamento simples de leads em arquivo local (JSON Lines), usado como
 * registro auxiliar do que foi enviado — best effort, nunca bloqueia o
 * redirecionamento pro WhatsApp.
 *
 * ⚠️ Em ambientes serverless (Vercel etc.) o sistema de arquivos é
 * efêmero, então isso não persiste em produção lá. Funciona bem localmente
 * e em servidores próprios com disco persistente.
 */

export interface StoredLead {
  id: string
  name: string
  email: string
  phone: string
  plan?: string
  bestTime?: string
  niche?: string
  followers?: string
  revenue?: string
  mainGoal?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  origin?: string
  createdAt: string
}

const DATA_DIR = path.join(process.cwd(), 'data')
const LEADS_FILE = path.join(DATA_DIR, 'leads.jsonl')

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true })
  }
}

/** Salva um lead como uma linha JSON no arquivo `data/leads.jsonl`. */
export async function saveLeadLocally(
  lead: Omit<StoredLead, 'id' | 'createdAt'>
): Promise<StoredLead> {
  ensureDataDir()

  const record: StoredLead = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...lead,
  }

  await appendFile(LEADS_FILE, JSON.stringify(record) + '\n', 'utf-8')

  return record
}
