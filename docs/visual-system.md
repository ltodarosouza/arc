# Arc: sistema visual

Implementação da issue #132. A identidade bege/azul permanece; o foco é prática, não um painel cheio de indicadores.

## Base compartilhada

- Fonte DM Sans variável, servida pelo próprio Next. KaTeX e a fonte monoespaçada permanecem independentes.
- Cores, superfícies, bordas, foco e estados semânticos em `app/globals.css`. Os componentes de formulário/dialog também recebem esses tokens.
- `arc-page` define largura e respiro; `arc-page--reading` limita a linha de leitura. As utilidades locais podem sobrescrever a base.
- `arc-title`, `arc-section-title`, `arc-caption`, `arc-metric` separam níveis por peso, ritmo e contraste.
- Cartões: raio 16px, sombra quase imperceptível. Controles: 8–10px. Pílulas ficam restritas a estados, tags e avatar.
- `ArcCard` é uma superfície de agrupamento, não um contêiner para cada parágrafo. Etapas da solução, assuntos e histórico usam divisores.
- `ArcButton` e `arc-action`: uma ação primária azul por contexto. Ações secundárias são links discretos. Alvos de formulário têm no mínimo 44px.

## Navegação e movimento

- Cabeçalho sticky com fundo translúcido e blur progressivo; fallback opaco em navegadores sem suporte.
- Navegação desktop a partir de 768px. No celular, menu inferior com safe-area e reserva de espaço até 767px.
- `aria-current` identifica a seção ativa; link de salto para conteúdo; foco visível e scroll-padding para não esconder âncoras.
- Reveal apenas abaixo da dobra e uma vez. Conteúdo continua visível sem IntersectionObserver e com movimento reduzido.
- Não usar animações decorativas contínuas nem esconder conteúdo acima da dobra.

## Organização das telas

- Início: uma chamada para prática, resumo discreto e disciplinas selecionadas.
- Questões: contexto, ação de prática, atalhos de status, filtros avançados recolhíveis e chips ativos sempre visíveis.
- Disciplina: lista de assuntos sem cartão individual por linha.
- Prática: enunciado e alternativas primeiro; feedback, gabarito e etapas após resposta. Navegação existente preservada.
- Progresso: métricas únicas, evolução temporal leve, barras por disciplina, assuntos sob expansão e tentativas recentes em lista.
- Perfil: identidade em superfície própria; sessão, segurança e exclusão separadas por espaçamento e divisores. Handlers e políticas de conta não foram substituídos.

## Significado dos dados

- Resumo usa a tentativa mais recente de cada questão. Repetir uma questão não aumenta o total de questões feitas.
- Gráfico usa snapshots acumulados ao fim dos últimos 14 dias **com atividade**, em horário de Brasília. Não significa janela fixa de 14 dias.
- O eixo horizontal respeita distância real entre datas; não são inventados dias ou respostas. Um único registro aparece como ponto, sem tendência fabricada.
- Barras mostram acertos sobre questões distintas respondidas. Contagens acompanham o gráfico; amostras pequenas não recebem rótulos de domínio.
- Revisão sempre abre uma disciplina explícita, inclusive marcações anteriores à primeira tentativa.

## Verificação

- `npm test`: regras de contagem e snapshots, incluindo repetição entre dias e limite de fuso.
- `npm run test:e2e`: jornada de resposta/gabarito e verificação das telas em 320, 390, 768 e 1440px, ausência de overflow horizontal, navegação após scroll, menu sem cobrir o fim do conteúdo, filtros e reduced-motion.
- Axe WCAG A/AA automatizado nessas telas. Isso complementa, não substitui, revisão manual com tecnologias assistivas.
- Testes de conta real usam apenas Supabase descartável na pipeline separada. Não criar dados de teste em contas de produção.
- Cursos, períodos e listas ainda não existentes não foram simulados. Conteúdo, migrações e publicação de questões estão fora desta refatoração.
