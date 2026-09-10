# Auditoria editorial — Cálculo I

## Escopo e decisão editorial

Foram auditadas as 150 questões de múltipla escolha dos seis lotes de
substituição e o banco discursivo de 125 itens. O banco publicado pela nova
migration contém 100 questões de múltipla escolha: 25 de funções e
representações, 25 de exponenciais/logaritmos/inversas, 25 de limites e
continuidade e 25 de derivadas elementares.

Os 50 itens dos lotes 05 e 06 foram retirados da publicação. Eles repetiam os
mesmos passos de solução e usavam alternativas vazias como “Nenhuma.”,
“A alternativa oposta.” e “Uma condição irrelevante.”; não foram convertidos
em questões novas por simples troca de números.

## Defeitos corrigidos

- Dependência de ordem: `c1-r01-006` agora contém a função por partes completa.
- Escopo: `Resolva $2^x=16$` foi substituída por uma situação de crescimento
  por duplicação, na qual a potência descreve um modelo.
- LaTeX: a normalização protege comandos que haviam perdido a barra invertida
  ao serem interpretados por JavaScript, inclusive `\lim`, `\frac`, `\sqrt`,
  `\mathbb`, `\setminus`, `\le` e `\ge`.
- Publicação: a migration que removia perguntas arquivadas e suas tentativas
  foi transformada em operação sem remoção. A migration nova somente arquiva
  versões anteriores e publica o banco revisado.

## Cobertura de limites e continuidade

Os 25 itens do lote 03 cobrem substituição direta, fatoração, racionalização,
limites laterais, limites no infinito, assíntotas e critérios de continuidade.
Cada item possui quatro alternativas distintas, uma resposta correta, três
dicas e cinco passos de solução.

## Verificações executadas

- `node scripts/validate-calculus-one-replacement.mjs`: 100 enunciados únicos,
  25 itens de limites, alternativas/gabaritos, estrutura, dependência, LaTeX
  e cobertura validados.
- `node scripts/build-reviewed-calculus-one-migration.mjs`: migration gerada
  com 100 questões, 400 alternativas, 300 dicas e 500 passos.
- Inspeção da migration gerada: nenhuma instrução `DELETE`.
- `npm test`: 6 arquivos e 19 testes aprovados.
- `npm run lint:core`: aprovado.

Nenhuma migration foi aplicada ao Supabase e nenhum push foi realizado.
