# Arc — arquitetura atual

## Decisão

Arc é uma aplicação multi-disciplina em Next.js App Router. O catálogo é
compartilhado; cada estudante entra com e-mail e senha no Supabase Auth e tem
suas disciplinas, tentativas, itens para refazer e nome de perfil persistidos
no Supabase. A aplicação não oferece acesso anônimo ao produto.

## Limites da aplicação

### Catálogo compartilhado

As tabelas `subjects`, `taxonomy_nodes`, `questions`, `question_options`,
`question_solutions`, `question_solution_steps` e `question_hints` guardam o
conteúdo. Uma questão pode servir a várias disciplinas e nunca contém dados de
um estudante. Apenas questões com `publication_status='published'` aparecem
para estudantes.

### Dados privados do estudante

O Supabase aplica Row Level Security às tabelas privadas: `profiles`,
`user_subjects`, `question_attempts` e `redo_questions`. Uma tentativa é
registrada por uma função do banco que avalia a alternativa no servidor; a
interface não recebe a chave correta antes da resposta.

`profiles.display_name` é o nome privado mostrado na interface. O e-mail é
usado para autenticação e não é apresentado como identidade principal.

### Interface e estado transitório

Filtros, alternativa marcada e painéis abertos vivem somente na interface. O
repositório local existe como fallback de desenvolvimento quando as variáveis
do Supabase não estão configuradas; não é uma opção para produção.

## Rotas principais

- `/`: início e resumo de estudo;
- `/questions`: lista, filtros e entrada para prática;
- `/practice`: resolução, dicas e solução comentada;
- `/progress`: desempenho e revisão;
- `/subjects`: disciplinas selecionadas;
- `/account`: nome, senha, sessão e exclusão da conta;
- `/account/sign-in`, `/account/reset` e `/account/recover`: autenticação e
  recuperação.

O topo persistente permite navegar entre essas áreas em páginas longas, sem
substituir os controles de teclado e foco semântico de cada página.

## Segurança e operação

- Somente `NEXT_PUBLIC_SUPABASE_URL` e
  `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` vão ao navegador.
- `SUPABASE_SERVICE_ROLE_KEY` só existe no ambiente servidor da Vercel e é
  usado exclusivamente pela rota de exclusão de conta após reautenticação.
- O banco, as migrations e as políticas RLS são a fonte de verdade; nenhuma
  tela deve assumir sucesso de uma gravação sem confirmar a resposta.
- Cada alteração de schema ou conteúdo é uma nova migration versionada. Uma
  migration aplicada não é editada.

## Qualidade de conteúdo

Toda questão publicada precisa ser de múltipla escolha, ter duas dicas
progressivas e uma solução comentada com pelo menos cinco etapas significativas
e fórmulas compatíveis com KaTeX. O fluxo detalhado está em
[question-authoring.md](question-authoring.md).
