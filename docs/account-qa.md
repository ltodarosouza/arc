# Verificação de conta — 7 de setembro de 2026

A verificação axe-core das regras WCAG A/AA no perfil móvel passou após corrigir o contraste do texto secundário (`--arc-text-muted`). Isso não substitui a passagem manual com leitor de tela. A varredura do catálogo local também renderizou 1.498 fórmulas em 1.068 campos sem erros de KaTeX.

Ambiente: Next.js local, Chromium, Supabase CLI 2.116.0 com PostgreSQL 17, Auth e Mailpit reais em Docker. Contas descartáveis criadas para os testes e removidas ao final. Nenhuma conta de estudante foi utilizada.

| Verificação                                                               | Resultado local |
| ------------------------------------------------------------------------- | --------------- |
| Cadastro e confirmação pelo e-mail recebido                               | Passou          |
| Nome normalizado, persistência após recarga e cabeçalho atualizado        | Passou          |
| Nome inválido e valor preservado após falha da API                        | Passou          |
| Leitura e alteração de perfil alheio bloqueadas por RLS                   | Passou          |
| Troca entre duas contas sem mostrar o nome anterior                       | Passou          |
| Recuperação com endereço existente e inexistente: resposta neutra         | Passou          |
| Link recebido, senha redefinida e novo login                              | Passou          |
| Link já utilizado ou rota sem recuperação: solicitação de novo link       | Passou          |
| Alteração pelo Perfil exige senha atual e permite novo login              | Passou          |
| Falha de logout encerra acesso local e explica revogação não confirmada   | Passou          |
| Exclusão exige senha e frase; origem externa e ID fornecido são recusados | Passou          |
| Exclusão remove perfil, disciplinas, tentativas e itens para refazer      | Passou          |
| Segunda conta permanece; JWT antigo não recupera perfil excluído          | Passou          |
| Diálogo abre por teclado, Escape cancela e foco retorna ao botão          | Passou          |
| Perfil em viewport de 390 × 844 sem overflow horizontal                   | Passou          |

Os testes estão em `e2e/account-journey.spec.ts`. O workflow também executa essa jornada com serviços locais descartáveis. Capturas de tela, vídeo e traces ficam desativados nessa suíte; não publicar arquivos de contexto de falha, que podem conter valores dos formulários. O endpoint registra somente um evento fixo de indisponibilidade e o status HTTP, sem corpo, senha, token ou identidade.

Achados corrigidos: gravação de nome com permissões restritas por coluna; validação de origem considerando a URL pública; logout cujo SDK apaga a sessão local mesmo quando a revogação remota falha; rota de recuperação diferenciada de uma sessão comum; preservação das linhas de matrizes no renderizador matemático.

A #106 recomendava não limpar dados antes da confirmação do Supabase. A versão instalada do SDK remove sua própria sessão local mesmo em erro HTTP de logout. O Arc acompanha esse comportamento, limpa a interface privada e mostra uma explicação recuperável; não simula uma sessão ainda autenticada nem afirma que a revogação remota foi confirmada.

Pendências de aceitação da #108: repetir em Preview com URLs de redirecionamento e e-mail do ambiente configurados; passagem manual com leitor de tela e revisão visual de contraste. O deploy recente da Vercel está bloqueado, e a sessão disponível no navegador abre a tela de login da Vercel. Os resultados locais não substituem essas verificações.
