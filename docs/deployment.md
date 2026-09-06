# Publicação do Arc na Vercel

## Runtime

O Arc usa Next.js App Router e é implantado diretamente pela Vercel. O comando
de build é `npm run build`; a Vercel detecta o framework e serve páginas
estáticas e rotas dinâmicas sem configurar **Output Directory** manualmente.

O deploy anterior respondia 404 porque o projeto gerava um runtime
Vinext/Cloudflare. Essa saída foi removida: não há mais diretório Cloudflare
para apontar no painel da Vercel.

## Configuração do projeto

No projeto Arc da Vercel, usar:

- **Framework Preset:** Next.js;
- **Build Command:** padrão (`npm run build`);
- **Output Directory:** deixar vazio/padrão;
- **Node.js:** 22 ou mais recente.

Criar estas variáveis em **Preview** e **Production**:

```text
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
NEXT_PUBLIC_SITE_URL=https://seu-dominio.vercel.app
```

Elas são públicas para o navegador. Nunca adicionar senha do banco,
`service_role` ou outra chave secreta.

No Supabase, adicionar a URL da Vercel em **Authentication → URL
Configuration**, tanto em Site URL quanto em Redirect URLs.

## Checklist de publicação

- [ ] A Vercel detecta Next.js e não há Output Directory personalizado.
- [ ] As três variáveis públicas estão configuradas em Preview e Production.
- [ ] URLs de Preview e Production estão nas Redirect URLs do Supabase.
- [ ] Início, Questões, disciplina, Prática, Progresso e Conta abrem sem 404.
- [ ] Cadastro, entrada, saída e persistência de tentativa foram testados.
- [ ] Não há segredo em variável `NEXT_PUBLIC_`.
