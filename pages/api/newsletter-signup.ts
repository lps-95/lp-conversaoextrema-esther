import type { NextApiRequest, NextApiResponse } from 'next'
import type { Language } from '../../contexts/LanguageContext'
import { sendConfirmationEmail } from '../../lib/email'
import { getSupabaseAdmin } from '../../lib/supabaseAdmin'

const VALID_LANGUAGES: Language[] = ['pt', 'en', 'es']

/**
 * Endpoint chamado pelo formulário de newsletter (`useNewsletterSignup`).
 *
 * Diferente do `/api/submit-lead` (que salva local e nunca bloqueia o
 * redirecionamento pro WhatsApp), este endpoint EXIGE que o cadastro dê
 * certo antes de mostrar sucesso — porque aqui não existe um "redirect"
 * de fallback, o cadastro em si É a ação. O e-mail de confirmação, por
 * outro lado, É best-effort: se o Resend falhar, a pessoa já está
 * cadastrada mesmo assim (só não recebeu o e-mail de boas-vindas).
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, consent, language } = req.body
    const emailLanguage: Language = VALID_LANGUAGES.includes(language) ? language : 'pt'

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'E-mail inválido' })
    }

    // LGPD: sem consentimento explícito, o cadastro é recusado — mesmo que
    // o front-end já valide isso, o backend não pode confiar só nisso.
    if (consent !== true) {
      return res.status(400).json({ error: 'Consentimento obrigatório para o cadastro' })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const supabase = getSupabaseAdmin()

    const { data, error } = await supabase
      .from('newsletter_leads')
      .upsert(
        {
          name: name || null,
          email: normalizedEmail,
          consent_given_at: new Date().toISOString(),
          source: 'landing_page_conversao_extrema',
        },
        { onConflict: 'email' }
      )
      .select('unsubscribe_token')
      .single()

    if (error) throw error

    try {
      await sendConfirmationEmail(normalizedEmail, name || undefined, data.unsubscribe_token, emailLanguage)
    } catch (emailError) {
      console.error('[API][newsletter-signup] Cadastro salvo, mas e-mail de confirmação falhou:', emailError)
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('[API][newsletter-signup] Erro:', error)
    const message = error instanceof Error ? error.message : 'Erro ao processar cadastro'
    return res.status(500).json({ error: message })
  }
}
