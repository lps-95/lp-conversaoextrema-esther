-- Rode isso no painel do Supabase: Project > SQL Editor > New query > colar > Run
--
-- Cria a tabela de leads de newsletter/materiais, separada de qualquer
-- outra finalidade de dados (LGPD: dados de finalidades diferentes não
-- deveriam morar juntos sem necessidade).

create table if not exists newsletter_leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  -- Guardamos O MOMENTO do consentimento — é a prova de que a pessoa
  -- aceitou, exigida pela LGPD (Art. 8º, §2º: o controlador deve poder
  -- comprovar que obteve o consentimento).
  consent_given_at timestamptz not null,
  source text default 'landing_page_conversao_extrema',
  -- Token único usado no link de cancelamento do e-mail — permite que a
  -- própria pessoa se descadastre sem precisar de senha/login, mas sem dar
  -- pra qualquer um apagar o cadastro de outra pessoa adivinhando o link.
  unsubscribe_token uuid not null default gen_random_uuid(),
  created_at timestamptz not null default now()
);

-- Se a tabela já existia antes desta coluna existir, rode esta linha
-- separadamente pra adicionar a coluna sem perder os dados já cadastrados:
-- alter table newsletter_leads add column if not exists unsubscribe_token uuid not null default gen_random_uuid();

-- Evita cadastrar o mesmo e-mail duas vezes.
--
-- IMPORTANTE: precisa ser um índice único na coluna `email` diretamente
-- (não em lower(email)) porque o `upsert(..., { onConflict: 'email' })`
-- usado no código só reconhece uma constraint que bate exatamente com o
-- nome da coluna passada. O app já salva o e-mail em minúsculo antes de
-- inserir, então isso continua funcionando como "case-insensitive" na
-- prática.
create unique index if not exists newsletter_leads_email_key on newsletter_leads (email);

-- Row Level Security: por padrão, ninguém consegue ler/escrever nessa
-- tabela a não ser através da service role key (usada só no backend, em
-- pages/api/*). Isso impede que a chave pública do site (se algum dia
-- você usar o client-side do Supabase em outro lugar) tenha acesso a
-- esses dados.
alter table newsletter_leads enable row level security;

-- Nenhuma policy é criada de propósito — sem policy + RLS ligado = só a
-- service role (que ignora RLS) consegue acessar. É o comportamento mais
-- seguro por padrão.
