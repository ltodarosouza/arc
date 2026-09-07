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
