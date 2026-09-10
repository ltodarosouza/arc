import { q } from './question.mjs';
const data=[
['d/dx\,(x^5)','$5x^4$',['$x^4$','$5x^5$','$4x^5$']],
['d/dx\,(3x^2-4x)','$6x-4$',['$6x^2-4$','$3x-4$','$6x$']],
['d/dx\,(7)','$0$',['$7$','$1$','$-7$']],
['d/dx\,(1/x)','$-1/x^2$',['$1/x^2$','$-1/x$','$-x^{-2}$']],
['d/dx\,(\sqrt x)','$1/(2\sqrt x)$',['$1/\sqrt x$','$1/(2x)$','$\sqrt x/2$']],
['d/dx\,(e^x)','$e^x$',['$xe^x$','$1$','$e^{x-1}$']],
['d/dx\,(\ln x)','$1/x$',['$\ln x$','$x$','$1/(x\ln x)$']],
['d/dx\,(\sin x)','$\cos x$',['$\sin x$','$-\sin x$','$-\cos x$']],
['d/dx\,(\cos x)','$-\sin x$',['$\sin x$','$\cos x$','$-\cos x$']],
['d/dx\,(x^3+x^{-2})','$3x^2-2x^{-3}$',['$3x^2-2x^{-2}$','$3x^2+2x^{-3}$','$3x-2x^{-3}$']],
['d/dx\,(4x^{1/3})','$4/(3x^{2/3})$',['$4/(3x^{1/3})$','$4x^{-2/3}$','$4/(x^{2/3})$']],
['d/dx\,(x^4/4)','$x^3$',['$x^4$','$4x^3$','$x^3/4$']],
['d/dx\,(2x^3-5)','$6x^2$',['$6x^2-5$','$2x^2-5$','$6x^3$']],
['d/dx\,(x^2+1)$ em $x=3$','$6$',['$9$','$3$','$7$']],
['d/dx\,(x^3-3x)$ em $x=1$','$0$',['$3$','$-2$','$-1$']],
['d/dx\,(\tan x)','$\sec^2x$',['$\tan^2x$','$\sec x$','$-\sec^2x$']],
['d/dx\,(\sec x)','$\sec x\tan x$',['$\sec^2x$','$\tan^2x$','$\sec x+\tan x$']],
['d/dx\,(\log_{10}x)','$1/(x\ln10)$',['$1/x$','$1/\ln10$','$\ln10/x$']],
['d/dx\,(x^{7/2})','$(7/2)x^{5/2}$',['$(7/2)x^{7/2}$','$(5/2)x^{5/2}$','$7x^{5/2}$']],
['d/dx\,(x^{-4})','$-4x^{-5}$',['$-4x^{-4}$','$4x^{-5}$','$x^{-5}$']],
['d/dx\,(5x-9)','$5$',['$-9$','$5x$','$1$']],
['d/dx\,(x^2-2x+1)$ em $x=4$','$6$',['$8$','$4$','$9$']],
['d/dx\,(x^{1/5})','$1/(5x^{4/5})$',['$1/(5x^{1/5})$','$1/(5x^5)$','$x^{-4/5}$']],
['d/dx\,(\sin x+x)','$\cos x+1$',['$\sin x+1$','$\cos x+x$','$\cos x$']],
['d/dx\,(e^x+\ln x)','$e^x+1/x$',['$e^x+\ln x$','$e^x+x$','$1/x$']]
];
export default data.map(([expr,answer,distractors],i)=>q(`c1-r04-${String(i+1).padStart(3,'0')}`,['easy','medium','hard'][i%3],'taxa de variação e derivada',`Calcule ${expr}.`,answer,distractors,'A derivada descreve taxa instantânea; selecione a regra que corresponde a cada termo.','Diferencie termo a termo, mantendo expoentes e coeficientes visíveis.','Verifique a expressão derivando mentalmente o resultado proposto.'));
