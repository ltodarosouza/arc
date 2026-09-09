# Protocolo obrigatório para geração de questões

Este documento é a fonte de verdade para criar, reescrever, revisar ou importar
questões na Arc. Ele deve ser lido **antes** de qualquer lote novo por pessoas
ou agentes. O objetivo é criar um banco autoral, variado, matematicamente
correto e agradável de estudar — não apenas aumentar a quantidade de itens.

Use este protocolo junto do [modelo de questão](../content/question-template.md),
da [rubrica de dificuldade](difficulty-rubric.md), da [política de
proveniência](content-provenance.md) e da taxonomia já cadastrada no projeto.

## 1. Confirmar os insumos

Antes de escrever a primeira questão, registre:

1. A quantidade total do lote e a disciplina.
2. A lista aprovada de assuntos e subassuntos existentes ou que serão criados.
3. O arquivo de referência: PDF de livro, lista, ementa, material aberto ou
   outro documento da disciplina.
4. A base de uso do material: ele serve para mapear competências, dificuldade e
   variedade; não é um texto para copiar.
5. A distribuição desejada entre assuntos, subassuntos e níveis.

Se faltar a taxonomia, a disciplina ou uma fonte de referência legível, pare e
peça essa informação. Não invente uma estrutura curricular extensa nem comece
um lote sem escopo.

## 2. Usar a referência sem copiar

Leia o material por blocos pequenos e anote somente elementos abstratos:

- competência avaliada, pré-requisito e erro comum;
- faixa de dificuldade e quantidade de etapas de raciocínio;
- tipos de representação úteis, como expressão, gráfico, tabela, vetor ou
  situação aplicada;
- variedade de comandos que a disciplina admite.

Não copie, não faça paráfrase próxima e não preserve a sequência distintiva de
dados, texto ou solução de um exercício protegido. Não basta trocar números,
nomes ou uma pequena história. Uma questão Arc deve ser escrita do zero, com
seu próprio comando, dados, estrutura de raciocínio, alternativas e solução.
Consulte a [política de proveniência](content-provenance.md) quando houver
dúvida sobre licença ou reutilização.

## 3. Desenhar a matriz do lote antes de redigir

Monte uma matriz de planejamento. Ela evita concentração em um único assunto
ou formato e deve acompanhar o lote na auditoria final.

| Campo                | O que definir                                                    |
| -------------------- | ---------------------------------------------------------------- |
| Assunto e subassunto | Um objetivo de aprendizagem específico por item.                 |
| Dificuldade          | Fácil, média ou difícil pelo raciocínio necessário.              |
| Habilidade           | Calcular, interpretar, verificar, classificar, modelar etc.      |
| Tipo de comando      | Pergunta direta, diagnóstico, estratégia, gráfico, contexto etc. |
| Erro provável        | Sinal, ordem, unidade, direção, fórmula ou álgebra.              |

Distribua os três níveis de forma equilibrada. Números maiores não tornam uma
questão difícil: a classificação vem da quantidade de ideias conectadas, das
decisões de método e da interpretação exigida. Intercale, sempre que o assunto
permitir, cálculo direto, interpretação geométrica, identificação de
propriedade, reconstrução de dados, análise de erro, comparação de métodos,
aplicação contextual, leitura de gráfico ou equação, classificação e
verificação de resultado.

## 4. Escrever uma questão autoral

Para cada item, use o modelo em `content/question-template.md` e preencha:

- assunto, subassunto, dificuldade e tag primária corretos;
- enunciado autocontido, com todas as condições, intervalos, convenções e
  unidades necessárias;
- quatro alternativas A–D distintas e paralelas;
- uma única resposta correta, verificada independentemente;
- pelo menos três dicas progressivas;
- resposta final, explicação e passos da resolução;
- origem como `original`, autoria, data e demais metadados exigidos.

### Regras para o comando e o enunciado

Cada pergunta deve medir uma habilidade específica e ter um comando próprio.
Não reaproveite o mesmo esqueleto mudando números, personagens ou introduções.
Alterne perguntas diretas, cenários curtos relevantes, diagnóstico de uma
resolução, escolha de estratégia e interpretação de resultado. Antes de
aprovar um enunciado, compare-o com os demais do mesmo subassunto e reescreva
se o comando central ou a sequência de raciocínio já existir no lote.

### Regras para alternativas

Todas devem ser plausíveis para alguém que compreendeu parte do assunto. Crie
distratores a partir de erros reais: sinal trocado, ordem invertida, fórmula
correta no contexto errado, unidade incorreta, interpretação geométrica
equivocada ou falha em uma etapa algébrica. Não use alternativas absurdas,
"todas as anteriores" ou pistas de tamanho, precisão ou linguagem que revelem
a correta.

### Regras para dicas e resolução

As três dicas são progressivas: a primeira identifica a ideia; a segunda aponta
a primeira decisão matemática; a terceira ajuda a conferir um resultado
intermediário. Nenhuma delas pode revelar a alternativa ou a resposta final.

O gabarito comentado deve ensinar uma pessoa que ainda não domina o assunto:

1. Identifique os dados, a pergunta e a estrutura matemática.
2. Explique a definição, propriedade ou fórmula escolhida e por que ela vale.
3. Substitua os dados e mostre a primeira transformação relevante.
4. Desenvolva o cálculo ou raciocínio até o resultado.
5. Verifique sinal, domínio, unidade, ordem de grandeza, condição do problema
   ou interpretação geométrica e conecte à alternativa correta.

Questões realmente curtas podem ter menos de cinco passos, desde que não haja
fragmentação artificial. Questões com método, modelagem ou várias decisões
devem ter pelo menos cinco passos significativos.

### Regras de escrita e LaTeX

- Escreva em português claro e revise ortografia, concordância e pontuação.
- Use um único par de cifrões por expressão: `$x^2 + 1$`.
- Nunca use `$$`, cifrões soltos ou comandos sem barra, como `int` em vez de
  `\int`.
- Prefira expressões curtas e quebre o texto em frases quando a leitura ficar
  longa; depois confira a renderização em tela pequena e desktop.

## 5. Verificar resposta e diversidade

Antes de converter o lote em migration, faça duas passagens independentes.

### Passagem matemática

Para cada questão, resolva sem olhar a alternativa marcada. Em seguida:

1. compare o resultado com a resposta final e a alternativa correta;
2. confira cálculos, sinais, domínio, unidades e hipóteses;
3. confirme que apenas uma alternativa satisfaz o enunciado;
4. verifique que cada distrator representa um erro possível, mas não é outra
   resposta correta;
5. renderize cada trecho LaTeX e corrija qualquer quebra visual.

### Passagem editorial e pedagógica

Para o lote inteiro, confira:

1. nenhum enunciado, comando central ou sequência de solução foi repetido;
2. há equilíbrio por assunto, subassunto e dificuldade;
3. as dicas ajudam sem entregar a resposta;
4. as soluções explicam o método, não só executam uma conta;
5. o tom, a precisão e a notação permanecem consistentes.

## 6. Gerar a migration e auditar a entrega

Somente após as duas passagens, gere a migration. Ela deve ser idempotente
quando o padrão do repositório exigir, usar identificadores sem colisão e incluir
questões, alternativas, dicas, passos e tags na ordem necessária para as chaves
estrangeiras. Lotes grandes devem ser separados em arquivos seguros de executar
no SQL Editor, sem misturar um pacote agregado com suas migrations individuais.

Entregue, junto da migration, uma auditoria com:

- quantidade total de questões;
- contagem por assunto, subassunto e dificuldade;
- lista dos tipos de comando utilizados;
- confirmação de quatro alternativas distintas, uma correta e três dicas em
  cada item;
- confirmação de resposta verificada, passos suficientes, LaTeX válido e
  ausência de enunciados semelhantes;
- origem, autor e situação de revisão de cada item.

## Prompt-base para um novo lote

Substitua os campos entre colchetes e acrescente o caminho do arquivo de
referência. A pessoa ou agente responsável deve seguir todas as etapas acima,
não apenas colar este texto.

```text
Crie um banco de [QUANTIDADE] questões autorais de [DISCIPLINA], distribuídas
de forma equilibrada entre estes assuntos e subassuntos:

[LISTA DE ASSUNTOS E SUBASSUNTOS]

Use [ARQUIVO DE REFERÊNCIA] somente para mapear competências, dificuldade e
variedade de formatos. Não copie, parafraseie de perto nem apenas troque números
de exercícios existentes. Siga integralmente
docs/question-generation-protocol.md e content/question-template.md.

Antes de gerar a migration, monte e entregue uma matriz de cobertura por
assunto, subassunto, dificuldade, habilidade e tipo de comando. Cada questão
deve ser original, múltipla escolha com quatro alternativas distintas e uma
única correta, três dicas progressivas, distrações realistas, resolução
comentada didática e LaTeX válido apenas em `$...$`. Faça a auditoria matemática
e editorial definida no protocolo e entregue as contagens e validações finais.
```

## Critério de bloqueio

Não crie ou publique uma migration de questões se algum item não tiver origem
registrada, taxonomia definida, resposta conferida, alternativas plausíveis,
três dicas, solução pedagógica, LaTeX válido ou aprovação nas auditorias de
diversidade e formatação. Corrija o lote antes de prosseguir.
