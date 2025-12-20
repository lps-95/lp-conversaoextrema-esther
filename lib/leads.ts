// Exemplo de função para enviar lead
export async function enviarLead(dados: {
  nome: string
  email: string
  telefone: string
  plano?: string
  melhorHorario?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  const endpoint = `${apiUrl}/api/leads`

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: dados.nome,
        email: dados.email,
        phone: dados.telefone.replace(/\D/g, ''),
        plan: dados.plano || null,
        bestTime: dados.melhorHorario || null,
        utmSource: dados.utmSource || null,
        utmMedium: dados.utmMedium || null,
        utmCampaign: dados.utmCampaign || null,
        origin: 'landing-page',
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Erro ao enviar lead')
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Erro ao enviar lead:', error)
    throw error
  }
}
