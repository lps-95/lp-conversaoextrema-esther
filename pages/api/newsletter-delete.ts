import type { NextApiRequest, NextApiResponse } from 'next'
import { getSupabaseAdmin } from '../../lib/supabaseAdmin'

/**
 * Endpoint pra atender pedido de exclusão de dados (LGPD, Art. 18, VI).
 *
 * Não é self-serve (a pessoa não chama isso sozinha) — é pra VOCÊ usar
 * quando alguém pedir pra sair da lista, por exemplo via um cliente HTTP
 * qualquer (Postman, Insomnia) ou um pequeno script:
 *
 *   curl -X DELETE https://seu-dominio.com/api/newsletter-delete \
 *     -H "Content-Type: application/json" \
 *     -H "x-admin-secret: SEU_ADMIN_DELETE_SECRET" \
 *     -d '{"email":"pessoa@exemplo.com"}'
 *
 * Protegido por um segredo simples (`ADMIN_DELETE_SECRET`) pra ninguém
 * mais conseguir apagar cadastros aleatórios.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const adminSecret = process.env.ADMIN_DELETE_SECRET
  if (!adminSecret) {
    return res.status(500).json({ error: 'ADMIN_DELETE_SECRET não configurado' })
  }
  if (req.headers['x-admin-secret'] !== adminSecret) {
    return res.status(401).json({ error: 'Não autorizado' })
  }

  try {
    const { email } = req.body
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'E-mail é obrigatório' })
    }

    const supabase = getSupabaseAdmin()
    const { error, count } = await supabase
      .from('newsletter_leads')
      .delete({ count: 'exact' })
      .eq('email', email.toLowerCase().trim())

    if (error) throw error

    return res.status(200).json({ success: true, deleted: count ?? 0 })
  } catch (error) {
    console.error('[API][newsletter-delete] Erro:', error)
    const message = error instanceof Error ? error.message : 'Erro ao apagar cadastro'
    return res.status(500).json({ error: message })
  }
}
