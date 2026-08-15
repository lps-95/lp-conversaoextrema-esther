import Head from 'next/head'
import Link from 'next/link'

/**
 * Política de Privacidade — obrigatória pra qualquer coleta de dados
 * pessoais sob a LGPD (Lei 13.709/2018). Cobre, no mínimo:
 * - quem é o controlador dos dados (Art. 9º, I)
 * - quais dados são coletados e pra quê (Art. 9º, I e II)
 * - base legal (Art. 7º)
 * - por quanto tempo os dados ficam guardados (Art. 9º, VII)
 * - como exercer os direitos do titular (Art. 18)
 * - canal de contato
 *
 * ⚠️ Os textos abaixo são um ponto de partida razoável, não substituem
 * revisão jurídica — principalmente se o negócio crescer e passar a
 * tratar mais tipos de dados ou compartilhar com mais terceiros.
 */
export default function PoliticaDePrivacidade() {
  return (
    <>
      <Head>
        <title>Política de Privacidade | Esther Social Media</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main className="min-h-screen bg-black text-white">
        <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
          <Link href="/" className="text-button-primary text-sm hover:underline">
            ← Voltar para a página inicial
          </Link>

          <h1 className="font-display text-3xl sm:text-4xl font-bold mt-6 mb-2">Política de Privacidade</h1>
          <p className="text-text-secondary text-sm mb-10">Última atualização: agosto de 2026</p>

          <div className="space-y-8 text-text-secondary leading-relaxed text-sm sm:text-base">
            <section>
              <h2 className="text-text-primary font-bold text-lg mb-2">1. Quem trata os seus dados</h2>
              <p>
                Esta página é operada por Esther Maia (Esther Social Media), responsável pelo tratamento
                dos dados pessoais coletados neste site. Dúvidas ou solicitações sobre seus dados podem
                ser enviadas para{' '}
                <a href="mailto:esther.lps27@gmail.com" className="text-button-primary hover:underline">
                  esther.lps27@gmail.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-text-primary font-bold text-lg mb-2">2. Quais dados coletamos</h2>
              <p className="mb-3">Coletamos dados diferentes dependendo de como você interage com o site:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong className="text-text-primary">Formulário de agendamento de sessão:</strong> nome,
                  e-mail, WhatsApp, nicho de atuação e respostas sobre seu negócio (seguidores, faturamento,
                  objetivo). Usados para preparar o atendimento e entrar em contato pelo WhatsApp.
                </li>
                <li>
                  <strong className="text-text-primary">Cadastro para newsletter/materiais:</strong> nome
                  (opcional) e e-mail. Usados exclusivamente para enviar os materiais solicitados e
                  comunicações sobre novidades — só com o seu consentimento explícito no momento do cadastro.
                </li>
                <li>
                  <strong className="text-text-primary">Cookies/analytics:</strong> dados de navegação
                  anônimos, coletados apenas se você aceitar no banner de cookies exibido no site.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-text-primary font-bold text-lg mb-2">3. Base legal e finalidade</h2>
              <p>
                O tratamento dos seus dados se baseia no seu <strong className="text-text-primary">consentimento</strong>{' '}
                (Art. 7º, I da LGPD), dado de forma livre e informada ao preencher cada formulário. Os dados do
                formulário de agendamento também se baseiam na necessidade de{' '}
                <strong className="text-text-primary">execução de procedimentos preliminares</strong> a um
                possível contrato de prestação de serviço (Art. 7º, V).
              </p>
            </section>

            <section>
              <h2 className="text-text-primary font-bold text-lg mb-2">4. Por quanto tempo guardamos</h2>
              <p>
                Os dados são mantidos enquanto forem necessários para a finalidade que motivou a coleta, ou até
                você solicitar a exclusão. Cadastros de newsletter sem interação por longos períodos podem ser
                removidos periodicamente.
              </p>
            </section>

            <section>
              <h2 className="text-text-primary font-bold text-lg mb-2">5. Com quem compartilhamos</h2>
              <p>
                Não vendemos nem compartilhamos seus dados com terceiros para fins de marketing de outras
                empresas. Os dados ficam armazenados em provedores de infraestrutura (hospedagem e banco de
                dados) contratados exclusivamente para viabilizar o funcionamento do site.
              </p>
            </section>

            <section>
              <h2 className="text-text-primary font-bold text-lg mb-2">6. Seus direitos</h2>
              <p className="mb-3">Conforme o Art. 18 da LGPD, você pode solicitar a qualquer momento:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Confirmação de que tratamos seus dados</li>
                <li>Acesso aos dados que temos sobre você</li>
                <li>Correção de dados incompletos ou desatualizados</li>
                <li>Exclusão dos seus dados</li>
                <li>Revogação do consentimento, a qualquer momento</li>
              </ul>
              <p className="mt-3">
                Para exercer qualquer um desses direitos, envie um e-mail para{' '}
                <a href="mailto:esther.lps27@gmail.com" className="text-button-primary hover:underline">
                  esther.lps27@gmail.com
                </a>
                . Cadastros de newsletter também podem ser cancelados diretamente pelo link presente no rodapé
                de qualquer e-mail enviado.
              </p>
            </section>

            <section>
              <h2 className="text-text-primary font-bold text-lg mb-2">7. Segurança</h2>
              <p>
                Adotamos medidas técnicas razoáveis para proteger seus dados contra acesso não autorizado,
                incluindo controle de acesso restrito ao banco de dados e transmissão criptografada (HTTPS).
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}
