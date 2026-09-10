'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const saved = window.localStorage.getItem('arc-theme');
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    (notify) => {
      window.addEventListener('arc-themechange', notify);
      return () => window.removeEventListener('arc-themechange', notify);
    },
    () =>
      document.documentElement.classList.contains('dark') ? 'dark' : 'light',
    () => 'light',
  );

  useEffect(() => {
    const initialTheme = getInitialTheme();
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    window.dispatchEvent(new Event('arc-themechange'));
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    window.localStorage.setItem('arc-theme', nextTheme);
    window.dispatchEvent(new Event('arc-themechange'));
  };

  const isDark = theme === 'dark';
  return (
    <button
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      aria-pressed={isDark}
      className="grid size-11 place-items-center rounded-full text-[var(--arc-text-muted)] transition-[background-color,color,transform] duration-200 hover:bg-[var(--arc-accent)] hover:text-[var(--foreground)] active:scale-95"
      onClick={toggleTheme}
      type="button"
    >
      {isDark ? (
        <Sun aria-hidden="true" className="size-4" />
      ) : (
        <Moon aria-hidden="true" className="size-4" />
      )}
    </button>
  );
}
