const r = String.raw;
export default [
  {
    topic: 'alternadas',
    difficulty: 'easy',
    statement: r`A série $\sum_{n=1}^\infty(-1)^{n+1}/n$ é:`,
    options: [
      'Condicionalmente convergente.',
      'Absolutamente convergente.',
      'Divergente, pois alterna sinais.',
      'Divergente, pois o termo geral não tende a zero.',
    ],
    steps: [
      r`Os módulos $1/n$ decrescem para zero; o teste de Leibniz garante convergência.`,
      r`A série dos módulos é a harmônica e diverge. Logo a convergência é condicional.`,
    ],
    verification: { kind: 'alternating', expression: '1/n', absolute: false },
  },
  {
    topic: 'alternadas',
    difficulty: 'easy',
    statement: r`A série $\sum_{n=1}^\infty(-1)^{n+1}/n^2$ é:`,
    options: [
      'Absolutamente convergente.',
      'Somente condicionalmente convergente.',
      'Divergente.',
      'Convergente para zero porque alterna sinais.',
    ],
    steps: [
      r`A série dos módulos é $\sum1/n^2$, convergente pois $p=2>1$.`,
      r`Convergência absoluta implica convergência da série com sinais.`,
    ],
    verification: { kind: 'alternating', expression: '1/n**2', absolute: true },
  },
  {
    topic: 'alternadas',
    difficulty: 'medium',
    statement: r`Ao aproximar $\sum_{n=1}^\infty(-1)^{n+1}/n$ pelos primeiros dez termos, qual cota de Leibniz se obtém para o erro absoluto?`,
    options: ['$1/11$', '$1/10$', '$1/100$', '$1/9$'],
    steps: [
      r`Os módulos decrescem para zero, satisfazendo as hipóteses do teorema do resto.`,
      r`O erro é no máximo o módulo do primeiro termo omitido: $1/(10+1)=1/11$.`,
    ],
    verification: {
      kind: 'alternating-error',
      expression: '1/n',
      terms: 10,
      expected: '1/11',
    },
  },
  {
    topic: 'alternadas',
    difficulty: 'medium',
    statement: r`Qual é o menor número $N$ de termos que garante, pela cota de Leibniz, erro no máximo $0{,}01$ em $\sum_{n=1}^\infty(-1)^{n+1}/n^2$?`,
    options: ['$9$', '$10$', '$99$', '$8$'],
    steps: [
      r`A cota é $1/(N+1)^2$. Exija $1/(N+1)^2\le1/100$.`,
      r`Temos $N+1\ge10$, logo $N\ge9$. Para $N=8$, a cota é $1/81>0{,}01$.`,
    ],
    verification: {
      kind: 'alternating-minimum',
      expression: '1/n**2',
      tolerance: '1/100',
      expected: 9,
    },
  },
  {
    topic: 'alternadas',
    difficulty: 'hard',
    statement: r`Se $S$ é a soma de $\sum_{n=1}^\infty(-1)^{n+1}/n$ e $S_{20}$ sua soma parcial, qual intervalo certificado pelo primeiro termo omitido contém $S$?`,
    options: [
      r`$[S_{20},S_{20}+1/21]$`,
      r`$[S_{20}-1/21,S_{20}]$`,
      r`$[S_{20},S_{20}+1/22]$`,
      r`$[S_{20}-1/22,S_{20}]$`,
    ],
    steps: [
      r`Após um número par de termos, o próximo termo é positivo. O resto tem esse sinal.`,
      r`Seu módulo não supera $1/21$. Portanto $0\le S-S_{20}\le1/21$.`,
    ],
    verification: {
      kind: 'alternating-signed-error',
      expression: '1/n',
      terms: 20,
      expected: '1/21',
    },
  },
];
