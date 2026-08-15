import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getSupabaseAdmin } from '../lib/supabaseAdmin'

interface Props {
  status: 'success' | 'not_found' | 'missing_token' | 'error'
}

/**
 * Página de cancelamento de inscrição na newsletter — o link que vai no
 * rodapé do e-mail de confirmação (`lib/email.ts`).
 *
 * LGPD, Art. 18, IX: a pessoa tem direito de revogar o consentimento a
 * qualquer momento, "de forma facilitada e gratuita". Um link direto que
 * já resolve sozinho (sem precisar logar em nada, sem precisar te
 * escrever um e-mail) é o jeito mais simples de cumprir isso — antes,
 * essa exclusão só podia ser feita por você, manualmente, via API.
 *
 * O `unsubscribe_token` é o que impede alguém de cancelar a inscrição de
 * outra pessoa só sabendo o e-mail dela: sem o token exato (que só existe
 * no e-mail que a própria pessoa recebeu), a busca não encontra nada.
 */
const CancelarInscricao: NextPage<Props> = ({ status }) => {
  const messages: Record<Props['status'], { title: string; body: string }> = {
    success: {
      title: 'Inscrição cancelada',
      body: 'Você não vai mais receber e-mails da nossa newsletter. Seu cadastro foi removido.',
    },
    not_found: {
      title: 'Link já utilizado ou inválido',
      body: 'Não encontramos um cadastro ativo para este link — é possível que sua inscrição já tenha sido cancelada antes.',
    },
    missing_token: {
      title: 'Link incompleto',
      body: 'Este link parece estar incompleto. Use o botão de cancelamento no e-mail que você recebeu.',
    },
    error: {
      title: 'Algo deu errado',
      body: 'Não conseguimos processar seu pedido agora. Tente novamente em instantes.',
    },
  }

  const { title, body } = messages[status]

  return (
    <>
      <Head>
        <title>{title} | Esther Social Media</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="font-display text-2xl font-bold mb-3">{title}</h1>
          <p className="text-text-secondary text-sm leading-relaxed mb-8">{body}</p>
          <Link href="/" className="text-button-primary text-sm hover:underline">
            ← Voltar para a página inicial
          </Link>
        </div>
      </main>
    </>
  )
}

export default CancelarInscricao

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const token = typeof query.token === 'string' ? query.token : null

  if (!token) {
    return { props: { status: 'missing_token' } }
  }

  try {
    const supabase = getSupabaseAdmin()
    const { error, count } = await supabase
      .from('newsletter_leads')
      .delete({ count: 'exact' })
      .eq('unsubscribe_token', token)

    if (error) throw error

    return { props: { status: count && count > 0 ? 'success' : 'not_found' } }
  } catch (err) {
    console.error('[cancelar-inscricao] Erro:', err)
    return { props: { status: 'error' } }
  }
}
