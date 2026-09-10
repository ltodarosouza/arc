-- Substitui 50 cópias publicadas por questões autorais de Cálculo I.
-- Referência de competências: Stewart_1_ptbr.pdf (consultada em 2026-09-10).
-- Os enunciados e as resoluções abaixo são originais da Arc.
begin;

insert into public.question_sources (
  id, kind, label, licence_note, rights_holder, rights_status, verified_by, verified_at
) values (
  '10000000-0000-4000-8000-000000001350',
  'original',
  'Arc original Cálculo I — substituição de duplicatas, lote 2026-09-10',
  'Questões e soluções autorais. Stewart, Cálculo I em português, foi consultado somente para mapear competências e progressão.',
  'Arc', 'approved', 'Equipe editorial Arc', '2026-09-10T00:00:00Z'
) on conflict (id) do update set
  label = excluded.label,
  licence_note = excluded.licence_note,
  rights_status = excluded.rights_status,
  verified_by = excluded.verified_by,
  verified_at = excluded.verified_at;

-- Mantém tentativas existentes: as cópias apenas deixam de ser publicadas.
update public.questions
set publication_status = 'archived'
where id in (
  '00000041-0000-4000-8000-000000007600', '00000041-0000-4000-8000-000000007700',
  '00000041-0000-4000-8000-000000007800', '00000041-0000-4000-8000-000000007900',
  '00000041-0000-4000-8000-000000008000', '00000041-0000-4000-8000-000000008100',
  '00000041-0000-4000-8000-000000008200', '00000041-0000-4000-8000-000000008300',
  '00000041-0000-4000-8000-000000008400', '00000041-0000-4000-8000-000000008500',
  '00000041-0000-4000-8000-000000008600', '00000041-0000-4000-8000-000000008700',
  '00000041-0000-4000-8000-000000008800', '00000041-0000-4000-8000-000000008900',
  '00000041-0000-4000-8000-000000009000', '00000041-0000-4000-8000-000000009100',
  '00000041-0000-4000-8000-000000009200', '00000041-0000-4000-8000-000000009300',
  '00000041-0000-4000-8000-000000009400', '00000041-0000-4000-8000-000000009500',
  '00000041-0000-4000-8000-000000009600', '00000041-0000-4000-8000-000000009700',
  '00000041-0000-4000-8000-000000009800', '00000041-0000-4000-8000-000000009900',
  '00000041-0000-4000-8000-000000010000', '00000041-0000-4000-8000-000000010100',
  '00000041-0000-4000-8000-000000010200', '00000041-0000-4000-8000-000000010300',
  '00000041-0000-4000-8000-000000010400', '00000041-0000-4000-8000-000000010500',
  '00000041-0000-4000-8000-000000010600', '00000041-0000-4000-8000-000000010700',
  '00000041-0000-4000-8000-000000010800', '00000041-0000-4000-8000-000000010900',
  '00000041-0000-4000-8000-000000011000', '00000041-0000-4000-8000-000000011100',
  '00000041-0000-4000-8000-000000011200', '00000041-0000-4000-8000-000000011300',
  '00000041-0000-4000-8000-000000011400', '00000041-0000-4000-8000-000000011500',
  '00000041-0000-4000-8000-000000011600', '00000041-0000-4000-8000-000000011700',
  '00000041-0000-4000-8000-000000011800', '00000041-0000-4000-8000-000000011900',
  '00000041-0000-4000-8000-000000012000', '00000041-0000-4000-8000-000000012100',
  '00000041-0000-4000-8000-000000012200', '00000041-0000-4000-8000-000000012300',
  '00000041-0000-4000-8000-000000012400', '00000041-0000-4000-8000-000000012500'
);

create temporary table replacement_seed (
  n integer primary key, difficulty public.question_difficulty not null, topic uuid not null,
  statement text not null, final_answer text not null, method text not null,
  setup text not null, calculation text not null, verification text not null
) on commit drop;

-- Cada linha é um item autoral independente; os campos de resolução registram
-- a cadeia de raciocínio particular usada para o gabarito comentado.
insert into replacement_seed values
(1301,'easy','30000000-0000-4000-8000-000000000012','A altura de uma maquete é dada por $h(t)=\sqrt{12-3t}$. Determine os instantes reais em que o modelo faz sentido e explique a fronteira do intervalo.','$(-\infty,4]$','domínio de raiz','O radicando deve ser não negativo.',' $12-3t\ge0$ equivale a $t\le4$.','Em $t=4$, o radicando é zero; para $t>4$, seria negativo.'),
(1302,'medium','30000000-0000-4000-8000-000000000013','Uma embalagem retangular tem largura $x$ cm e comprimento $x+5$ cm. Escreva sua área em função de $x$, informe o domínio físico e calcule a área quando $x=7$.','$A(x)=x^2+5x$, com $x>0$, e $A(7)=84$ cm$^2$.','modelagem geométrica','As duas medidas são $x$ e $x+5$.',' $A=x(x+5)=x^2+5x$; em $x=7$, $A=7\cdot12=84$.','Comprimento e largura ficam positivos quando $x>0$.'),
(1303,'hard','30000000-0000-4000-8000-000000000014','Uma conversão de temperatura é dada por $C(F)=\frac{5}{9}(F-32)$. Encontre a fórmula que recupera $F$ a partir de $C$ e confirme-a compondo as funções.','$C^{-1}(x)=\frac95x+32$.','inversão algébrica','Troque o nome da saída por $x$ e isole a entrada $F$.',' $x=\frac59(F-32)$ dá $\frac95x=F-32$, logo $F=\frac95x+32$.','Substituir $C(F)$ na fórmula inversa devolve $F$.'),
(1304,'easy','30000000-0000-4000-8000-000000000012','A relação $x=y^2-6$ representa uma curva. Ela define $y$ como função de $x$ para todo $x\ge-6$? Justifique pelo teste da unicidade.','Não; para $x=-2$, há $y=2$ e $y=-2$.','teste de função','Para ser função, cada entrada deve ter uma única saída.','Em $x=-2$, a equação fica $-2=y^2-6$, então $y^2=4$.','As duas saídas distintas quebram a unicidade.'),
(1305,'medium','30000000-0000-4000-8000-000000000015','Resolva $\log_3(x+2)+\log_3(x-2)=2$, registrando a restrição necessária para os logaritmos.','$x=\sqrt{13}$.','equação logarítmica','Os dois argumentos exigem $x>2$.','A soma vira $\log_3((x+2)(x-2))=2$, portanto $x^2-4=9$.','Das raízes $\pm\sqrt{13}$, somente a positiva satisfaz $x>2$.'),
(1306,'hard','30000000-0000-4000-8000-000000000013','Uma cultura começa com $240$ células e triplica a cada $4$ horas. Escreva $N(t)$, com $t$ em horas, e calcule $N(10)$.','$N(t)=240\cdot3^{t/4}$ e $N(10)=720\sqrt3$.','crescimento exponencial por períodos','Há $t/4$ períodos de quatro horas.','Cada período multiplica por $3$, então $N(t)=240\cdot3^{t/4}$; para $t=10$, o expoente é $5/2$.','Em $t=0$, a fórmula retorna as $240$ células iniciais.'),
(1307,'easy','30000000-0000-4000-8000-000000000014','Se $f(x)=2x-1$ e $g(x)=\frac1x$, determine $(g\circ f)(3)$ e diga por que a ordem de composição importa.','$\frac15$.','composição','A composição pede primeiro $f(3)$.',' $f(3)=5$ e depois $g(5)=\frac15$.','Inverter a ordem daria $f(g(3))=-\frac13$, um resultado diferente.'),
(1308,'medium','30000000-0000-4000-8000-000000000012','Para $q(x)=|2x+6|-4$, localize o vértice e descreva os intervalos em que a expressão interna muda de sinal.','Vértice $(-3,-4)$; a expressão interna é negativa se $x<-3$ e não negativa se $x\ge-3$.','valor absoluto','A mudança ocorre quando $2x+6=0$.','Resolvendo, obtém-se $x=-3$; nesse ponto $q(-3)=-4$.','O valor absoluto transforma valores negativos em seus opostos.'),
(1309,'hard','30000000-0000-4000-8000-000000000015','O preço de um ingresso diminui $12\%$ a cada mês. Partindo de 80 reais, escreva o preço $P(n)$ após $n$ meses e determine após quantos meses ele fica abaixo de 50 reais.','$P(n)=80(0,88)^n$; pela primeira vez, fica abaixo de 50 reais em $n=4$.','decaimento e comparação','A cada mês resta $88\%$ do preço anterior.','Calcule $P(3)\approx54,52$ e $P(4)\approx47,98$.','O primeiro valor abaixo de $50$ ocorre no quarto mês.'),
(1310,'easy','30000000-0000-4000-8000-000000000013','A função $s(t)=18\sin(\pi t/6)$ mede o deslocamento de um pistão, em milímetros. Determine o período e interprete $s(3)$.','Período $12$; em $t=3$, o deslocamento é $18$ mm.','função trigonométrica','Para $\sin(bt)$, o período é $2\pi/b$.','Aqui $b=\pi/6$, então o período é $12$; além disso, $\sin(\pi/2)=1$.','O valor positivo indica deslocamento no sentido adotado como positivo.'),
(1311,'medium','30000000-0000-4000-8000-000000000018','Calcule $\lim_{x\to3}\frac{x^2-x-6}{x-3}$ e explique por que a substituição direta não encerra o cálculo.','$5$.','fatoração em limite','A substituição inicial produz $0/0$.','Fatore $x^2-x-6=(x-3)(x+2)$ e cancele o fator apenas para $x\ne3$.','O limite da expressão simplificada é $3+2=5$.'),
(1312,'hard','30000000-0000-4000-8000-000000000019','Determine $a$ para que $f(x)=\begin{cases}x^2+a,&x\le1\\3x-1,&x>1\end{cases}$ seja contínua em $1$.','$a=1$.','continuidade por partes','Os limites laterais e o valor em $1$ precisam coincidir.','À esquerda, o valor é $1+a$; à direita, o limite é $2$.','Igualar $1+a=2$ produz $a=1$.'),
(1313,'easy','30000000-0000-4000-8000-000000000017','Uma tabela informa que, perto de $x=2$, os valores de $r(x)$ se aproximam de $-4$ tanto pela esquerda quanto pela direita, embora $r(2)=9$. Determine $\lim_{x\to2}r(x)$ e compare-o com $r(2)$.','$\lim_{x\to2}r(x)=-4$, enquanto $r(2)=9$.','leitura local de limite','O limite considera valores próximos, não necessariamente o valor no ponto.','As duas aproximações fornecem o mesmo número, $-4$.','A diferença para $r(2)$ não altera esse limite, mas impede continuidade.'),
(1314,'medium','30000000-0000-4000-8000-000000000020','Encontre as assíntotas horizontal e vertical de $f(x)=\frac{3x-2}{x+1}$.','$y=3$ e $x=-1$.','assíntotas de racional','O zero do denominador aponta a candidata vertical; os graus são iguais.','Em $x=-1$, o numerador é $-5$, então não há cancelamento; a razão dos coeficientes líderes é $3/1$.','Logo as retas são $x=-1$ e $y=3$.'),
(1315,'hard','30000000-0000-4000-8000-000000000018','Calcule $\lim_{x\to0}\frac{\sqrt{4+x}-2}{x}$ usando o conjugado.','$\frac14$.','racionalização','A diferença de raízes cria a forma indeterminada $0/0$.','Multiplicar pelo conjugado transforma o numerador em $x$, que cancela com o denominador.','Resta $1/(\sqrt{4+x}+2)$, cujo limite é $1/4$.'),
(1316,'easy','30000000-0000-4000-8000-000000000019','A função $u(x)=\frac{x^2-9}{x-3}$ pode ser redefinida em $x=3$ para ficar contínua? Se sim, indique o novo valor.','Sim; defina $u(3)=6$.','descontinuidade removível','Fatore o numerador para estudar os valores próximos de $3$.','Para $x\ne3$, $u(x)=x+3$, cujo limite em $3$ é $6$.','A definição pontual igual ao limite remove a falha.'),
(1317,'medium','30000000-0000-4000-8000-000000000017','Determine os limites laterais de $f(x)=\frac{|x-1|}{x-1}$ em $x=1$ e conclua sobre o limite bilateral.','$\lim_{x\to1^-}f(x)=-1$ e $\lim_{x\to1^+}f(x)=1$; o limite bilateral não existe.','valor absoluto e laterais','O sinal de $x-1$ muda nos dois lados de $1$.','À esquerda, $|x-1|=-(x-1)$; à direita, $|x-1|=x-1$.','Como os resultados laterais diferem, não há um único limite.'),
(1318,'hard','30000000-0000-4000-8000-000000000020','Determine $\lim_{x\to-\infty}\left(\sqrt{x^2-2x}+x\right)$.','$1$.','racionalização no infinito','Como $x<0$ para valores suficientemente negativos, $\sqrt{x^2}=|x|=-x$.','Racionalize: a expressão vira $\frac{-2x}{\sqrt{x^2-2x}-x}$.','Dividir por $-x$ no denominador mostra que o limite é $2/(1+1)=1$.'),
(1319,'easy','30000000-0000-4000-8000-000000000018','Use o limite fundamental para calcular $\lim_{x\to0}\frac{\sin(7x)}{2x}$.','$\frac72$.','limite trigonométrico','Separe o fator que cria $\sin(7x)/(7x)$.',' $\frac{\sin(7x)}{2x}=\frac72\cdot\frac{\sin(7x)}{7x}$.','O segundo fator tende a $1$, restando $7/2$.'),
(1320,'medium','30000000-0000-4000-8000-000000000019','Verifique a continuidade de $v(x)=\ln(x+4)$ no ponto $x=-3$.','É contínua em $x=-3$.','continuidade de logaritmo','O logaritmo é contínuo onde seu argumento é positivo.','Em $x=-3$, $x+4=1>0$, portanto o ponto pertence ao domínio.','A composição com a função linear preserva a continuidade nesse domínio.'),
(1321,'hard','30000000-0000-4000-8000-000000000022','Usando a definição, calcule a derivada de $f(x)=\frac1x$ em um ponto genérico $a\ne0$.','$f''(a)=-\frac1{a^2}$.','definição de derivada','Comece por $\lim_{h\to0}\frac{f(a+h)-f(a)}h$.','A diferença de frações é $\frac{-h}{a(a+h)}$; após dividir por $h$, resta $-\frac1{a(a+h)}$.','Quando $h\to0$, o resultado tende a $-1/a^2$.'),
(1322,'easy','30000000-0000-4000-8000-000000000023','Derive $p(x)=5x^3-4x^2+7$.','$p''(x)=15x^2-8x$.','regra da potência','Derive termo a termo; a constante desaparece.',' $5x^3$ gera $15x^2$ e $-4x^2$ gera $-8x$.','Derivar novamente confirma que não restou termo constante indevido.'),
(1323,'medium','30000000-0000-4000-8000-000000000024','Encontre a derivada de $m(x)=(x^2+2)e^x$.','$m''(x)=e^x(x^2+2x+2)$.','regra do produto','Há dois fatores dependentes de $x$.',' $m''=2xe^x+(x^2+2)e^x$, que pode ser fatorado por $e^x$.','Expandir $e^x(x^2+2x+2)$ recupera os dois termos.'),
(1324,'hard','30000000-0000-4000-8000-000000000025','Derive $y=\cos(4x^2-1)$.','$y''=-8x\sin(4x^2-1)$.','regra da cadeia','A função externa é cosseno e o argumento também varia com $x$.','A derivada externa é $-\sin(4x^2-1)$ e a interna é $8x$.','Multiplicar as duas derivadas dá o resultado.'),
(1325,'easy','30000000-0000-4000-8000-000000000022','A posição é $s(t)=2t^2-8t+3$, em metros. Determine os instantes em que a velocidade é zero e interprete o sinal da velocidade antes e depois.','$v(t)=4t-8$; ela zera em $t=2$, é negativa antes e positiva depois.','velocidade como derivada','A velocidade é $s''(t)$.','Derivando, $v(t)=4t-8$; resolver $v=0$ dá $t=2$.','O fator $4$ é positivo, então o sinal muda de negativo para positivo ao cruzar $2$.'),
(1326,'medium','30000000-0000-4000-8000-000000000026','Na curva $x^2+xy+y^2=7$, encontre $y''$ no ponto $(1,2)$.','$y''=-\frac45$.','derivação implícita','Diferencie cada termo considerando $y$ função de $x$.','Obtemos $2x+x y''+y+2yy''=0$, então $y''=-\frac{2x+y}{x+2y}$.','No ponto dado, $y''=-(2+2)/(1+4)=-4/5$.'),
(1327,'hard','30000000-0000-4000-8000-000000000026','Use diferenciação logarítmica para obter a derivada de $y=(x^2+1)^x$, com $x>0$.','$y''=(x^2+1)^x\left[\ln(x^2+1)+\frac{2x^2}{x^2+1}\right]$.','diferenciação logarítmica','Tomar logaritmo transforma a potência variável em produto.',' $\ln y=x\ln(x^2+1)$; derivando, $y''/y=\ln(x^2+1)+2x^2/(x^2+1)$.','Multiplicar por $y$ restaura a expressão original.'),
(1328,'easy','30000000-0000-4000-8000-000000000027','Use a linearização de $f(x)=\sqrt[3]{x}$ em $a=8$ para estimar $\sqrt[3]{8,24}$.','$2,02$.','linearização','Calcule $f(8)$ e $f''(8)$.',' $f(8)=2$ e $f''(8)=1/12$; então $L(x)=2+(x-8)/12$.','Para $x=8,24$, o acréscimo é $0,24/12=0,02$.'),
(1329,'medium','30000000-0000-4000-8000-000000000024','Determine a equação da reta normal a $y=x^3-x$ no ponto de abscissa $x=1$.','$y=-\frac12(x-1)$.','reta normal','A normal é perpendicular à tangente.',' $y''=3x^2-1$, então a tangente em $1$ tem inclinação $2$ e a normal tem inclinação $-1/2$.','Como o ponto é $(1,0)$, use a forma ponto-inclinação.'),
(1330,'hard','30000000-0000-4000-8000-000000000027','O raio de um cone cresce a $0,3$ cm/s e sua altura permanece igual a três vezes o raio. Quando $r=4$ cm, determine $dV/dt$.','$dV/dt=14,4\pi$ cm$^3$/s.','taxas relacionadas','Com $h=3r$, o volume é $V=\frac13\pi r^2h=\pi r^3$.','Derivando em relação ao tempo, $dV/dt=3\pi r^2dr/dt$.','Substituir $r=4$ e $dr/dt=0,3$ fornece $14,4\pi$.'),
(1331,'easy','30000000-0000-4000-8000-000000000029','Encontre os extremos absolutos de $f(x)=x^2-2x-3$ no intervalo fechado $[-1,4]$.','Mínimo absoluto $-4$ em $x=1$; máximo absoluto $5$ em $x=4$.','extremos em intervalo fechado','Compare pontos críticos internos e extremidades.',' $f''(x)=2x-2$ zera em $x=1$; os valores são $f(-1)=0$, $f(1)=-4$ e $f(4)=5$.','O menor e o maior desses três valores dão os extremos absolutos.'),
(1332,'medium','30000000-0000-4000-8000-000000000030','Para $f(x)=x^4-4x^2$, determine os intervalos de concavidade e os pontos de inflexão.','Côncava para cima em $(-\infty,-\sqrt{2/3})\cup(\sqrt{2/3},\infty)$, para baixo entre eles; inflexões em $x=\pm\sqrt{2/3}$.','segunda derivada','A concavidade vem do sinal de $f''''(x)$.',' $f''=4x^3-8x$ e $f''''=12x^2-8$; os zeros são $\pm\sqrt{2/3}$.','O sinal de $12x^2-8$ muda ao atravessar cada zero.'),
(1333,'hard','30000000-0000-4000-8000-000000000032','Um cercado retangular encosta em um muro, portanto só três lados precisam de $60$ m de tela. Determine as dimensões que maximizam a área.','Largura perpendicular $15$ m e lado junto ao muro $30$ m.','otimização com restrição','Se $x$ é a largura, o lado paralelo ao muro vale $60-2x$.','A área é $A(x)=x(60-2x)=60x-2x^2$, cujo vértice ocorre em $x=15$.','Então o outro lado é $60-30=30$ e a parábola abre para baixo.'),
(1334,'easy','30000000-0000-4000-8000-000000000031','Calcule $\lim_{x\to0}\frac{\sin x-x}{x^3}$ usando L’Hôpital quando a forma indeterminada tiver sido identificada.','$-\frac16$.','L’Hôpital repetido','A substituição produz $0/0$, permitindo a regra.','Após duas derivações, a razão é $-\sin x/(6x)$; uma terceira derivação dá $-\cos x/6$.','Em $x=0$, o valor é $-1/6$.'),
(1335,'medium','30000000-0000-4000-8000-000000000033','Aplique Newton a $f(x)=x^3-5$ partindo de $x_0=2$. Escreva $x_1$ e explique o papel da reta tangente.','$x_1=\frac{29}{12}$.','método de Newton','Use $x_{n+1}=x_n-f(x_n)/f''(x_n)$.',' $f(2)=3$ e $f''(2)=12$, logo $x_1=2-3/12=29/12$.','O novo valor é a abscissa onde a tangente em $x_0$ encontra o eixo.'),
(1336,'hard','30000000-0000-4000-8000-000000000029','Verifique as hipóteses e encontre os pontos garantidos pelo Teorema do Valor Médio para $f(x)=x^2-4x$ em $[1,5]$.','$c=3$.','teorema do valor médio','Polinômios são contínuos no intervalo e deriváveis no interior.','A inclinação secante é $(f(5)-f(1))/(5-1)=(5-(-3))/4=2$; imponha $f''(c)=2$.','Como $2c-4=2$, segue $c=3$, que pertence a $(1,5)$.'),
(1337,'easy','30000000-0000-4000-8000-000000000030','Uma função derivável satisfaz $f''(x)<0$ em todo o intervalo $(2,6)$. O que isso informa sobre o gráfico e sobre $f''$ nesse intervalo?','O gráfico é côncavo para baixo e $f''$ é decrescente em $(2,6)$.','interpretação de derivadas','O sinal da segunda derivada controla a concavidade.','Como $f''<0$, as inclinações das tangentes diminuem conforme $x$ aumenta.','Inclinações decrescentes correspondem a uma função côncava para baixo.'),
(1338,'medium','30000000-0000-4000-8000-000000000032','Uma folha quadrada de lado $20$ cm perde quadrados de lado $x$ nos quatro cantos para formar uma caixa sem tampa. Escreva $V(x)$ e determine $x$ que maximiza o volume.','$V(x)=x(20-2x)^2$ e o máximo ocorre em $x=\frac{10}{3}$ cm.','otimização de volume','A base fica com lados $20-2x$ e a altura é $x$.','Derivando, $V''(x)=4(20-2x)(5-3x)$; no domínio $0<x<10$, o crítico interno é $10/3$.','Nas fronteiras o volume tende a zero, então o crítico interno dá o máximo.'),
(1339,'hard','30000000-0000-4000-8000-000000000031','Calcule $\lim_{x\to\infty}\left(\ln(x+1)-\ln x\right)$ e justifique o método.','$0$.','L’Hôpital para infinito-infinito','Combine os logaritmos antes de aplicar qualquer regra.','A diferença é $\ln((x+1)/x)=\ln(1+1/x)$.','Como $1/x\to0$, a continuidade do logaritmo dá $\ln1=0$.'),
(1340,'easy','30000000-0000-4000-8000-000000000022','A velocidade de uma bicicleta é $v(t)=6t-0,5t^2$ em m/s. Determine a aceleração em $t=8$ e interprete seu sinal.','$a(8)=-2$ m/s$^2$; a velocidade está diminuindo nesse instante.','aceleração','A aceleração é a derivada da velocidade.',' $a(t)=6-t$, então $a(8)=-2$.','O sinal negativo indica que a velocidade varia no sentido negativo escolhido.'),
(1341,'medium','30000000-0000-4000-8000-000000000023','Derive $f(x)=\frac{1}{\sqrt{x}}$ e indique o domínio da função e da derivada.','$f''(x)=-\frac{1}{2x^{3/2}}$, com $x>0$.','potência com expoente negativo','Escreva $f(x)=x^{-1/2}$ no domínio positivo.','Pela regra da potência, $f''=(-1/2)x^{-3/2}$.','A raiz no denominador exige $x>0$, condição preservada na derivada.'),
(1342,'hard','30000000-0000-4000-8000-000000000025','Encontre $\frac{dy}{dx}$ para $y=\sqrt{1+\tan x}$ e informe onde a expressão está definida.','$y''=\frac{\sec^2x}{2\sqrt{1+\tan x}}$, onde $1+\tan x>0$ e $\cos x\ne0$.','cadeia e domínio','A raiz externa exige argumento positivo; a tangente exige $\cos x\ne0$.','Derive a raiz como $\frac1{2\sqrt{1+\tan x}}$ e multiplique por $(\tan x)''=\sec^2x$.','As duas restrições devem ser mantidas no resultado.'),
(1343,'easy','30000000-0000-4000-8000-000000000029','Determine os pontos críticos de $f(x)=|x-2|+x$ e classifique o comportamento à esquerda e à direita deles.','$x=2$ é ponto crítico e mínimo local não estrito; $f$ é constante à esquerda e crescente à direita.','ponto não derivável','A expressão por partes muda em $x=2$.','Para $x<2$, $f(x)=2$; para $x>2$, $f(x)=2x-2$.','A derivada não existe no encontro; os valores à esquerda são iguais a $f(2)$ e, à direita, são maiores.'),
(1344,'medium','30000000-0000-4000-8000-000000000027','O lado $a$ de um quadrado mede $10$ cm com erro máximo de $0,02$ cm. Use diferenciais para estimar o erro máximo na área.','$|dA|\approx0,4$ cm$^2$.','diferenciais','Para $A=a^2$, use $dA=2a\,da$.','Com $a=10$ e $|da|=0,02$, obtém-se $|dA|\approx2\cdot10\cdot0,02$.','A estimativa é $0,4$ cm$^2$, pequena frente à área de $100$ cm$^2$.'),
(1345,'hard','30000000-0000-4000-8000-000000000030','Esboce o sinal de $f''$ e determine onde $f(x)=\frac{x}{x^2+1}$ cresce e decresce.','Cresce em $(-1,1)$ e decresce em $(-\infty,-1)\cup(1,\infty)$.','sinal da derivada','Use a regra do quociente para obter $f''$.',' $f''(x)=\frac{1-x^2}{(x^2+1)^2}$; o denominador é sempre positivo.','O numerador é positivo entre $-1$ e $1$ e negativo fora.'),
(1346,'easy','30000000-0000-4000-8000-000000000024','Encontre a derivada de $r(x)=\frac{2x-3}{x^2+1}$ em $x=0$.',' $r''(0)=2$.','quociente em ponto','Aplique a regra do quociente antes de substituir o ponto.',' $r''(x)=\frac{2(x^2+1)-(2x-3)2x}{(x^2+1)^2}$.','Em $x=0$, o numerador vale $2$ e o denominador vale $1$.'),
(1347,'medium','30000000-0000-4000-8000-000000000026','Se $x^3+y^3=16$, determine a inclinação da tangente no ponto $(2,2)$.','$y''=-1$.','implícita em ponto','Diferencie a igualdade antes de usar as coordenadas.',' $3x^2+3y^2y''=0$, logo $y''=-x^2/y^2$.','Em $(2,2)$, os quadrados se cancelam e a inclinação é $-1$.'),
(1348,'hard','30000000-0000-4000-8000-000000000032','Uma empresa vende $x$ unidades com receita $R(x)=120x-x^2$ e custo $C(x)=20x+800$. Determine a produção que maximiza o lucro e o lucro máximo.','$x=50$ e lucro máximo de $1700$ unidades monetárias.','otimização econômica','O lucro é receita menos custo.',' $L(x)=-x^2+100x-800$; seu vértice ocorre em $x=-100/(2\cdot-1)=50$.',' $L(50)=-2500+5000-800=1700$, e a concavidade negativa confirma máximo.'),
(1349,'easy','30000000-0000-4000-8000-000000000031','Avalie $\lim_{x\to0}\frac{e^{2x}-1}{x}$ sem usar uma forma memorizada diretamente.','$2$.','limite exponencial','Faça aparecer a razão fundamental $(e^u-1)/u$.','Escreva $\frac{e^{2x}-1}{x}=2\cdot\frac{e^{2x}-1}{2x}$.','Como a segunda razão tende a $1$, o limite é $2$.'),
(1350,'medium','30000000-0000-4000-8000-000000000033','Use uma iteração de Newton para aproximar uma raiz de $f(x)=\cos x-x$, começando em $x_0=1$. Deixe o resultado em função de $\cos1$ e $\sin1$.','$x_1=1-\frac{\cos1-1}{-\sin1-1}$.','Newton com função trigonométrica','Calcule $f(1)$ e $f''(1)$ sem arredondar cedo.',' $f(1)=\cos1-1$ e $f''(1)=-\sin1-1$.','Substituí-los na fórmula preserva a precisão da primeira iteração.');

insert into public.questions (id, subject_id, source_id, kind, difficulty, publication_status, statement_markdown)
select format('00000041-0000-4000-8000-%s', lpad(n::text,12,'0'))::uuid,
       '20000000-0000-4000-8000-000000000004', '10000000-0000-4000-8000-000000001350',
       'reveal_answer', difficulty, 'published', statement
from replacement_seed
on conflict (id) do update set source_id=excluded.source_id, difficulty=excluded.difficulty,
  publication_status=excluded.publication_status, statement_markdown=excluded.statement_markdown;

insert into public.question_taxonomy_tags (question_id, taxonomy_node_id, is_primary)
select format('00000041-0000-4000-8000-%s', lpad(n::text,12,'0'))::uuid, topic, true
from replacement_seed
on conflict (question_id, taxonomy_node_id) do update set is_primary=true;

insert into public.question_hints (id, question_id, content_markdown, sort_order)
select format('00000061-0000-4000-8000-%s', lpad((n*10+ord)::text,12,'0'))::uuid,
       format('00000041-0000-4000-8000-%s', lpad(n::text,12,'0'))::uuid, hint, ord
from replacement_seed cross join lateral unnest(array[
  'Identifique a ideia principal: ' || method || '.',
  'Prepare a etapa decisiva: ' || setup,
  'Antes de concluir, confira domínio, sinais e unidades que o enunciado impõe.'
]) with ordinality as h(hint,ord)
on conflict (id) do update set content_markdown=excluded.content_markdown, sort_order=excluded.sort_order;

insert into public.question_solutions (question_id, final_answer_markdown, explanation_markdown)
select format('00000041-0000-4000-8000-%s', lpad(n::text,12,'0'))::uuid, final_answer,
  'O método adequado é ' || method || '. ' || setup || calculation || ' ' || verification
from replacement_seed
on conflict (question_id) do update set final_answer_markdown=excluded.final_answer_markdown,
  explanation_markdown=excluded.explanation_markdown;

insert into public.question_solution_steps (id, question_id, title, content_markdown, sort_order)
select format('00000071-0000-4000-8000-%s', lpad((n*10+ord)::text,12,'0'))::uuid,
       format('00000041-0000-4000-8000-%s', lpad(n::text,12,'0'))::uuid, title, content, ord
from replacement_seed cross join lateral unnest(array[
  'Contextualize: ' || method,
  'Estratégia de ' || method,
  'Dados no método de ' || method,
  'Cálculo de ' || method,
  'Conferência de ' || method
]) with ordinality as title_row(title,ord)
cross join lateral unnest(array[
  'O objetivo é resolver: ' || statement,
  'A ferramenta central é ' || method || '.',
  setup,
  calculation,
  verification
]) with ordinality as content_row(content,content_ord)
where ord=content_ord
on conflict (id) do update set title=excluded.title, content_markdown=excluded.content_markdown,
  sort_order=excluded.sort_order;

commit;
