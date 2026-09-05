'use client';

import { useState } from 'react';
import { Check, ChevronRight, CircleHelp, Compass } from 'lucide-react';

import { AttemptStatusBadge, ArcButton, ArcCard } from '@/components/arc-ui';

const answers = ['sen(x²) + C', '2sen(x) + C', 'x²sen(x²) + C', '−2cos(x²) + C'];

export function PracticeSurface() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const correct = selectedAnswer === 'A';
  return <ArcCard className="mt-8 overflow-hidden"><div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4 sm:px-8"><div className="flex items-center gap-2 text-xs text-zinc-500"><Compass className="size-3.5" /> Cálculo II <ChevronRight className="size-3" /> Integrais</div>{submitted ? <AttemptStatusBadge status={correct ? 'correct' : 'incorrect'} /> : <span className="rounded-full bg-[#eef4ef] px-3 py-1 text-xs font-medium text-[#496553]">Questão 01</span>}</div><div className="p-5 sm:p-10"><p className="max-w-2xl text-xl font-medium leading-relaxed tracking-[-0.035em] sm:text-2xl">Calcule a integral indefinida abaixo.</p><p className="mt-8 font-serif text-3xl italic tracking-wide sm:text-4xl">∫ 2x · cos(x²) dx</p><div className="mt-10 grid max-w-2xl gap-2">{answers.map((answer, index) => { const id = String.fromCharCode(65 + index); const chosen = selectedAnswer === id; const resultStyle = submitted && (id === 'A' ? 'border-[#8fb59f] bg-[#eef6f0]' : chosen ? 'border-[#dfaaaa] bg-[#faeeee]' : 'border-black/[0.08] bg-white'); return <button disabled={submitted} key={id} onClick={() => setSelectedAnswer(id)} className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${resultStyle ?? (chosen ? 'border-[#8fb59f] bg-[#eef6f0]' : 'border-black/[0.08] bg-white hover:border-black/20')}`}><span className={`grid size-6 place-items-center rounded-full text-xs ${chosen ? 'bg-[#5f8f71] text-white' : 'bg-[#f3f4f2] text-zinc-500'}`}>{id}</span>{answer}</button>; })}</div>{submitted && <div className={`mt-6 max-w-2xl rounded-2xl p-4 text-sm leading-6 ${correct ? 'bg-[var(--arc-success-bg)] text-[var(--arc-success-text)]' : 'bg-[var(--arc-error-bg)] text-[var(--arc-error-text)]'}`}><p className="font-medium">{correct ? 'Você acertou.' : 'Quase. A resposta correta é A.'}</p><p className="mt-1">Use a substituição u = x²; então du = 2x dx e a integral se torna ∫ cos(u) du.</p></div>}<div className="mt-10 flex flex-wrap items-center justify-between gap-4"><button className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-950"><CircleHelp className="size-4" /> Preciso de uma dica</button><ArcButton disabled={!selectedAnswer || submitted} onClick={() => setSubmitted(true)}><Check className="size-4" /> Responder</ArcButton></div></div></ArcCard>;
}
