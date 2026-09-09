/**
 * Generates the follow-up migration that brings the published MVP catalogue
 * to the five-step editorial floor. Historical migrations remain immutable.
 */
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';

const check = process.argv.includes('--check');
const outputPath =
  'supabase/migrations/20260909123000_enforce_five_step_mvp_solutions.sql';
const questionId = (number) =>
  `40000000-0000-4000-8000-${String(number).padStart(12, '0')}`;
const stepId = (family, serial) =>
  `${family}-0000-4000-8000-${String(serial).padStart(12, '0')}`;
const quote = (value) => "'" + String(value).replaceAll("'", "''") + "'";

const foundations = {
  1: [
    [
      'Leia a estrutura',
      'A parte interna do cosseno é $x^2$, e sua derivada é $2x$, exatamente o fator que acompanha a função.',
    ],
    [
      'Defina a substituição',
      'Escolha $u=x^2$. Então $du=2x\\,dx$, de modo que todo o fator externo é absorvido.',
    ],
    [
      'Reescreva a integral',
      'A integral passa a ser $\\int\\cos(u)\\,du$. A variável $x$ não deve permanecer nesta linha.',
    ],
    [
      'Integre e retorne',
      'Como $\\int\\cos(u)\\,du=\\sin(u)+C$, voltamos a $u=x^2$ e obtemos $\\sin(x^2)+C$.',
    ],
    [
      'Confira por derivação',
      'A derivada de $\\sin(x^2)$ é $\\cos(x^2)\\cdot2x$, que reproduz o integrando.',
    ],
  ],
  2: [
    [
      'Reconheça a série',
      'Cada termo é obtido multiplicando o anterior por $1/3$; portanto ela é geométrica.',
    ],
    [
      'Identifique os dados',
      'O primeiro termo é $a=1$ porque a soma começa em $n=0$, e a razão é $r=1/3$.',
    ],
    [
      'Verifique a condição',
      'Como $|r|=1/3<1$, a série infinita converge e a fórmula da soma pode ser usada.',
    ],
    ['Calcule a soma', 'Aplicando $a/(1-r)$, temos $1/(1-1/3)=1/(2/3)=3/2$.'],
    [
      'Compare com a alternativa',
      'A resposta correta deve afirmar simultaneamente a convergência e a soma $3/2$.',
    ],
  ],
  3: [
    [
      'Organize a matriz',
      'Para uma matriz $2\\times2$ escrita como $\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$, o determinante é $ad-bc$.',
    ],
    ['Identifique as entradas', 'Aqui, $a=2$, $b=1$, $c=3$ e $d=4$.'],
    ['Substitua na fórmula', 'Calculamos $ad-bc=2\\cdot4-1\\cdot3$.'],
    ['Efetue as operações', '$2\\cdot4=8$ e $1\\cdot3=3$; assim, $8-3=5$.'],
    [
      'Faça uma conferência',
      'O resultado é um único número, não uma matriz; por isso a alternativa com $5$ é a compatível.',
    ],
  ],
  4: [
    ['Escolha uma primitiva', 'Uma função cuja derivada é $3x^2$ é $x^3$.'],
    [
      'Aplique a regra dos extremos',
      'Para uma integral definida, use $[x^3]_0^1=x^3\\big|_{x=1}-x^3\\big|_{x=0}$.',
    ],
    ['Avalie no limite superior', 'No extremo $1$, obtemos $1^3=1$.'],
    [
      'Subtraia o limite inferior',
      'No extremo $0$, obtemos $0^3=0$; então $1-0=1$.',
    ],
    [
      'Interprete o resultado',
      'A constante de integração não aparece em integrais definidas, pois ela se cancela na subtração.',
    ],
  ],
  5: [
    [
      'Reconheça o produto',
      'O integrando é $x e^x$, um produto para o qual integração por partes é apropriada.',
    ],
    [
      'Escolha $u$ e $dv$',
      'Tome $u=x$ e $dv=e^x\\,dx$. Assim, $du=dx$ e $v=e^x$.',
    ],
    [
      'Aplique a fórmula',
      'Usamos $\\int u\\,dv=uv-\\int v\\,du$, obtendo $xe^x-\\int e^x\\,dx$.',
    ],
    [
      'Complete o cálculo',
      'Como $\\int e^x\\,dx=e^x$, a primitiva fica $xe^x-e^x+C=(x-1)e^x+C$.',
    ],
    [
      'Confira por derivação',
      'A derivada de $(x-1)e^x$ é $e^x+(x-1)e^x=xe^x$.',
    ],
  ],
  6: [
    [
      'Localize os termos dominantes',
      'No numerador e no denominador, os termos de maior grau são respectivamente $2n$ e $n$.',
    ],
    [
      'Normalize a fração',
      'Divida numerador e denominador por $n$: $(2+1/n)/(1+3/n)$.',
    ],
    [
      'Use o comportamento de $1/n$',
      'Quando $n$ cresce sem limite, tanto $1/n$ quanto $3/n$ tendem a zero.',
    ],
    ['Calcule o limite', 'A expressão tende a $(2+0)/(1+0)=2$.'],
    [
      'Elimine distrações',
      'Não se divide $2$ por $3$: os coeficientes relevantes são os dos termos de maior grau.',
    ],
  ],
  7: [
    [
      'Reconheça a série',
      'A razão entre termos consecutivos é $1/2$, portanto esta também é uma série geométrica.',
    ],
    [
      'Observe o início',
      'Como a soma começa em $n=1$, o primeiro termo é $a=1/2$, não $1$.',
    ],
    [
      'Verifique a convergência',
      'Temos $|r|=1/2<1$, então a soma infinita existe.',
    ],
    ['Aplique a fórmula', 'A soma é $a/(1-r)=(1/2)/(1-1/2)=1$.'],
    [
      'Faça um teste rápido',
      'As somas parciais $1/2$, $3/4$, $7/8$ se aproximam de $1$, confirmando o resultado.',
    ],
  ],
  8: [
    [
      'Escreva a regra',
      'Para $\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$, o determinante é $ad-bc$.',
    ],
    ['Associe as entradas', 'Nesta matriz, $a=1$, $b=2$, $c=3$ e $d=1$.'],
    ['Calcule os produtos', 'Temos $ad=1\\cdot1=1$ e $bc=2\\cdot3=6$.'],
    ['Subtraia na ordem certa', 'Logo, $ad-bc=1-6=-5$.'],
    [
      'Confira o sinal',
      'Inverter a ordem para $bc-ad$ mudaria indevidamente o sinal; a alternativa correta é $-5$.',
    ],
  ],
  9: [
    [
      'Reconheça a estrutura',
      'A matriz é diagonal: todos os elementos fora da diagonal principal são zero.',
    ],
    [
      'Use a propriedade',
      'Em uma matriz diagonal, cada entrada da diagonal já é um autovalor.',
    ],
    ['Leia os valores', 'As entradas diagonais são $2$ e $5$.'],
    [
      'Relacione ao polinômio',
      'De fato, $\\det(A-\\lambda I)=(2-\\lambda)(5-\\lambda)$, cujas raízes são $2$ e $5$.',
    ],
    ['Conclua', 'Portanto, a alternativa que lista $2$ e $5$ é a correta.'],
  ],
  10: [
    [
      'Escreva a definição',
      'O produto escalar soma os produtos das coordenadas correspondentes.',
    ],
    [
      'Emparelhe as coordenadas',
      'Para $u=(1,2,-1)$ e $v=(2,0,3)$, usamos $1\\cdot2$, $2\\cdot0$ e $(-1)\\cdot3$.',
    ],
    ['Calcule cada parcela', 'Os produtos são $2$, $0$ e $-3$.'],
    ['Some os resultados', '$2+0-3=-1$.'],
    [
      'Verifique o procedimento',
      'Não se multiplicam todas as coordenadas entre si: há um produto por posição e depois uma soma.',
    ],
  ],
};

const followUps = {
  antiderivative: (number) => [
    [
      'Relacione com a alternativa',
      'Depois de simplificar, compare a expressão completa, incluindo a constante $C$ quando houver integral indefinida.',
    ],
    [
      'Faça uma verificação ativa',
      'Derive a expressão final e confirme que cada termo volta ao integrando; essa é a forma mais segura de detectar um fator ou sinal perdido.',
    ],
  ],
  definite: (number) => [
    [
      'Verifique a regra usada',
      'Confirme se os limites foram respeitados e se alguma propriedade — simetria, orientação ou Teorema Fundamental — foi aplicada com o sinal correto.',
    ],
    [
      'Conecte à alternativa',
      'Compare o valor obtido com as alternativas sem arredondar. Um resultado de integral definida deve preservar sinal e fração quando eles aparecem.',
    ],
  ],
  substitution: (number) => [
    [
      'Cheque a troca de variável',
      'Após a substituição, confirme que o diferencial e toda ocorrência de $x$ foram convertidos para a nova variável.',
    ],
    [
      'Valide o resultado',
      'Em integrais indefinidas, derive a resposta; em integrais definidas, confira também os novos limites antes de escolher a alternativa.',
    ],
  ],
};

const records = [];
for (const [number, steps] of Object.entries(foundations)) {
  steps.forEach(([title, content], index) =>
    records.push({ number: Number(number), step: index + 1, title, content }),
  );
}
for (const [kind, start, end] of [
  ['antiderivative', 11, 17],
  ['definite', 18, 27],
  ['substitution', 28, 35],
]) {
  for (let number = start; number <= end; number++) {
    followUps[kind](number).forEach(([title, content], index) =>
      records.push({ number, step: index + 4, title, content }),
    );
  }
}

assert.equal(records.filter(({ number }) => number <= 10).length, 50);
assert.equal(records.filter(({ number }) => number >= 11).length, 50);

const lines = [
  '-- Generated by scripts/build-mvp-five-step-solutions.mjs. Do not edit by hand.',
  '-- Incremental editorial update: preserves answers, attempts and statistics.',
  '-- Questions 1–10 receive a complete five-step resolution; questions 11–35 receive their missing fourth and fifth pedagogical steps.',
  'begin;',
];

for (const { number, step, title, content } of records) {
  const family =
    number <= 10 ? '72000000' : step === 4 ? '71000000' : '71100000';
  const serial = number <= 10 ? number * 10 + step : number;
  lines.push(
    `insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order) select ${quote(stepId(family, serial))}, ${quote(questionId(number))}, ${quote(title)}, ${quote(content)}, ${step} where exists (select 1 from public.questions where id=${quote(questionId(number))} and publication_status='published') on conflict (question_id, sort_order) do update set title=excluded.title, content_markdown=excluded.content_markdown;`,
  );
}
lines.push('commit;', '');
const text = lines.join('\n');

if (check) {
  assert.equal(
    readFileSync(outputPath, 'utf8').replaceAll('\r\n', '\n'),
    text,
    `${outputPath} is stale`,
  );
} else {
  writeFileSync(outputPath, text);
}

console.log('Five-step editorial standard: 35 published questions covered.');
