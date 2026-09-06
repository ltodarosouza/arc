# Privacidade e medição do MVP

## Princípio

Medir apenas o necessário para responder se estudantes encontram e resolvem
questões com frequência. O progresso individual existe para o próprio aluno,
não para rastreamento comportamental.

## Eventos permitidos

| Evento                 | Pergunta de produto                             |
| ---------------------- | ----------------------------------------------- |
| disciplina selecionada | Quais disciplinas merecem prioridade editorial? |
| filtro aplicado        | Quais assuntos os alunos procuram?              |
| questão iniciada       | A navegação leva rapidamente à prática?         |
| questão respondida     | Há uso recorrente do banco?                     |
| dica aberta            | Em quais questões a ajuda é mais necessária?    |
| gabarito aberto        | A explicação é consultada depois da resposta?   |

Os eventos devem usar identificadores técnicos pseudônimos e o identificador
da questão ou assunto. Não devem registrar texto digitado, enunciados
completos, alternativas escolhidas fora do histórico privado, endereço de e-mail
ou dados de instituição como telemetria.

## Dados de estudo

- Disciplinas selecionadas, tentativas e itens para refazer são dados privados
  do estudante e ficam protegidos pelas regras de acesso do banco.
- Percentuais agregados por questão só podem ser exibidos quando houver uma
  amostra suficiente para não expor comportamento individual.
- Não há venda, compartilhamento publicitário ou perfil comercial baseado em
  desempenho acadêmico.

## Consentimento e retenção

- Antes de instalar uma ferramenta de analytics, apresentar uma explicação
  curta de finalidade e uma escolha clara quando for legalmente necessária.
- Manter eventos agregados pelo menor período útil para decisões de produto;
  revisar esse período antes do lançamento público.
- Oferecer uma forma de exportar ou excluir dados da conta quando a conta
  autenticada e a migração de sessão estiverem maduras.

## Decisão de MVP

O MVP não inclui analytics de terceiros. A prioridade é validar qualitativamente
com estudantes próximos ao contexto inicial e usar apenas os registros que já
existem para a prática individual.
