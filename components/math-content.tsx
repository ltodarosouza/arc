import katex from 'katex';
import { normalizeLegacyMath } from '@/lib/domain/math';

import { cn } from '@/lib/utils';

function renderMath(expression: string, displayMode: boolean) {
  return {
    __html: katex.renderToString(normalizeLegacyMath(expression), {
      displayMode,
      output: 'html',
      strict: 'ignore',
      throwOnError: false,
      trust: false,
      macros: { '\\sen': '\\sin' },
    }),
  };
}

function QuestionDiagram({ name }: { name: string }) {
  const common = {
    className:
      'my-4 block max-w-full rounded-xl border border-border bg-surface-subtle p-3 text-foreground',
    viewBox: '0 0 360 104',
  };
  if (name === 'flip-flop-d')
    return (
      <svg aria-label="Diagrama de um flip-flop D" role="img" {...common}>
        <path
          d="M20 48h80M260 48h80M60 84h80"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          fill="none"
          height="64"
          rx="8"
          stroke="currentColor"
          strokeWidth="2"
          width="160"
          x="100"
          y="20"
        />
        <path d="m100 72 12-8v16z" fill="currentColor" />
        <text fontSize="17" x="75" y="53">
          D
        </text>
        <text fontSize="17" x="270" y="53">
          Q
        </text>
        <text fontSize="17" x="28" y="89">
          CLK
        </text>
        <text fontSize="22" fontWeight="600" x="169" y="59">
          D
        </text>
      </svg>
    );
  if (name === 'latch-sr')
    return (
      <svg aria-label="Diagrama lógico de um latch SR" role="img" {...common}>
        <path
          d="M20 30h92M20 74h92M240 30h100M240 74h100M208 44h32v30h-32"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          fill="none"
          height="36"
          rx="7"
          stroke="currentColor"
          strokeWidth="2"
          width="96"
          x="112"
          y="18"
        />
        <rect
          fill="none"
          height="36"
          rx="7"
          stroke="currentColor"
          strokeWidth="2"
          width="96"
          x="112"
          y="56"
        />
        <text fontSize="16" x="49" y="35">
          S
        </text>
        <text fontSize="16" x="49" y="79">
          R
        </text>
        <text fontSize="15" x="150" y="42">
          NOR
        </text>
        <text fontSize="15" x="150" y="80">
          NOR
        </text>
        <text fontSize="16" x="284" y="35">
          Q
        </text>
        <text fontSize="16" x="278" y="79">
          Q̄
        </text>
      </svg>
    );
  return (
    <svg
      aria-label="Diagrama de um registrador de deslocamento"
      role="img"
      {...common}
    >
      <path
        d="M18 52h34m86 0h30m86 0h30m58 0h18M95 18v68m116-68v68m116-68v68"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      {[52, 168, 284].map((x, index) => (
        <rect
          fill="none"
          height="62"
          key={x}
          rx="8"
          stroke="currentColor"
          strokeWidth="2"
          width="86"
          x={x}
          y="21"
        />
      ))}
      <text fontSize="14" x="22" y="43">
        entrada
      </text>
      <text fontSize="16" x="82" y="57">
        D₀
      </text>
      <text fontSize="16" x="198" y="57">
        D₁
      </text>
      <text fontSize="16" x="314" y="57">
        D₂
      </text>
      <text fontSize="14" x="286" y="101">
        clock
      </text>
    </svg>
  );
}

/** Safely renders the inline `$...$` and block `$$...$$` syntax used by Arc content. */
export function MathContent({
  className,
  value,
}: {
  className?: string;
  value: string;
}) {
  const parts = value
    .split(/(\[\[diagram:[a-z-]+\]\]|\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g)
    .filter(Boolean);

  return (
    <span className={cn('math-content', className)}>
      {parts.map((part, index) => {
        const diagram = part.match(/^\[\[diagram:([a-z-]+)\]\]$/)?.[1];
        if (diagram)
          return <QuestionDiagram key={`${part}-${index}`} name={diagram} />;
        const isBlock = part.startsWith('$$') && part.endsWith('$$');
        const isInline = !isBlock && part.startsWith('$') && part.endsWith('$');
        if (!isBlock && !isInline)
          return <span key={`${part}-${index}`}>{part}</span>;
        const expression = part.slice(isBlock ? 2 : 1, isBlock ? -2 : -1);
        return isBlock ? (
          <span
            className="my-4 block overflow-x-auto py-1"
            dangerouslySetInnerHTML={renderMath(expression, true)}
            key={`${part}-${index}`}
          />
        ) : (
          <span
            className="inline-block max-w-full align-middle"
            dangerouslySetInnerHTML={renderMath(expression, false)}
            key={`${part}-${index}`}
          />
        );
      })}
    </span>
  );
}
