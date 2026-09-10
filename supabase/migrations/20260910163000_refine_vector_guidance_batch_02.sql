-- Revisão individual de dicas, explicações e dificuldade: norma, versores e produto escalar.
begin;

update public.questions set difficulty='easy' where id in (
'40000000-0000-4000-8000-000000050103','40000000-0000-4000-8000-000000050105','40000000-0000-4000-8000-000000050107',
'40000000-0000-4000-8000-000000050109','40000000-0000-4000-8000-000000050110','40000000-0000-4000-8000-000000050112',
'40000000-0000-4000-8000-000000050115','40000000-0000-4000-8000-000000050117','40000000-0000-4000-8000-000000050120');
update public.questions set difficulty='medium' where id in (
'40000000-0000-4000-8000-000000050113','40000000-0000-4000-8000-000000050114','40000000-0000-4000-8000-000000050118');

with revised(question_id,hint,explanation) as (values
('40000000-0000-4000-8000-000000050101'::uuid,'Sem extrair a raiz ainda, confira se a soma dos quadrados forma um quadrado perfeito.','A norma euclidiana reúne as três componentes em $\sqrt{3^2+(-4)^2+12^2}=\sqrt{169}=13$. O resultado é positivo e seu quadrado recupera $169$.'),
('40000000-0000-4000-8000-000000050102'::uuid,'Compare $|a|^2$, $|b|^2$, $|c|^2$ e $|d|^2$; a ordem é a mesma das normas.','Comparar normas ao quadrado evita raízes: os valores são $9$, $12$, $9$ e $3$. Assim, $b=(2,2,2)$ é o único vetor de maior módulo.'),
('40000000-0000-4000-8000-000000050103'::uuid,'Depois de dividir por $10$, verifique se os sinais continuam iguais aos de $v$.','Como $|v|=10$, a normalização dá $v/|v|=(-6/10,8/10,0)=(-3/5,4/5,0)$. A soma dos quadrados das componentes é $1$, confirmando que o resultado é unitário.'),
('40000000-0000-4000-8000-000000050104'::uuid,'Elimine qualquer candidato cuja soma dos quadrados das componentes não seja $1$.','Um versor deve ter norma $1$. Somente $(3/5,4/5,0)$ satisfaz $9/25+16/25=1$; os demais possuem norma diferente de $1$.'),
('40000000-0000-4000-8000-000000050105'::uuid,'A norma resultante deve permanecer não negativa mesmo que o escalar seja negativo.','A homogeneidade da norma fornece $|-3u|=|-3||u|=3\cdot5=15$. O sinal de $-3$ altera o sentido, mas não produz comprimento negativo.'),
('40000000-0000-4000-8000-000000050106'::uuid,'Confira o deslocamento: a terceira componente deve zerar porque os pontos têm a mesma coordenada $z$.','O deslocamento é $B-A=(3,4,0)$ e sua norma é $\sqrt{3^2+4^2}=5$. A coordenada $z$ não contribui, pois não varia.'),
('40000000-0000-4000-8000-000000050107'::uuid,'Traduza a condição para $x^2+y^2+z^2=16$ e identifique o lugar geométrico.','O módulo de $\overrightarrow{OP}$ é a distância de $P$ à origem. Fixá-lo em $4$ descreve exatamente a esfera de centro $O$ e raio $4$.'),
('40000000-0000-4000-8000-000000050108'::uuid,'Antes de concluir, confira o sinal da parcela formada pelas terceiras componentes.','O produto escalar é $2\cdot4+(-1)\cdot0+3\cdot(-2)=8-6=2$. A operação produz um escalar, e o termo final negativo é essencial.'),
('40000000-0000-4000-8000-000000050109'::uuid,'Procure a alternativa cujo produto com $(2,1,-1)$ se anule sem depender de aproximação.','Ortogonalidade equivale a produto escalar zero. Para $(1,-1,1)$, obtém-se $2-1-1=0$; os outros candidatos não anulam a soma.'),
('40000000-0000-4000-8000-000000050110'::uuid,'Como os módulos são positivos, apenas o cosseno pode tornar o produto igual a zero.','De $u\cdot v=|u||v|\cos\theta=0$ e $|u||v|>0$, segue $\cos\theta=0$. No intervalo entre vetores, isso ocorre em $\theta=90^\circ$.'),
('40000000-0000-4000-8000-000000050111'::uuid,'A projeção deve continuar paralela ao eixo $y$ e conservar a componente $-2$.','Projetar sobre o eixo $y$ elimina as componentes ortogonais a ele e preserva a componente paralela. Portanto, $(5,-2,7)$ torna-se $(0,-2,0)$.'),
('40000000-0000-4000-8000-000000050112'::uuid,'Verifique a unidade: força vezes deslocamento deve resultar em joules.','Para força constante, $W=F\cdot d=2\cdot4+3(-1)+0\cdot5=5$. Como os dados representam força e deslocamento, o resultado é $5\,\mathrm{J}$.'),
('40000000-0000-4000-8000-000000050113'::uuid,'Compare o produto dado com o maior valor permitido por Cauchy–Schwarz.','Como $u\cdot v=12=|u||v|$, há igualdade em Cauchy–Schwarz. O produto positivo mostra que os vetores são paralelos e têm o mesmo sentido.'),
('40000000-0000-4000-8000-000000050114'::uuid,'A equação determina dois sinais; confira qual deles aparece entre as alternativas.','Da norma, $4+x^2+1=9$, logo $x^2=4$ e $x=\pm2$. Como a pergunta pede um valor possível, deve-se escolher entre as alternativas um desses dois valores.'),
('40000000-0000-4000-8000-000000050115'::uuid,'O resultado pedido é escalar; não multiplique novamente pelo versor.','A componente escalar na direção unitária $e$ é $u\cdot e=3\cdot1+4\cdot0+0\cdot0=3$. O vetor projeção seria outra grandeza.'),
('40000000-0000-4000-8000-000000050116'::uuid,'Relacione o sinal negativo ao intervalo em que o cosseno é negativo.','Como $u\cdot v=|u||v|\cos\theta$ e os módulos são positivos, o produto negativo exige $\cos\theta<0$. Assim, $90^\circ<\theta\le180^\circ$: o ângulo é obtuso.'),
('40000000-0000-4000-8000-000000050117'::uuid,'Observe se existe alguma componente de $u$ perpendicular à direção de $v$.','Como $u=2v$, todo o vetor $u$ já está na direção de $v$. Pela fórmula, o coeficiente é $(u\cdot v)/(v\cdot v)=2$, produzindo $2v=(2,2)$.'),
('40000000-0000-4000-8000-000000050118'::uuid,'Os extremos possíveis ocorrem quando os vetores são paralelos, no mesmo sentido ou em sentidos opostos.','A desigualdade triangular e sua versão reversa dão $3=|5-2|\le|u+v|\le7$. Portanto, qualquer alternativa fora de $[3,7]$, como $8$, é impossível.'),
('40000000-0000-4000-8000-000000050119'::uuid,'Verifique as duas exigências de um versor: divisão bem definida e direção preservada.','Normalizar exigiria calcular $0/|0|$, mas $|0|=0$, tornando a divisão indefinida. Além disso, o vetor nulo não determina direção, por isso não possui versor.'),
('40000000-0000-4000-8000-000000050120'::uuid,'Na fórmula da projeção, o denominador não zera porque $v$ é não nulo.','Como $\operatorname{proj}_v u=((u\cdot v)/(v\cdot v))v$ e $v\ne0$, projeção nula implica $u\cdot v=0$. Logo, $u$ e $v$ são ortogonais.')
)
update public.question_hints h set content_markdown=r.hint from revised r
where h.question_id=r.question_id and h.sort_order=3;

with revised(question_id,explanation) as (values
('40000000-0000-4000-8000-000000050101'::uuid,'A norma euclidiana reúne as três componentes em $\sqrt{3^2+(-4)^2+12^2}=\sqrt{169}=13$. O resultado é positivo e seu quadrado recupera $169$.'),
('40000000-0000-4000-8000-000000050102'::uuid,'Comparar normas ao quadrado evita raízes: os valores são $9$, $12$, $9$ e $3$. Assim, $b=(2,2,2)$ é o único vetor de maior módulo.'),
('40000000-0000-4000-8000-000000050103'::uuid,'Como $|v|=10$, a normalização dá $v/|v|=(-6/10,8/10,0)=(-3/5,4/5,0)$. A soma dos quadrados das componentes é $1$.'),
('40000000-0000-4000-8000-000000050104'::uuid,'Um versor deve ter norma $1$. Somente $(3/5,4/5,0)$ satisfaz $9/25+16/25=1$.'),
('40000000-0000-4000-8000-000000050105'::uuid,'A homogeneidade fornece $|-3u|=|-3||u|=3\cdot5=15$; o sinal muda o sentido, não o comprimento.'),
('40000000-0000-4000-8000-000000050106'::uuid,'O deslocamento $B-A=(3,4,0)$ tem norma $5$; não há contribuição em $z$.'),
('40000000-0000-4000-8000-000000050107'::uuid,'Fixar em $4$ a distância de $P$ à origem descreve a esfera de centro $O$ e raio $4$.'),
('40000000-0000-4000-8000-000000050108'::uuid,'$u\cdot v=2\cdot4+(-1)\cdot0+3\cdot(-2)=2$; o termo das terceiras componentes fixa o sinal.'),
('40000000-0000-4000-8000-000000050109'::uuid,'O produto de $(2,1,-1)$ com $(1,-1,1)$ é $2-1-1=0$, comprovando ortogonalidade.'),
('40000000-0000-4000-8000-000000050110'::uuid,'Como os módulos são positivos, $u\cdot v=0$ implica $\cos\theta=0$ e $\theta=90^\circ$.'),
('40000000-0000-4000-8000-000000050111'::uuid,'A projeção no eixo $y$ preserva apenas a componente paralela, resultando em $(0,-2,0)$.'),
('40000000-0000-4000-8000-000000050112'::uuid,'$W=F\cdot d=8-3=5\,\mathrm{J}$; a unidade confirma a interpretação física.'),
('40000000-0000-4000-8000-000000050113'::uuid,'A igualdade positiva em Cauchy–Schwarz mostra que os vetores são paralelos e têm o mesmo sentido.'),
('40000000-0000-4000-8000-000000050114'::uuid,'A equação $4+x^2+1=9$ fornece $x=\pm2$; a resposta deve ser um desses valores.'),
('40000000-0000-4000-8000-000000050115'::uuid,'A componente escalar é $u\cdot e=3$, enquanto o vetor projeção seria uma grandeza diferente.'),
('40000000-0000-4000-8000-000000050116'::uuid,'Produto escalar negativo equivale a cosseno negativo, portanto o ângulo é obtuso.'),
('40000000-0000-4000-8000-000000050117'::uuid,'Como $u=2v$, $u$ já está inteiramente na direção de $v$ e sua projeção é $(2,2)$.'),
('40000000-0000-4000-8000-000000050118'::uuid,'Pela desigualdade triangular, $3\le|u+v|\le7$; logo $8$ é impossível.'),
('40000000-0000-4000-8000-000000050119'::uuid,'O vetor nulo não pode ser dividido por sua norma zero e também não determina uma direção.'),
('40000000-0000-4000-8000-000000050120'::uuid,'Com $v\ne0$, projeção nula força $u\cdot v=0$, caracterizando ortogonalidade.')
)
update public.question_solutions s set explanation_markdown=r.explanation from revised r where s.question_id=r.question_id;

commit;
