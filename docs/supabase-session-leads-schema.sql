-- Rode isso no painel do Supabase: Project > SQL Editor > New query > colar > Run
--
-- Tabela dos leads do formulário de AGENDAMENTO DE SESSÃO — separada da
-- `newsletter_leads` de propósito (finalidades diferentes: aqui é
-- interesse comercial num serviço; lá é consentimento de marketing).

create table if not exists session_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  plan text,
  best_time text,
  niche text,
  followers text,
  revenue text,
  main_goal text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  origin text default 'landing_page_conversao_extrema',
  created_at timestamptz not null default now()
);

-- Sem índice único de e-mail aqui de propósito: diferente da newsletter,
-- a mesma pessoa pode legitimamente preencher esse formulário mais de uma
-- vez (por exemplo, voltando semanas depois com outro interesse).

alter table session_leads enable row level security;
-- Sem policy + RLS ligado = só a service role (usada em pages/api/*)
-- consegue acessar. Mesmo padrão da newsletter_leads.
