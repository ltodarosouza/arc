'use client';

import { useEffect, useState, type CSSProperties } from 'react';

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
          {Array.from(token).map((char, charIndex) => {
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
  type Snapshot = { lines: Lines; italicLines: number[]; key: string };
  const [view, setView] = useState<{ cur: Snapshot; prev: Snapshot | null }>(
    () => ({ cur: { lines, italicLines, key: changeKey }, prev: null }),
  );
  const [everChanged, setEverChanged] = useState(false);

  useEffect(() => {
    if (view.cur.key === changeKey) return;
    setEverChanged(true);
    setView((shown) => ({
      cur: { lines, italicLines, key: changeKey },
      prev: shown.cur,
    }));
    const timer = window.setTimeout(
      () => setView((shown) => ({ cur: shown.cur, prev: null })),
      crossfadeMs,
    );
    return () => window.clearTimeout(timer);
  }, [changeKey, lines, italicLines, view.cur]);

  const { cur: current, prev: previous } = view;

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
        staggered={!everChanged}
      />
    </h1>
  );
}
