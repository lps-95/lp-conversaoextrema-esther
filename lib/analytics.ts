/**
 * Wrapper simples em torno do Plausible Analytics (script carregado via
 * `window.plausible`). Isolado aqui pra não misturar tracking com lógica
 * de UI/formulário, e pra poder trocar de ferramenta de analytics no
 * futuro mexendo em um único arquivo.
 */
export function track(eventName: string, props?: Record<string, unknown>) {
  try {
    if (typeof window !== 'undefined' && (window as any).plausible) {
      ; (window as any).plausible(eventName, { props: props ?? {} })
    }
  } catch {
    // Falha de tracking nunca deve quebrar a experiência do usuário
  }
}
