'use client';

import { useEffect, useRef, useState } from 'react';

import type { QuestionAttempt } from '@/lib/domain/questions';
import { getProgressTimeline } from '@/lib/domain/progress';

const dateLabel = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  });

export function ProgressChart({ attempts }: { attempts: QuestionAttempt[] }) {
  const days = getProgressTimeline(attempts);
  const chartRef = useRef<SVGSVGElement>(null);
  const [isDrawn, setIsDrawn] = useState(false);
  const [activeDate, setActiveDate] = useState<string | null>(null);
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsDrawn(true);
      return;
    }
    let drawTimer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        // Let the empty chart paint once before drawing its history.
        drawTimer = window.setTimeout(() => setIsDrawn(true), 380);
      },
      { threshold: 0.18 },
    );
    observer.observe(chart);
    return () => {
      observer.disconnect();
      if (drawTimer) window.clearTimeout(drawTimer);
    };
  }, []);
  if (!days.length) return null;
  const firstTime = Date.parse(days[0].date);
  const span = Date.parse(days.at(-1)!.date) - firstTime;
  const x = (date: string) =>
    span ? 48 + ((Date.parse(date) - firstTime) / span) * 584 : 340;
  const y = (value: number) => 160 - value * 1.3;
  const points = days
    .map((day) => `${x(day.date)},${y(day.accuracy)}`)
    .join(' ');
  const activeDay = days.find((day) => day.date === activeDate) ?? null;
  return (
    <section
      className="arc-section border-y border-border py-6"
      aria-labelledby="evolution-title"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="arc-section-title" id="evolution-title">
          Evolução do aproveitamento
        </h2>
        <p className="arc-caption">Até 14 dias com atividade</p>
      </div>
      <p className="arc-caption mt-1">
        Resultado acumulado ao fim de cada dia · horário de Brasília.
      </p>
      <svg
        ref={chartRef}
        viewBox="0 0 680 200"
        className="arc-progress-chart mt-5 max-h-64 w-full"
        data-drawn={isDrawn}
        role="img"
        aria-label={`Aproveitamento acumulado: ${days.map((day) => `${dateLabel(day.date)}, ${day.accuracy}% em ${day.answered} questões`).join('; ')}.`}
      >
        {[0, 50, 100].map((value) => (
          <g key={value}>
            <line
              x1="48"
              x2="632"
              y1={y(value)}
              y2={y(value)}
              stroke="var(--border)"
              strokeDasharray="3 5"
            />
            <text
              x="2"
              y={y(value) + 4}
              fill="var(--arc-text-muted)"
              fontSize="12"
            >
              {value}%
            </text>
          </g>
        ))}
        {days.length > 1 && (
          <polyline
            className="arc-progress-chart-line"
            pathLength="100"
            points={points}
            fill="none"
            stroke="var(--arc-accent-strong)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        )}
        {days.map((day) => (
          <circle
            className="arc-progress-chart-dot"
            key={day.date}
            cx={x(day.date)}
            cy={y(day.accuracy)}
            r="4"
            fill="var(--primary)"
            stroke="var(--background)"
            strokeWidth="2"
            tabIndex={0}
            onBlur={() => setActiveDate(null)}
            onClick={() => setActiveDate(day.date)}
            onFocus={() => setActiveDate(day.date)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setActiveDate(day.date);
              }
            }}
            onMouseEnter={() => setActiveDate(day.date)}
            onMouseLeave={() => setActiveDate(null)}
          >
            <title>
              {dateLabel(day.date)}: {day.correct} acertos em {day.answered}{' '}
              questões ({day.accuracy}%)
            </title>
          </circle>
        ))}
        <text
          x={days.length === 1 ? 340 : 48}
          y="190"
          textAnchor={days.length === 1 ? 'middle' : 'start'}
          fill="var(--arc-text-muted)"
          fontSize="12"
        >
          {dateLabel(days[0].date)}
        </text>
        {days.length > 1 && (
          <text
            x="632"
            y="190"
            textAnchor="end"
            fill="var(--arc-text-muted)"
            fontSize="12"
          >
            {dateLabel(days.at(-1)!.date)}
          </text>
        )}
      </svg>
      <p
        aria-live="polite"
        className="mt-2 min-h-6 text-sm text-muted-foreground"
      >
        {activeDay
          ? `${dateLabel(activeDay.date)} · ${activeDay.correct} ${activeDay.correct === 1 ? 'acerto' : 'acertos'} em ${activeDay.answered} ${activeDay.answered === 1 ? 'questão' : 'questões'} · ${activeDay.accuracy}% de aproveitamento`
          : 'Passe o cursor sobre um ponto para ver os detalhes.'}
      </p>
      {days.length === 1 && (
        <p className="arc-caption">
          Seu primeiro registro. A evolução aparece conforme você pratica em
          outros dias.
        </p>
      )}
      <details className="arc-disclosure mt-2 text-sm">
        <summary className="arc-link inline-flex min-h-11 items-center">
          Ver registros do gráfico
        </summary>
        <ul className="disclosure-content divide-y divide-border">
          {days.map((day) => (
            <li
              key={day.date}
              className="flex flex-wrap justify-between gap-2 py-2"
            >
              <span>{dateLabel(day.date)}</span>
              <span className="arc-caption">
                {day.correct} acertos / {day.answered} questões · {day.accuracy}
                %
              </span>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
