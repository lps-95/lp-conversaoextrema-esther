import { useRef } from 'react'

/**
 * Proteção leve contra bots, sem precisar de captcha (que atrapalha
 * conversão de gente de verdade). Duas camadas, combinadas:
 *
 * 1. Honeypot: um campo invisível que só um bot preenche (pessoas não
 *    veem, então nunca preenchem). Se vier preenchido, é bot.
 * 2. Tempo mínimo: guarda o momento em que o formulário apareceu na tela
 *    e compara com o momento do envio. Bots costumam preencher e enviar
 *    em frações de segundo — uma pessoa de verdade não digita um
 *    formulário inteiro em menos de ~2 segundos.
 *
 * Isso não impede um bot sofisticado feito sob medida pra esse formulário
 * específico, mas barra a grande maioria dos bots genéricos que varrem a
 * web preenchendo formulários automaticamente — que é o volume real de
 * spam que a maioria dos sites recebe.
 */
export function useSpamGuard() {
  const mountedAtRef = useRef(Date.now())

  function isLikelySpam(honeypotValue: string, minMillis = 2000): boolean {
    if (honeypotValue) return true
    return Date.now() - mountedAtRef.current < minMillis
  }

  return { isLikelySpam }
}
