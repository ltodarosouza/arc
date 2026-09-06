# Migração de sessão anônima para conta

## Objetivo

Uma pessoa pode praticar sem criar conta. Quando decidir entrar ou se
registrar, suas disciplinas, tentativas e itens para refazer devem acompanhar
a conta sem duplicar ou substituir informações de outro usuário.

## Estado atual

- Cada navegador recebe uma identidade anônima do Supabase.
- As tabelas de progresso usam esse identificador como dono dos registros.
- A página de conta aceita entrar ou criar uma conta, mas ainda não transfere
  automaticamente registros de uma identidade anônima para outra conta.

## Fluxo proposto

1. Antes de autenticar, guardar o identificador da sessão anônima atual em
   memória, nunca em URL ou conteúdo visível.
2. Após entrar ou concluir o cadastro, mostrar uma confirmação curta:
   “Encontramos seu progresso neste dispositivo. Deseja adicioná-lo à conta?”
3. Se confirmado, chamar uma operação de servidor com o usuário autenticado e
   o identificador anônimo de origem.
4. A operação transfere os registros em uma única transação e invalida a
   possibilidade de repetir a migração daquela sessão de origem.
5. A interface atualiza o progresso a partir da conta recém-autenticada.

## Regras de mesclagem

| Dado | Regra |
| --- | --- |
| Disciplinas | União sem duplicatas. |
| Tentativas | Preservar todas, com datas originais. Os painéis usam a tentativa mais recente por questão. |
| Refazer | Manter marcado se a questão estiver marcada em qualquer origem; uma resposta correta posterior remove a marca. |
| Conflitos | A conta nunca perde histórico. A sessão anônima é apenas adicionada à conta escolhida. |

## Segurança

- A operação só aceita como origem a sessão anônima associada ao dispositivo
  que iniciou a migração.
- Não haverá leitura pública nem escolha manual de identificadores de usuário.
- A operação deve validar a origem, executar com permissões restritas e apagar
  o vínculo temporário após sucesso.

## Decisão de MVP

Não implementar a transferência agora. A sessão anônima permite validar o uso
do produto sem atrito; a migração entra quando houver necessidade real de uso
em mais de um dispositivo ou quando a criação de conta se tornar recorrente.
