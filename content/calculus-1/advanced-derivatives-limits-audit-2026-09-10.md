# Auditoria — reorganização avançada de Cálculo I

## Escopo e decisão editorial

- Lote novo: 20 questões autorais de múltipla escolha, todas classificadas
  como difíceis pela combinação de métodos, pelo número de camadas ou pela
  necessidade de transformar uma indeterminação antes de calcular.
- Retirada do catálogo: 63 questões elementares do banco revisado anterior,
  incluindo todo o bloco de exponenciais e logaritmos isolados, todo o bloco
  de derivadas de uma única regra e itens diretos como simetria de $x^3$,
  coeficiente angular de dois pontos e substituição imediata em limites.
- Preservação de histórico: os 63 itens passam para `archived`; tentativas e
  registros de revisão não são apagados.
- Deduplicação: após inserir o lote, a migration normaliza espaços e caixa dos
  enunciados publicados de Cálculo I e arquiva repetições literais. Questões do
  lote avançado têm prioridade; nenhuma tentativa é apagada.
- Migration: `20260910170000_reorganize_calculus_1_advanced_derivatives_limits.sql`.

## Referência e proveniência

- Referência indicada: George B. Thomas, *Cálculo*, volume 2, 11ª edição,
  consultado no PDF fornecido pelo usuário em 10 de setembro de 2026.
- Limitação registrada: o sumário e o prefácio do volume 2 remetem limites e
  derivadas de uma variável aos capítulos 2–4 do volume 1. Neste lote, o volume
  2 foi usado somente para mapear rigor, a competência de composição indicada
  pela seção 14.4 e a variedade de limites indicada pelos apêndices A.2 e A.3.
- Base de uso: mapeamento abstrato de competências e dificuldade. Nenhum
  enunciado, sequência numérica, alternativa ou solução do livro foi copiado
  ou parafraseado.
- Origem dos itens: `original`; autoria e revisão registradas como Equipe
  editorial Arc, com direitos aprovados em 2026-09-10.

## Matriz de cobertura

- `c1-adl-01` — Regra da cadeia; difícil; calcular; derivada de quatro camadas;
  erro provável: omitir o fator interno ou o denominador logarítmico.
- `c1-adl-02` — Produto e quociente; difícil; calcular; quociente com cadeia de
  três níveis; erro provável: perder fator ou sinal.
- `c1-adl-03` — Derivação logarítmica; difícil; selecionar método e calcular;
  erro provável: inverter sinais dos fatores do denominador.
- `c1-adl-04` — Derivação implícita; difícil; calcular segunda derivada em
  ponto; erro provável: substituir o ponto antes de completar a derivação.
- `c1-adl-05` — Função inversa; difícil; reconstruir fórmula de segunda ordem;
  erro provável: avaliar as derivadas no argumento errado.
- `c1-adl-06` — Regra da cadeia; difícil; calcular composição de seis camadas;
  erro provável: perder coeficientes internos.
- `c1-adl-07` — Derivação logarítmica; difícil; calcular potência variável;
  erro provável: derivar somente a base ou somente o expoente.
- `c1-adl-08` — Regra da cadeia; difícil; simplificar após derivar; erro
  provável: não reconhecer o cancelamento algébrico.
- `c1-adl-09` — Teorema Fundamental; difícil; combinar integral e cadeia; erro
  provável: esquecer a derivada do limite superior.
- `c1-adl-10` — Regra da cadeia; difícil; calcular e verificar domínio; erro
  provável: errar o coeficiente das camadas.
- `c1-adl-11` — L’Hôpital; difícil; tratar duas raízes e cancelamento linear;
  erro provável: parar ainda em $0/0$.
- `c1-adl-12` — Limite no infinito; difícil; racionalizar e extrair termo de
  segunda ordem; erro provável: concluir zero cedo demais.
- `c1-adl-13` — L’Hôpital; difícil; combinar repetição, produto e cadeia; erro
  provável: omitir termo na segunda derivada.
- `c1-adl-14` — L’Hôpital; difícil; controlar três cancelamentos; erro provável:
  trocar sinais nas derivações sucessivas.
- `c1-adl-15` — Limite no infinito; difícil; dupla racionalização; erro
  provável: descartar o termo de quarta ordem.
- `c1-adl-16` — L’Hôpital; difícil; transformar $0^0$; erro provável: aplicar a
  regra diretamente à potência.
- `c1-adl-17` — L’Hôpital; difícil; transformar $1^{\infty}$; erro provável:
  separar indevidamente base e expoente.
- `c1-adl-18` — L’Hôpital; difícil; derivar três vezes; erro provável: derivar
  $\sec^2x$ incorretamente.
- `c1-adl-19` — L’Hôpital; difícil; transformar $\infty\cdot0$; erro provável:
  multiplicar limites separados.
- `c1-adl-20` — Cálculo de limites; difícil; combinar racionalização e análise
  de terceira ordem; erro provável: usar somente equivalência linear.

## Contagens e verificações editoriais

- Por assunto: 10 questões de derivadas e 10 questões de limites.
- Por subassunto: 5 de regra da cadeia — incluindo uma aplicação conjunta do
  Teorema Fundamental —, 4 de derivação implícita/logarítmica, 1 de produto e quociente,
  7 de L’Hôpital, 2 de limites no infinito e 1 de cálculo de limites.
- Por dificuldade: 20 difíceis; o lote complementa, sem reclassificar
  artificialmente, as questões fáceis e médias que permanecem úteis.
- Tipos de comando: cálculo simbólico, seleção de método, simplificação,
  reconstrução de fórmula, verificação de domínio e justificativa de
  indeterminação.
- Estrutura: 80 alternativas distintas, 20 gabaritos únicos, 60 dicas
  progressivas e 100 passos específicos.
- Diversidade: nenhum enunciado se repete; as funções, transformações e erros
  prováveis variam por item.

## Auditoria matemática

- Cada gabarito foi resolvido sem depender da posição da alternativa correta.
- Foram conferidos sinais, fatores internos, domínios, formas indeterminadas e
  condições de aplicação de L’Hôpital.
- Cada distrator representa um erro concreto descrito na matriz, sem criar uma
  segunda resposta válida.
- Todo trecho entre `$...$` foi renderizado com KaTeX em modo estrito; não há
  `$$`, delimitadores soltos nem comandos LaTeX sem barra.
- Cada questão contém três dicas progressivas e cinco passos significativos,
  incluindo verificação final de estrutura, domínio ou forma do limite.
