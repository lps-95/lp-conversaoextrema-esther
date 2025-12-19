type KVResult<T> = { ok: boolean; value?: T; error?: string }

function hasKV() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

function kvHeaders() {
  return {
    Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
    'Content-Type': 'application/json',
  }
}

export async function kvGetNumber(key: string): Promise<KVResult<number>> {
  if (!hasKV()) return { ok: false, error: 'kv_disabled' }
  try {
    const url = `${process.env.KV_REST_API_URL}/get/${encodeURIComponent(key)}`
    const resp = await fetch(url, { headers: kvHeaders() })
    if (!resp.ok) return { ok: false, error: 'http_' + resp.status }
    const data = await resp.json()
    // Upstash returns { result: any }
    const raw = data?.result
    const num = typeof raw === 'number' ? raw : parseInt(String(raw ?? '0'), 10)
    return { ok: true, value: Number.isFinite(num) ? num : 0 }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'unknown' }
  }
}

export async function kvIncr(key: string, by = 1): Promise<KVResult<number>> {
  if (!hasKV()) return { ok: false, error: 'kv_disabled' }
  try {
    const url = `${process.env.KV_REST_API_URL}/incrby/${encodeURIComponent(
      key
    )}/${by}`
    const resp = await fetch(url, { method: 'POST', headers: kvHeaders() })
    if (!resp.ok) return { ok: false, error: 'http_' + resp.status }
    const data = await resp.json()
    const num = typeof data?.result === 'number' ? data.result : 0
    return { ok: true, value: num }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'unknown' }
  }
}

export function currentDateKey(tz = 'America/Sao_Paulo') {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .formatToParts(new Date())
    .reduce<Record<string, string>>((acc, p) => {
      if (p.type !== 'literal') acc[p.type] = p.value
      return acc
    }, {})
  return `${parts.year}-${parts.month}-${parts.day}`
}
