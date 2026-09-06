# Verificações de qualidade

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
público. Quando essa limitação deixar de existir, configurar os dois jobs
`Quality` como obrigatórios antes de mesclar.
