import { createClient } from '@supabase/supabase-js'

/**
 * Cliente do Supabase com a "service role key" — tem acesso total ao
 * banco, ignorando Row Level Security. Por isso:
 *
 * ⚠️ NUNCA importe este arquivo em um componente React (`components/`)
 * nem em nada que rode no navegador. Ele só pode ser usado dentro de
 * `pages/api/*` (código que roda no servidor). Se essa chave vazar pro
 * navegador, qualquer pessoa consegue ler/apagar todos os leads.
 *
 * As variáveis de ambiente:
 * - SUPABASE_URL: URL do projeto (painel do Supabase → Project Settings → API)
 * - SUPABASE_SERVICE_ROLE_KEY: a chave "service_role" (não é a "anon"!)
 */
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error(
      'Supabase não configurado: defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.local'
    )
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  })
}
