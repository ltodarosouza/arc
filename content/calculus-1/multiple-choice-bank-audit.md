# Auditoria — banco de múltipla escolha de Cálculo I

## Escopo de múltipla escolha

- 100 questões de múltipla escolha em quatro lotes de 25 itens.
- 100 enunciados distintos, 400 alternativas, 100 gabaritos e 100 soluções.
- Cada questão tem quatro alternativas distintas, exatamente uma alternativa
  correta, três dicas e cinco passos de resolução.
- Distribuição de dificuldade: 33 fáceis, 35 médias e 32 difíceis.
- Distribuição da alternativa correta: A 24, B 28, C 24 e D 24.

## Cobertura

O banco contempla funções e modelos, exponenciais/logaritmos/inversas,
limites/continuidade e taxa de variação/derivadas. Nos limites, estão presentes
substituição direta, fatoração, racionalização, limites laterais, limites no
infinito, assíntotas e continuidade.

## Validações de gabarito e estrutura

- A validação programática confirmou as 100 questões, a unicidade dos
  enunciados, quatro alternativas por item, um gabarito compatível com as
  alternativas e cinco passos por solução.
- Foram verificados delimitadores LaTeX, ausência de dependência de outra
  questão, ausência de distratores-modelo e ausência de soluções-modelo
  proibidas pelo validador do projeto.

## Pendência editorial encontrada

Os gabaritos estão estruturalmente íntegros: cada resposta marcada corresponde
a uma das quatro alternativas e o validador não encontrou colisão de enunciado
ou LaTeX inválido. A auditoria, porém, encontrou padronização excessiva nos
passos de resolução:

- os mesmos cinco títulos aparecem nos 100 itens;
- há nove conteúdos de passo literalmente repetidos em blocos de 25 questões;
- 50 das 100 questões contêm um dos textos-modelo de domínio ou derivada.

Isso não invalida o gabarito, mas impede que a resolução ensine o raciocínio
específico de cada item. A correção deve reescrever somente os passos, sem
alterar enunciados, alternativas ou respostas marcadas.
