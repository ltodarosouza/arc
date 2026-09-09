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

Além delas, criar somente no ambiente de servidor (nunca com prefixo
`NEXT_PUBLIC_`):

```text
SUPABASE_SERVICE_ROLE_KEY=...
```

Ela é exigida pela rota de exclusão de conta. Não a copie para `.env.local`
compartilhado, logs, issue ou qualquer valor exibido ao navegador.

No Supabase, adicionar a URL da Vercel em **Authentication → URL
Configuration**, tanto em Site URL quanto em Redirect URLs.

## Checklist de publicação

- [ ] O SHA em **Source** corresponde a uma execução `Quality` da `main`.
- [ ] `Format, lint, test and build`, `Validate database migrations`,
      `Verify authored mathematics` e `Verify local account lifecycle` passaram
      para esse SHA.
- [ ] Os Deployment Checks mantiveram o build sem domínio de produção até a
      conclusão dos quatro trabalhos; não foi usado `Force Promote`.
- [ ] A Vercel detecta Next.js e não há Output Directory personalizado.
- [ ] As três variáveis públicas estão configuradas em Preview e Production.
- [ ] `SUPABASE_SERVICE_ROLE_KEY` está configurada somente no servidor para
      os ambientes em que exclusão de conta será oferecida.
- [ ] URLs de Preview e Production estão nas Redirect URLs do Supabase.
- [ ] Início, Questões, disciplina, Prática, Progresso e Conta abrem sem 404.
- [ ] Cadastro, entrada, saída e persistência de tentativa foram testados.
- [ ] Não há segredo em variável `NEXT_PUBLIC_`.

## Fluxo de promoção

Um envio à `main` cria o build de produção, mas não deve torná-lo público
imediatamente. O projeto importa os quatro trabalhos do workflow `Quality` como
Deployment Checks da Vercel. A atribuição de `arc` aos domínios de produção fica
pendente até que todos terminem com sucesso para o mesmo SHA.

O GitHub Actions detecta a falha; os Deployment Checks bloqueiam a promoção na
Vercel. A proteção do merge é uma terceira barreira e continua indisponível
enquanto este repositório for privado no plano atual do GitHub. Até ela estar
disponível, não enviar diretamente à `main`: abrir um pull request e esperar os
quatro trabalhos antes do merge.

Depois do merge, conferir a execução `Quality` disparada pelo evento `push`. O
SHA dessa execução deve ser igual ao campo **Source** do deployment. Um resultado
falho ou pendente não autoriza `Force Promote`; corrija o commit ou reverta a
mudança.

## Previews de colaboradores

O plano Hobby não permite colaboração em projetos ligados a repositórios
privados. Por isso, um commit cujo autor não tem acesso ao projeto da Vercel
pode receber `Deployment was blocked` no Preview antes de executar o build.
Esse limite é independente dos quatro trabalhos do workflow `Quality`. Não
reescrever a autoria do commit para obter um Preview; para habilitar previews de
colaboradores, migrar o projeto para um plano com suporte a colaboração.
