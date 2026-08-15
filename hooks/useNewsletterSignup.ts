import { useState } from 'react'
import { newsletterContent } from '../content/newsletter'
import { useLanguage } from '../contexts/LanguageContext'
import { useSpamGuard } from './useSpamGuard'

/**
 * Hook do formulário de captação para newsletter/materiais.
 *
 * Separado de `useLeadForm` (o formulário de agendamento) de propósito —
 * são finalidades diferentes pra fins de LGPD, então a lógica também fica
 * separada: mais fácil de auditar "o que este formulário faz com os
 * dados" quando não está misturado com outro fluxo.
 */
export function useNewsletterSignup() {
  const { language } = useLanguage()
  const content = newsletterContent[language]
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  // Campo "armadilha" invisível pra humanos, mas que bots costumam
  // preencher automaticamente. Se vier preenchido, tratamos como spam.
  const [honeypot, setHoneypot] = useState('')
  const { isLikelySpam } = useSpamGuard()

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMessage('')

    if (isLikelySpam(honeypot)) {
      // Finge sucesso — nunca avisa o bot que foi identificado, senão ele
      // só aprende a se adaptar e tentar de novo de outro jeito.
      setStatus('success')
      return
    }

    if (!email.trim()) {
      setStatus('error')
      setErrorMessage('Por favor, preencha seu e-mail')
      return
    }

    if (!consent) {
      setStatus('error')
      setErrorMessage(content.missingConsentError)
      return
    }

    setStatus('loading')

    try {
      // Manda o idioma junto — é o que permite o e-mail de confirmação
      // sair no mesmo idioma que a pessoa estava usando no site.
      const response = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name || undefined, email, consent, language }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || content.errorMessage)
      }

      setStatus('success')
      setName('')
      setEmail('')
      setConsent(false)
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : content.errorMessage)
    }
  }

  return {
    fields: { name, email, consent, honeypot },
    setters: { setName, setEmail, setConsent, setHoneypot },
    status,
    errorMessage,
    handleSubmit,
  }
}
