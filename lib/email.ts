import { Resend } from 'resend'
import { confirmationEmailContent } from '../content/newsletter'

/**
 * Envio do e-mail de confirmação de cadastro na newsletter.
 *
 * ⚠️ Assim como `lib/supabaseAdmin.ts`, isso só pode ser usado dentro de
 * `pages/api/*` (código de servidor) — a chave do Resend nunca pode ir
 * pro navegador.
 *
 * Esse envio é "best effort": se falhar, quem chamou essa função decide
 * o que fazer (no nosso caso, o cadastro já foi salvo no banco antes
 * disso rodar, então uma falha aqui não desfaz o cadastro — só significa
 * que a pessoa não recebeu o e-mail de boas-vindas).
 */
export async function sendConfirmationEmail(to: string, name?: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('Resend não configurado: defina RESEND_API_KEY no .env.local')
  }

  // Enquanto o domínio do site não estiver verificado no Resend, use o
  // remetente de teste deles (onboarding@resend.dev) — funciona, mas só
  // entrega pro e-mail cadastrado como "teste" na sua conta Resend. Depois
  // que você verificar seu próprio domínio lá, troque essa env var.
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

  const resend = new Resend(apiKey)

  const { heading, body, footerNote, fromName, subject } = confirmationEmailContent

  // E-mail HTML precisa de estilo inline e layout em tabela — clientes de
  // e-mail (Gmail, Outlook etc.) ignoram <style> externo e boa parte do
  // CSS moderno, então isso não pode ser feito com as classes Tailwind do
  // resto do site. As cores abaixo são as mesmas de `tailwind.config.cjs`
  // (accent.gold, accent.cream, primary.dark) — pra manter a identidade
  // visual igual à da landing page.
  const html = `
  <!DOCTYPE html>
  <html lang="pt-BR">
    <head>
      <meta charset="utf-8" />
      <meta name="color-scheme" content="dark light" />
    </head>
    <body style="margin:0; padding:0; background-color:#000000; font-family: Georgia, 'Times New Roman', serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#000000; padding: 32px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width: 480px; width: 100%;">

              <!-- Wordmark -->
              <tr>
                <td align="center" style="padding-bottom: 24px;">
                  <span style="font-family: Georgia, 'Times New Roman', serif; font-size: 13px; letter-spacing: 3px; text-transform: uppercase; color: #d4af37;">
                    Esther Social Media
                  </span>
                </td>
              </tr>

              <!-- Linha em degradê dourado, referência ao mesmo detalhe usado nos botões do site -->
              <tr>
                <td style="height: 2px; background: linear-gradient(90deg, #e8dcc8, #d4af37, #e8dcc8); border-radius: 2px;"></td>
              </tr>

              <!-- Cartão principal -->
              <tr>
                <td style="background-color: #0d0c12; border: 1px solid rgba(232,220,200,0.15); border-radius: 16px; padding: 32px 28px; margin-top: 24px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding-top: 24px;">
                        <h1 style="margin: 0 0 16px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 22px; color: #ffffff; font-weight: bold;">
                          ${heading(name)}
                        </h1>
                        ${body
                          .map(
                            (p) =>
                              `<p style="margin: 0 0 14px 0; font-family: Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #e8e8e8;">${p}</p>`
                          )
                          .join('\n')}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Rodapé -->
              <tr>
                <td style="padding: 24px 8px 0 8px;" align="center">
                  <p style="margin: 0; font-family: Helvetica, Arial, sans-serif; font-size: 12px; line-height: 1.6; color: #6a6a6a;">
                    ${footerNote}
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `.trim()

  const { error } = await resend.emails.send({
    from: `${fromName} <${fromEmail}>`,
    to,
    subject,
    html,
  })

  if (error) {
    throw new Error(typeof error === 'string' ? error : error.message)
  }
}
