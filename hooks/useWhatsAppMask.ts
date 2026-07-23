import { useCallback, useState } from 'react'

/**
 * Formata um número de telefone brasileiro conforme o usuário digita:
 * (11) 9999-9999  ou  (11) 99999-9999
 */
export function formatWhatsApp(value: string): string {
  const numbers = value.replace(/\D/g, '')
  if (numbers.length <= 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '')
  }
  return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '')
}

/**
 * Hook que guarda o valor formatado do WhatsApp e expõe um handler pronto
 * pra usar no `onChange` de um `<input>`.
 */
export function useWhatsAppMask(initialValue = '') {
  const [whatsapp, setWhatsapp] = useState(initialValue)

  const handleWhatsAppChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setWhatsapp(formatWhatsApp(e.target.value))
  }, [])

  return { whatsapp, setWhatsapp, handleWhatsAppChange }
}
