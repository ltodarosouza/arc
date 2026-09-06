# Publicação do Arc

## Ambiente atual

O Arc é publicado no ambiente Sites/Cloudflare. O comando `npm run build` usa
Vinext e produz duas partes inseparáveis:

- `dist/client`: arquivos públicos do navegador;
- `dist/server`: servidor RSC/SSR configurado para Cloudflare Workers, incluindo
  `dist/server/wrangler.json`.

As duas partes são necessárias para que as rotas e a sessão funcionem.

## Por que o deploy atual na Vercel responde 404

Conectar este repositório e aceitar a detecção automática da Vercel não cria um
runtime compatível com o servidor produzido pelo Vinext/Cloudflare. Em
particular, `dist/client` não é uma exportação estática completa: não possui
um `index.html` que possa servir a aplicação sozinho. Publicá-lo como diretório
de saída gera um deploy "Ready" que responde 404.

Isso é uma incompatibilidade de runtime, não um erro das rotas do Arc nem do
Supabase.

## Decisão atual

Manter a produção no ambiente Sites/Cloudflare. A Vercel não deve ser usada
como produção ou preview até existir um adaptador próprio e uma validação das
rotas dinâmicas.

## Caminho recomendado para uma futura Vercel

1. Criar uma branch de migração, sem alterar o domínio atual.
2. Escolher deliberadamente um runtime Vercel compatível. A opção mais segura
   é migrar o servidor para uma configuração Next.js suportada pela Vercel;
   não reutilizar a saída de Cloudflare como se fosse estática.
3. Levar somente `VITE_SUPABASE_URL` e
   `VITE_SUPABASE_PUBLISHABLE_KEY` para Preview e Production. São valores
   públicos de cliente; chaves de serviço e senha do banco continuam proibidas.
4. Fazer um deploy de preview e verificar: Início, Questões, página de uma
   disciplina, Prática, Progresso, cadastro, entrada e saída.
5. Confirmar que tentativas, disciplinas selecionadas e sessão do Supabase
   persistem no preview.
6. Só após essa validação, decidir se a produção será duplicada ou migrada.

## Checklist antes de trocar a produção

- [ ] O preview da Vercel abre todas as rotas principais sem 404.
- [ ] As variáveis públicas do Supabase estão configuradas nos dois ambientes.
- [ ] URLs de Preview e Production estão nas Redirect URLs do Supabase.
- [ ] Não há segredo em variáveis prefixadas com `VITE_`.
- [ ] O deploy atual continua acessível para rollback.
- [ ] A troca foi aprovada explicitamente pelo responsável pelo produto.
