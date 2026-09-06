import katex from 'katex';

import { cn } from '@/lib/utils';

function renderMath(expression: string, displayMode: boolean) {
  return {
    __html: katex.renderToString(expression, {
      displayMode,
      output: 'html',
      strict: 'ignore',
      throwOnError: false,
      trust: false,
    }),
  };
}

/** Safely renders the inline `$...$` and block `$$...$$` syntax used by Arc content. */
export function MathContent({
  className,
  value,
}: {
  className?: string;
  value: string;
}) {
  const parts = value.split(/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g).filter(Boolean);

  return (
    <span className={cn('math-content', className)}>
      {parts.map((part, index) => {
        const isBlock = part.startsWith('$$') && part.endsWith('$$');
        const isInline = !isBlock && part.startsWith('$') && part.endsWith('$');
        if (!isBlock && !isInline)
          return <span key={`${part}-${index}`}>{part}</span>;
        const expression = part.slice(isBlock ? 2 : 1, isBlock ? -2 : -1);
        return isBlock ? (
          <span
            className="my-4 block overflow-x-auto"
            dangerouslySetInnerHTML={renderMath(expression, true)}
            key={`${part}-${index}`}
          />
        ) : (
          <span
            dangerouslySetInnerHTML={renderMath(expression, false)}
            key={`${part}-${index}`}
          />
        );
      })}
    </span>
  );
}
