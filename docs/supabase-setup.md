# Arc — configuração do Supabase

Arc usa Supabase Postgres para o catálogo e os dados privados de estudo, e
Supabase Auth com e-mail e senha para as contas.

## 1. Configure autenticação

Em **Authentication → URL Configuration**, defina a URL do ambiente (local,
Preview ou Production) como Site URL e Redirect URL. Inclua também as URLs de
Preview usadas para testar recuperação de senha.

Em **Authentication → Providers**, mantenha Email habilitado. A confirmação de
e-mail é recomendada antes de convidar estudantes reais. Para produção,
configure SMTP próprio; o remetente padrão é apropriado apenas para testes.

## 2. Aplique as migrations em ordem

No **SQL Editor**, execute os arquivos de `supabase/migrations/` em ordem
cronológica, exatamente como estão no Git. Não execute apenas a primeira
migration e não edite um arquivo já aplicado. O catálogo atual também possui
migrations de conteúdo; elas são necessárias para a experiência visual de
prática, embora não alterem tentativas de estudantes.

Antes de Production, aplique o mesmo conjunto em um projeto descartável e
execute os testes SQL em `supabase/tests/` quando houver ambiente local de
Postgres disponível.

## 3. Configure a aplicação

Em desenvolvimento, copie `.env.example` para `.env.local` e preencha:

```text
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Para exclusão de conta, configure também `SUPABASE_SERVICE_ROLE_KEY` somente
no ambiente servidor. Ela nunca pode ter o prefixo `NEXT_PUBLIC_`, aparecer no
Git ou ser informada no navegador.

## 4. Verificação mínima

1. Crie uma conta de teste e entre novamente.
2. Salve um nome de perfil e confira em outro navegador.
3. Selecione uma disciplina e responda uma questão.
4. Recarregue e confirme que disciplina, tentativa e progresso persistem.
5. Teste o e-mail de recuperação usando uma URL permitida.

Use contas descartáveis para testar exclusão. A exclusão remove dados privados
daquela conta; não use uma conta real de estudante na validação.
