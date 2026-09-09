# Arquitetura de Computadores — plano de cobertura para substituição integral

## Objetivo e proveniência

Este plano orienta a substituição integral do banco publicado de Arquitetura
de Computadores por 150 questões autorais. A referência é *Organização
Estruturada de Computadores* (Tanenbaum e Austin, 6ª edição), usada apenas
para mapear competências e abrangência curricular. Nenhum enunciado,
alternativa, sequência de resolução ou exercício do livro será reproduzido ou
parafraseado.

Cada bloco contém 25 questões. Antes de iniciar o bloco seguinte, deve-se
reler `docs/question-generation-protocol.md`, conferir os itens já criados e
eliminar sobreposições de objetivo, comando e sequência de raciocínio.

## Matriz de cobertura

| Bloco | Competência predominante | Dificuldades (f/m/d) | Formatos que devem alternar |
| --- | --- | --- | --- |
| 01 | Níveis de abstração, ISA e organização | 9/8/8 | classificação, cenário de projeto, diagnóstico |
| 02 | Representação sem sinal e complemento de dois | 8/9/8 | conversão, faixa, overflow, depuração |
| 03 | Lógica, circuitos, clock e registradores | 8/8/9 | tabela verdade, projeto, cronograma, diagnóstico |
| 04 | Memória, cache, barramentos e E/S | 8/9/8 | cálculo, traço de acesso, transferência, escolha |
| 05 | CPU, modos de endereçamento, ISA e pipeline | 8/8/9 | rastreamento, endereço efetivo, dependência, CPI |
| 06 | Microarquitetura, memória virtual e paralelismo | 8/9/8 | sequência, tradução, trade-off, estudo de caso |

**Total:** 150 questões; 49 fáceis, 51 médias e 50 difíceis.

## Regras adicionais de diversidade

- Cada item recebe um objetivo de aprendizagem próprio; variar apenas números
  não conta como uma questão nova.
- No máximo cinco questões de um mesmo subtema em cada bloco; comandos e
  raciocínios devem alternar entre os itens vizinhos.
- Para cada questão numérica, incluir ao menos uma verificação independente
  de unidade, faixa, sinal, limite ou estado final.
- Distratores devem corresponder a erros observáveis: confundir endereço e
  dado, ordem de bytes, valor e referência, latência e largura de banda,
  dependência de dados e de controle, ou propriedade arquitetural e detalhe de
  implementação.
- Cada lote só é elegível para commit depois de auditoria matemática e
  editorial, incluindo renderização de todo LaTeX.

## Entrega técnica

As seis revisões de conteúdo serão registradas em commits de 25 questões. A
integração do banco permanecerá em no máximo duas migrations. Para preservar
o histórico de tentativas, a migration final retira as questões antigas da
publicação e publica as 150 substitutas; não exclui tentativas de estudantes.
Ao final, a disciplina exibirá exatamente 150 questões novas para os alunos.
