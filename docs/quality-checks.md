# Verificações de qualidade

Em 7 de setembro de 2026, o [PR de teste #110](https://github.com/ltodarosouza/arc/pull/110) comprovou a detecção de uma falha intencional de teste no [run 34126694008](https://github.com/ltodarosouza/arc/actions/runs/34126694008). O PR foi fechado sem merge e a branch temporária removida. Isso prova a execução dos checks; não comprova bloqueio de merge por proteção de branch.

Cada alteração enviada ao repositório executa automaticamente:

1. verificação de formatação;
2. análise estática das regras centrais;
3. testes das regras de domínio;
4. build de produção;
5. uma jornada de aprendizagem em navegador (abrir questão, responder, ver
   gabarito e conferir progresso).

Os comandos equivalentes para desenvolvimento são:

- `npm run format -- --check`
- `npm run lint:core`
- `npm test`
- `npm run build`
- `npm run test:e2e`

O projeto ainda possui avisos do linter em componentes de base que não fazem
parte do Arc. Por enquanto, a checagem automática está limitada ao domínio de
questões e progresso; ela será ampliada conforme esses componentes forem
revisados. O workflow roda em cada pull request e em cada envio para a `main`.
A API do GitHub confirmou que este repositório privado, no plano atual, não
pode ativar proteção de branch: isso exige GitHub Pro ou tornar o repositório
público. A conta conectada também não possui permissão administrativa. Quando
essas limitações forem resolvidas pelo administrador, exigir os quatro checks:

- `Format, lint, test and build`;
- `Validate database migrations`;
- `Verify authored mathematics`;
- `Verify local account lifecycle`.

As migrations agora são acompanhadas por testes SQL de RLS e de isolamento dos
rascunhos. A matemática dos 84 novos itens é verificada com SymPy 1.14.0, e a
consistência dos artefatos e suas fórmulas com o gerador e KaTeX. A jornada de conta
usa Supabase local descartável, incluindo entrega de e-mail, sem credenciais de
produção. Veja [os resultados e limites da QA](account-qa.md).
