# Lotes de Cálculo II para revisão independente

Os sete arquivos `batch-62.mjs` a `batch-68.mjs` contêm 84 questões originais produzidas com assistência de Codex em 7 de setembro de 2026, por solicitação do responsável pelo projeto. Nenhuma questão foi transcrita de um banco externo. Não foi atribuída aprovação a uma pessoa ou equipe que não realizou a revisão.

| Issue | Tema                              | Quantidade |
| ----- | --------------------------------- | ---------: |
| #62   | Técnicas de integração            |         20 |
| #63   | Integrais impróprias              |         12 |
| #64   | Sequências                        |         10 |
| #65   | Séries geométricas e convergência |         12 |
| #66   | Testes de convergência            |         12 |
| #67   | Séries alternadas                 |          5 |
| #68   | Potências, Taylor e Maclaurin     |         13 |

Cada questão tem quatro alternativas, dificuldade proposta, assunto, resposta, duas dicas progressivas e uma resolução comentada com estratégia, desenvolvimento e checagem. Os gabaritos são distribuídos entre A, B, C e D. As migrations inserem apenas rascunhos e fontes com `rights_status=review_required`; não publicam os lotes.

Execute `node scripts/build-content-batches.mjs` para regenerar o relatório editorial e os dados de verificação. Use `--check` para detectar divergência entre fontes e arquivos gerados. O gerador confere contagens, duplicatas textuais, alternativas distintas, duas dicas progressivas, resolução didática, delimitadores matemáticos e a renderização de cada expressão com KaTeX estrito.

As migrations iniciais são registros históricos e não devem ser reescritas. Quando uma questão já migrada precisa ser corrigida, execute `node scripts/build-content-corrections.mjs`: ele gera a migration incremental `20260908120000_improve_calc2_draft_editorial_quality.sql`. Essa migration atualiza os 84 rascunhos sem criar duplicatas, sem publicar conteúdo e sem mudar os gabaritos.

Execute `python scripts/verify-content.py` com SymPy 1.14.0 para conferir as 84 verificações. As primitivas são diferenciadas simbolicamente, incluindo distratores; limites, somas e testes são recalculados; intervalos de potências incluem análise dos extremos. A monotonicidade das sequências inclui amostragem numérica, portanto sua prova escrita também precisa de conferência. Nem as verificações simbólicas nem a amostragem substituem revisão técnica/pedagógica independente, análise completa dos distratores e aprovação de direitos.

Antes de publicar: registrar o nome real do revisor, data e resultado por questão; corrigir o arquivo fonte e regenerar os artefatos quando necessário; registrar aprovação de direitos pelo responsável; aplicar uma nova migration de publicação somente dos IDs aprovados; validar filtros, respostas e soluções no Arc publicado. As issues #62–#68 e a épica #14 permanecem pendentes dessas etapas de aceitação.
