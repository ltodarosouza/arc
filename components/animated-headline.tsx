'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

import { cn } from '@/lib/utils';

/** A run of text, optionally rendered in the accent colour. */
export type HeadlinePart = string | { accent: string };

type Lines = HeadlinePart[][];

const letterStep = 22;
const maxStaggeredLetters = 44;
const crossfadeMs = 320;

function renderLine(
  line: HeadlinePart[],
  staggered: boolean,
  start: { i: number },
) {
  return line.map((part, partIndex) => {
    const text = typeof part === 'string' ? part : part.accent;
    const accent = typeof part !== 'string';
    // Split on whitespace so whole words stay unbreakable but the line still wraps.
    return text.split(/(\s+)/).map((token, tokenIndex) => {
      if (/^\s+$/.test(token) || token === '')
        return <span key={`${partIndex}-${tokenIndex}`}>{token}</span>;
      return (
        <span
          className={cn('arc-hl-word', accent && 'text-accent-strong')}
          key={`${partIndex}-${tokenIndex}`}
        >
          {[...token].map((char, charIndex) => {
            const delay = staggered
              ? Math.min(start.i, maxStaggeredLetters) * letterStep
              : 0;
            start.i += 1;
            return (
              <span
                className="arc-hl-letter"
                key={charIndex}
                style={{ animationDelay: `${delay}ms` }}
              >
                {char}
              </span>
            );
          })}
        </span>
      );
    });
  });
}

function Layer({
  lines,
  italicLines,
  staggered,
  out,
}: {
  lines: Lines;
  italicLines: number[];
  staggered: boolean;
  out?: boolean;
}) {
  const counter = { i: 0 };
  return (
    <span
      aria-hidden={out ? 'true' : undefined}
      className={cn('arc-headline-layer', out && 'is-out')}
    >
      {lines.map((line, lineIndex) => (
        <span
          key={lineIndex}
          style={
            italicLines.includes(lineIndex)
              ? ({ fontStyle: 'italic' } as CSSProperties)
              : undefined
          }
        >
          {renderLine(line, staggered, counter)}
        </span>
      ))}
    </span>
  );
}

/**
 * The home headline. Letters assemble with a staggered blur-rise the first time
 * it appears; when `changeKey` changes it cross-fades to the new copy instead of
 * swapping instantly.
 */
export function AnimatedHeadline({
  lines,
  changeKey,
  italicLines = [],
  className,
}: {
  lines: Lines;
  changeKey: string;
  italicLines?: number[];
  className?: string;
}) {
  const firstMount = useRef(true);
  const [current, setCurrent] = useState({
    lines,
    italicLines,
    key: changeKey,
  });
  const [previous, setPrevious] = useState<{
    lines: Lines;
    italicLines: number[];
    key: string;
  } | null>(null);

  useEffect(() => {
    if (changeKey === current.key) return;
    setPrevious(current);
    setCurrent({ lines, italicLines, key: changeKey });
    firstMount.current = false;
    const timer = window.setTimeout(() => setPrevious(null), crossfadeMs);
    return () => window.clearTimeout(timer);
    // Only react to an identity change of the copy, tracked by changeKey.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeKey]);

  return (
    <h1 className={cn('arc-hero-headline arc-headline-stack', className)}>
      {previous ? (
        <Layer
          italicLines={previous.italicLines}
          key={previous.key}
          lines={previous.lines}
          out
          staggered={false}
        />
      ) : null}
      <Layer
        italicLines={current.italicLines}
        key={current.key}
        lines={current.lines}
        staggered={firstMount.current}
      />
    </h1>
  );
}
