import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import katex from 'katex';
import { getDiverseCalculusTwoBank } from '../content/calculus-2/diverse-bank-v3.mjs';

const root = resolve(import.meta.dirname, '..');
const outputPath = resolve(
  root,
  'supabase/migrations/20260909212000_refine_calculus_2_questions.sql',
);
const sql = (value) => `'${String(value).replaceAll("'", "''")}'`;
const id = (prefix, value) =>
  `${prefix}0000000-0000-4000-8000-${String(value).padStart(12, '0')}`;
const ensure = (condition, message) => {
  if (!condition) throw new Error(message);
};
const contexts =
  /^(Em uma ficha de revisão individual|Ao conferir uma resolução curta|Em uma questão de diagnóstico|Durante a escolha de uma estratégia|Ao revisar um cálculo no quadro|Em uma comparação de métodos|No fechamento de uma etapa de estudo|Ao validar uma conclusão escrita|Em uma leitura atenta da notação|Ao testar uma alternativa de prova|Em uma discussão sobre o método adequado|Ao localizar um erro frequente|Em uma checagem de consistência|Ao resumir o raciocínio de uma colega|No momento de verificar as hipóteses|Em uma atividade de consolidação), /;
const endings =
  / (Calcule a expressão e escolha a alternativa correta\.|Uma estudante propôs um resultado\. Qual conclusão corrige adequadamente o raciocínio\?|Antes de efetuar a conta, identifique o resultado compatível com a definição\.|Escolha a alternativa que permanece válida após uma verificação independente\.|Em uma revisão, qual resultado respeita todos os sinais e condições do problema\?|Qual opção descreve corretamente a estratégia e a conclusão\?|Analise a estrutura apresentada e complete a decisão matemática\.|Selecione a única afirmação que passa pela checagem final\.)$/;
const topicHints = {
  'antiderivadas-e-integrais-indefinidas': [
    'Diferencie mentalmente cada alternativa; a derivada deve recuperar o integrando.',
    'Em uma potência, aumente o expoente e divida pelo novo expoente.',
  ],
  'integral-definida': [
    'Encontre uma primitiva antes de substituir os limites.',
    'Avalie primeiro no limite superior e depois subtraia o valor no inferior.',
  ],
  substituicao: [
    'Procure uma expressão interna cuja derivada também aparece no integrando.',
    'Defina a substituição e reescreva todos os fatores em função da nova variável.',
  ],
  'integracao-por-partes': [
    'Escolha $u$ de modo que sua derivada simplifique o produto.',
    'Use $\int u\,dv=uv-\int v\,du$ e preserve o sinal de subtração.',
  ],
  'fracoes-parciais': [
    'Fatore o denominador antes de escolher a decomposição.',
    'Depois de achar os coeficientes, integre cada parcela separadamente.',
  ],
  'integrais-trigonometricas': [
    'Reserve um fator cuja derivada apareça após a substituição.',
    'Use identidades trigonométricas somente quando elas deixam uma variável natural.',
  ],
  'intervalos-infinitos': [
    'Troque o infinito por um limite antes de integrar.',
    'Para $1/x^p$, a convergência depende de comparar $p$ com $1$.',
  ],
  descontinuidades: [
    'Localize primeiro o ponto em que o integrando não está definido.',
    'Transforme a integral em limite e compare o expoente da singularidade com $1$.',
  ],
  'limite-de-sequencia': [
    'Divida numerador e denominador pela maior potência de $n$.',
    'Termos com potência menor de $n$ desaparecem no limite.',
  ],
  'monotonicidade-e-convergencia': [
    'Separe a parte constante da parcela que depende de $n$.',
    'Verifique simultaneamente monotonicidade e um limitante para justificar convergência.',
  ],
  'series-geometricas': [
    'Identifique o primeiro termo e a razão.',
    'A soma infinita só existe quando o módulo da razão é menor que $1$.',
  ],
  'convergencia-e-divergencia': [
    'Antes de aplicar um teste sofisticado, calcule o limite do termo geral.',
    'Se os termos não tendem a zero, a série não pode convergir.',
  ],
  'testes-de-convergencia': [
    'Compare a expressão com uma série $p$ ou escolha um teste compatível.',
    'No teste $p$, a fronteira decisiva é $p=1$.',
  ],
  'series-alternadas': [
    'Primeiro analise a série dos módulos.',
    'Para o teste alternado, os módulos devem diminuir e tender a zero.',
  ],
  'series-de-potencias': [
    'Aplique razão ou raiz aos coeficientes, mantendo $x$ na expressão.',
    'Depois analise separadamente cada extremo do intervalo.',
  ],
  'taylor-e-maclaurin': [
    'Escolha o centro e calcule derivadas até a ordem necessária.',
    'Em Maclaurin, substitua $x=0$ nos coeficientes.',
  ],
};
const bank = getDiverseCalculusTwoBank();
const selected = bank
  .map((question, index) => ({ question, index }))
  .filter(({ index }) => index % 5 < 3);
ensure(
  selected.length === 150,
  'A revisão deve conter exatamente 150 questões.',
);
const directStatement = (statement) =>
  statement
    .replace(contexts, '')
    .replace(endings, ' Assinale a alternativa correta.');
const validate = (text) => {
  ensure(
    (text.match(/\$/g) ?? []).length % 2 === 0,
    'LaTex com cifrão sem par.',
  );
  for (const match of text.matchAll(/\$([^$]+)\$/g))
    katex.renderToString(match[1], { throwOnError: true, strict: 'error' });
};
const lines = [
  '-- Revisão editorial de 150 questões de Cálculo II: comandos diretos e dicas específicas.',
  'begin;',
  '',
];
for (const { question, index } of selected) {
  const number = 99001 + index;
  const questionId = id(4, number);
  const statement = directStatement(question.statement);
  const hints = [
    ...topicHints[question.topic],
    question.hints[0].replace(/^Nomeie primeiro a ideia central: /, ''),
  ];
  const explanation = `${question.explanation.replace(/^A habilidade avaliada é reconhecer a estrutura matemática antes de operar símbolos\. /, '')} A resolução abaixo mostra a decisão principal e a checagem necessária.`;
  [statement, ...hints, explanation, ...question.steps.flat()].forEach(
    validate,
  );
  lines.push(
    `update public.questions set statement_markdown=${sql(statement)} where id=${sql(questionId)};`,
    ...hints.map(
      (hint, position) =>
        `update public.question_hints set content_markdown=${sql(hint)}, sort_order=${position + 1} where id=${sql(id(6, number * 10 + position + 1))};`,
    ),
    `update public.question_solutions set explanation_markdown=${sql(explanation)} where question_id=${sql(questionId)};`,
    ...question.steps.map(
      ([title, content], position) =>
        `update public.question_solution_steps set title=${sql(title)}, content_markdown=${sql(content)}, sort_order=${position + 1} where id=${sql(id(7, number * 10 + position + 1))};`,
    ),
    '',
  );
}
lines.push('commit;', '');
const output = lines.join('\n');
if (process.argv.includes('--check')) {
  ensure(
    readFileSync(outputPath, 'utf8') === output,
    'Migration de revisão de Cálculo II está desatualizada.',
  );
  console.log('Revisão de 150 questões de Cálculo II validada.');
} else {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, output);
  console.log(`Migration criada: ${outputPath}`);
}
