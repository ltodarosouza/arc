# Verificações de qualidade

Em 7 de setembro de 2026, o [PR de teste #110](https://github.com/ltodarosouza/arc/pull/110) comprovou a detecção de uma falha intencional de teste no [run 34126694008](https://github.com/ltodarosouza/arc/actions/runs/34126694008). O PR foi fechado sem merge e a branch temporária removida. Isso prova a execução dos checks; não comprova bloqueio de merge por proteção de branch.

Cada alteração enviada ao repositório executa automaticamente quatro trabalhos:

1. `Format, lint, test and build`: formatação, análise estática, testes de
   domínio, build e jornada de aprendizagem no navegador;
2. `Validate database migrations`: aplicação das migrations em ordem e testes
   SQL de acesso e integridade;
3. `Verify authored mathematics`: geração do conteúdo, renderização das
   fórmulas e verificação matemática;
4. `Verify local account lifecycle`: cadastro, autenticação, recuperação e
   exclusão em um Supabase descartável.

Os comandos equivalentes para desenvolvimento são:

- `npm run format -- --check`
- `npm run lint:core`
- `npm test`
- `npm run build`
- `npm run test:e2e`

O lint obrigatório cobre todo o diretório `lib`: regras de domínio, acesso a
dados, repositórios local e Supabase, paginação e cliente de infraestrutura.
As páginas React e os componentes de interface ainda não fazem parte desse
comando. Eles contêm regras incompatíveis com alguns componentes gerados e
efeitos existentes; devem entrar de forma incremental depois da correção dessas
ocorrências. O conteúdo autoral `.mjs` é coberto pelos geradores e pelo trabalho
`Verify authored mathematics`, porque sequências LaTeX válidas geram falsos
positivos na regra genérica de escapes do JavaScript.

O workflow roda em cada pull request e em cada envio para a `main`. A API do
GitHub confirmou que este repositório privado, no plano atual, não pode ativar
proteção de branch: isso exige GitHub Pro ou tornar o repositório público. A
conta conectada também não possui permissão administrativa. Quando essas
limitações forem resolvidas pelo administrador, exigir os quatro checks:

- `Format, lint, test and build`;
- `Validate database migrations`;
- `Verify authored mathematics`;
- `Verify local account lifecycle`.

As migrations são acompanhadas por testes SQL de RLS e isolamento de conteúdo
não publicado. A matemática autoral é verificada com SymPy 1.14.0, e a
consistência dos artefatos e suas fórmulas com os geradores e KaTeX. A jornada de
conta usa Supabase local descartável, incluindo entrega de e-mail, sem
credenciais de produção. Veja [os resultados e limites da QA](account-qa.md).

## Merge e publicação

Detecção, bloqueio de merge e promoção para produção são controles distintos:

- o workflow `Quality` detecta falhas no pull request e no SHA enviado à
  `main`;
- a proteção de branch bloquearia o merge, mas está indisponível no plano atual
  do repositório privado;
- os Deployment Checks da Vercel impedem que um build da `main` receba o domínio
  de produção enquanto qualquer um dos quatro trabalhos acima estiver pendente
  ou falho.

Enquanto a proteção de branch estiver indisponível, toda mudança deve entrar por
pull request e só pode ser integrada depois que os quatro trabalhos passarem. O
controle da Vercel também cobre um envio direto acidental à `main`: o build pode
ser criado, mas não é promovido. `Force Promote` não deve ser usado para contornar
um check pendente ou falho.

Para auditar uma publicação, compare o SHA exibido em **Source** no deployment
da Vercel com o `headSha` da execução `Quality` na `main`. Os quatro trabalhos
devem estar concluídos com `success` antes de o deployment aparecer como
**Current**.

## Limite dos previews no plano Hobby

Em repositórios privados, a Vercel Hobby bloqueia o Preview quando o autor do
commit não possui acesso ao projeto da Vercel. O status aparece como
`Deployment was blocked` antes do build e não representa falha no código ou nos
quatro trabalhos do workflow `Quality`. Habilitar colaboração nesse cenário
exige o plano Pro; a alternativa sem mudança de plano é o proprietário do
projeto criar o commit. Não alterar autoria de commits para contornar esse
controle.
