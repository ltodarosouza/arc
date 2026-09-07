O perfil do MVP é privado e usa display_name, sem username público ou unicidade.
Duas pessoas podem escolher o mesmo nome. O e-mail aparece apenas como dado da
própria conta. Não há busca pública, URL de perfil, avatar enviado ou recursos sociais.

O nome contém de 1 a 60 caracteres Unicode. A interface remove espaços externos
e reduz espaços ASCII repetidos. Banco e cliente rejeitam caracteres de controle,
quebras de linha e os sinais < e >. Letras de outros alfabetos e emojis são aceitos.
Não se cria perfil fictício: sem nome salvo, a interface mostra Minha conta.

A tabela profiles referencia auth.users. RLS permite leitura e alteração somente
pelo próprio usuário. Nenhum cliente pode mudar proprietário ou updated_at.
A migration é 20260907090000_private_profiles.sql.

Excluir conta remove imediatamente o usuário de autenticação e, em cascata,
perfil, disciplinas selecionadas, tentativas e itens para refazer. O catálogo
compartilhado não é apagado. Não há restauração pela interface. Backups do
provedor seguem a retenção do ambiente; após qualquer restauração de backup,
as exclusões posteriores devem ser reaplicadas antes de reabrir o serviço.
Não há estatísticas coletivas reais a preservar neste MVP.

O endpoint de exclusão deve verificar a sessão no servidor, confirmar a senha
atual e exigir o texto EXCLUIR MINHA CONTA. Ele nunca aceita um user_id fornecido
pelo cliente. A credencial administrativa fica somente no ambiente do servidor.
Após excluir, RLS não deve permitir acesso nem mesmo com um JWT antigo.

Validação: aplicar em banco separado, criar duas identidades descartáveis,
tentar leitura e alteração cruzadas e verificar cascatas. Testes devem exercitar
RLS com papéis autenticados, não apenas o administrador.

# Implementação e validação local — 7 de setembro de 2026

As issues #103–#107 têm implementação em `/account`: identidade privada, edição de nome, saída explícita, recuperação em `/account/recover`, atualização em `/account/reset` e exclusão autenticada via `POST /api/account/delete`. A exclusão exige senha atual e a frase `EXCLUIR MINHA CONTA`; o servidor determina o usuário pela sessão verificada e recusa identificadores enviados pelo cliente.

O teste `e2e/account-journey.spec.ts` usa duas contas descartáveis em Supabase local, entrega real de e-mail no Mailpit, login após recuperação, RLS entre usuários, teclado no diálogo, viewport móvel e exclusão em cascata. A primeira execução completa passou. Isso não constitui validação do ambiente publicado.

Para reproduzir: instalar Docker e iniciar `npx supabase start`; configurar `.env.local` com as credenciais exclusivamente locais retornadas pelo CLI, incluindo `SUPABASE_SERVICE_ROLE_KEY` e `NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3000`; iniciar `npm run dev -- --hostname 127.0.0.1 --port 3000`; executar Playwright com `ARC_ACCOUNT_QA=1` e `node --env-file=.env.local node_modules/@playwright/test/cli.js test --config playwright.account.config.ts`. O teste recusa Supabase remoto e apaga somente as contas que criou. Não publicar relatórios de falha que possam conter campos dos formulários de teste.

Antes da publicação, aplicar as migrations no Supabase de destino, cadastrar a URL exata `https://<domínio>/account/reset` entre os redirects autorizados e configurar a origem pública e a chave de serviço apenas no ambiente de servidor da Vercel. A chave de serviço nunca deve receber o prefixo `NEXT_PUBLIC_`. Sem ela a exclusão retorna indisponibilidade e preserva a conta. Confirmar entrega de e-mail e executar a revisão de aceitação no ambiente publicado antes de encerrar a #108.
