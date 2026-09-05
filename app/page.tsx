'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, Check, ChevronRight, CircleHelp, Compass, House, Search, Sparkles, TrendingUp } from 'lucide-react';

const topics = [
  { name: 'Integrais', count: 48, progress: 62 },
  { name: 'Técnicas de integração', count: 36, progress: 28 },
  { name: 'Integrais impróprias', count: 21, progress: 0 },
  { name: 'Sequências e séries', count: 39, progress: 14 },
];

const destinations = [
  { id: 'home', href: '#top', label: 'Início', icon: House },
  { id: 'explore', href: '#explore', label: 'Explorar', icon: Compass },
  { id: 'progress', href: '#progress', label: 'Progresso', icon: TrendingUp },
];

export default function Home() {
  const [activeTopic, setActiveTopic] = useState('Integrais');
  const [questionOpen, setQuestionOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [activeDestination, setActiveDestination] = useState('home');
  const startTopic = (topic: string) => { setActiveTopic(topic); setQuestionOpen(true); setSelectedAnswer(null); };

  useEffect(() => {
    const updateActiveDestination = () => {
      const destination = destinations
        .map((item) => ({ id: item.id, distance: Math.abs((document.getElementById(item.id === 'home' ? 'top' : item.id)?.getBoundingClientRect().top ?? 0) - 128) }))
        .sort((first, second) => first.distance - second.distance)[0];
      if (destination) setActiveDestination(destination.id);
    };

    updateActiveDestination();
    window.addEventListener('scroll', updateActiveDestination, { passive: true });
    window.addEventListener('hashchange', updateActiveDestination);
    return () => {
      window.removeEventListener('scroll', updateActiveDestination);
      window.removeEventListener('hashchange', updateActiveDestination);
    };
  }, []);

  useEffect(() => {
    const context = (document as Document & { modelContext?: { registerTool: (tool: object, options: { signal: AbortSignal }) => void | Promise<void> } }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(context.registerTool({
      name: 'start_practice',
      title: 'Começar prática',
      description: 'Abre uma questão de um assunto de Cálculo II para o estudante começar a praticar.',
      inputSchema: { type: 'object', properties: { topic: { type: 'string', enum: topics.map((topic) => topic.name) } }, required: ['topic'], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute: (input: unknown) => {
        const topic = (input as { topic?: string })?.topic;
        if (!topic || !topics.some((item) => item.name === topic)) throw new Error('Assunto inválido.');
        startTopic(topic);
        return { topic, question: 4, status: 'ready' };
      },
    }, { signal: lifecycle.signal })).catch(() => undefined);
    return () => lifecycle.abort();
  }, []);

  return <main className="min-h-screen bg-[#f7f7f5] text-[#161616]">
    <header className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
      <a className="flex items-center gap-2.5 font-semibold tracking-[-0.045em]" href="#top"><span className="grid size-8 place-items-center rounded-[11px] bg-[#1d221d] text-sm text-white">a</span><span className="text-[18px]">arc</span></a>
      <nav aria-label="Navegação principal" className="hidden items-center gap-1 rounded-full border border-black/[0.07] bg-white/60 p-1 text-sm text-zinc-500 sm:flex">
        {destinations.map((destination) => (
          <a
            aria-current={activeDestination === destination.id ? 'page' : undefined}
            className={`rounded-full px-4 py-2 transition-colors ${activeDestination === destination.id ? 'bg-[#1d221d] text-white' : 'hover:text-zinc-950'}`}
            href={destination.href}
            key={destination.id}
            onClick={() => setActiveDestination(destination.id)}
          >
            {destination.label}
          </a>
        ))}
      </nav>
      <button aria-label="Abrir perfil" className="grid size-9 place-items-center rounded-full bg-[#dfebe5] text-sm font-medium text-[#30453d]">L</button>
    </header>

    <section id="top" className="mx-auto max-w-6xl px-5 pb-10 pt-12 sm:px-8 sm:pt-20">
      <p className="animate-enter text-sm font-medium text-[#6b766f]">sexta-feira, 5 de setembro</p>
      <div className="mt-3 flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><div className="animate-enter delay-1"><h1 className="max-w-xl text-4xl font-medium tracking-[-0.065em] sm:text-6xl">Qual assunto você quer praticar?</h1><p className="mt-4 max-w-md text-[15px] leading-6 text-[#6c716d]">Encontre uma questão e comece. Sem configurar uma sessão.</p></div><button onClick={() => startTopic(activeTopic)} className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#c8e1d4] px-5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b9d9c9] active:translate-y-0">Continuar estudando <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" /></button></div>
    </section>

    <section id="explore" className="mx-auto max-w-6xl px-5 sm:px-8"><div className="overflow-hidden rounded-[28px] border border-black/[0.07] bg-white shadow-[0_20px_60px_rgba(31,37,33,0.04)]">
      <div className="flex items-center justify-between border-b border-black/[0.07] px-5 py-5 sm:px-8"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-[#eff4f0] text-[#466254]"><BookOpen className="size-4" /></span><div><p className="font-medium tracking-[-0.025em]">Cálculo II</p><p className="mt-0.5 text-xs text-zinc-500">142 questões disponíveis</p></div></div><button className="hidden items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900 sm:flex"><Search className="size-4" /> Buscar</button></div>
      <div className="grid lg:grid-cols-[0.92fr_1.08fr]"><div className="border-b border-black/[0.07] p-5 sm:p-8 lg:border-b-0 lg:border-r"><p className="text-xs font-medium uppercase tracking-[0.14em] text-[#7b817d]">Sua jornada</p><div className="mt-7 flex items-center gap-6"><div className="relative grid size-[92px] shrink-0 place-items-center rounded-full" style={{ background: 'conic-gradient(#7fab93 0 42%, #edf0ed 42% 100%)' }}><div className="grid size-[76px] place-items-center rounded-full bg-white"><span className="text-lg font-medium tracking-[-0.05em]">42%</span></div></div><div><p className="text-2xl font-medium tracking-[-0.05em]">Cálculo II</p><p className="mt-1 text-sm leading-5 text-zinc-500">18 questões resolvidas.<br />Continue por Integrais.</p></div></div><button onClick={() => startTopic('Integrais')} className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#435f50] transition-colors hover:text-[#1f3428]">Retomar de onde parei <ChevronRight className="size-4" /></button></div>
      <div className="p-5 sm:p-8"><div className="flex items-center justify-between"><p className="text-xs font-medium uppercase tracking-[0.14em] text-[#7b817d]">Escolha um assunto</p><span className="text-xs text-zinc-400">Cálculo II</span></div><div className="mt-4 divide-y divide-black/[0.06]">{topics.map((topic, index) => <button key={topic.name} onClick={() => startTopic(topic.name)} className="group flex w-full items-center gap-4 py-4 text-left transition-all duration-200 hover:pl-1"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#f3f4f2] text-xs font-medium text-[#637167]">{String(index + 1).padStart(2, '0')}</span><span className="min-w-0 flex-1"><span className="block text-[15px] font-medium tracking-[-0.02em]">{topic.name}</span><span className="mt-1 block text-xs text-zinc-500">{topic.count} questões · {topic.progress ? `${topic.progress}% concluído` : 'Ainda não iniciado'}</span></span><ChevronRight className="size-4 text-zinc-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-zinc-700" /></button>)}</div></div></div>
    </div></section>

    {questionOpen && <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8" aria-live="polite"><div className="animate-rise overflow-hidden rounded-[28px] border border-black/[0.07] bg-[#fcfcfb] shadow-[0_20px_60px_rgba(31,37,33,0.045)]"><div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4 sm:px-8"><div className="flex items-center gap-2 text-xs text-zinc-500"><Compass className="size-3.5" /> Cálculo II <ChevronRight className="size-3" /> {activeTopic}</div><span className="rounded-full bg-[#eef4ef] px-3 py-1 text-xs font-medium text-[#496553]">Questão 04</span></div><div className="p-5 sm:p-10"><p className="max-w-2xl text-xl font-medium leading-relaxed tracking-[-0.035em] sm:text-2xl">Calcule a integral indefinida abaixo.</p><p className="mt-8 font-serif text-3xl italic tracking-wide sm:text-4xl">∫ 2x · cos(x²) dx</p><div className="mt-10 grid max-w-2xl gap-2">{['sen(x²) + C', '2sen(x) + C', 'x²sen(x²) + C', '−2cos(x²) + C'].map((answer, index) => { const id = String.fromCharCode(65 + index); const chosen = selectedAnswer === id; return <button key={id} onClick={() => setSelectedAnswer(id)} className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200 ${chosen ? 'border-[#8fb59f] bg-[#eef6f0]' : 'border-black/[0.08] bg-white hover:border-black/20'}`}><span className={`grid size-6 place-items-center rounded-full text-xs ${chosen ? 'bg-[#5f8f71] text-white' : 'bg-[#f3f4f2] text-zinc-500'}`}>{id}</span>{answer}</button>; })}</div><div className="mt-10 flex flex-wrap items-center justify-between gap-4"><button className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-950"><CircleHelp className="size-4" /> Preciso de uma dica</button><button onClick={() => setSelectedAnswer(selectedAnswer || 'A')} className="inline-flex h-11 items-center gap-2 rounded-full bg-[#1e241f] px-5 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"><Check className="size-4" /> Responder</button></div></div></div></section>}
    <section id="progress" className="mx-auto max-w-6xl px-5 pb-16 pt-4 sm:px-8"><div className="flex items-center gap-3 text-sm text-zinc-500"><span className="grid size-8 place-items-center rounded-full bg-white"><Sparkles className="size-3.5" /></span> Um pouco por dia já faz diferença.</div></section>
    <nav aria-label="Navegação móvel" className="fixed inset-x-4 bottom-4 z-10 flex items-center justify-around rounded-2xl border border-black/[0.08] bg-white/90 p-1.5 shadow-[0_12px_40px_rgba(31,37,33,0.12)] backdrop-blur sm:hidden">
      {destinations.map((destination) => {
        const Icon = destination.icon;
        const isActive = activeDestination === destination.id;
        return (
          <a
            aria-current={isActive ? 'page' : undefined}
            className={`flex min-w-[78px] flex-col items-center gap-1 rounded-xl px-3 py-2 text-[11px] font-medium transition-colors ${isActive ? 'bg-[#eff4f0] text-[#26362d]' : 'text-zinc-500'}`}
            href={destination.href}
            key={destination.id}
            onClick={() => setActiveDestination(destination.id)}
          >
            <Icon aria-hidden="true" className="size-4" />
            {destination.label}
          </a>
        );
      })}
    </nav>
  </main>;
}
