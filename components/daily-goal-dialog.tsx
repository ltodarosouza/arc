'use client';

import { Target } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArcButton } from '@/components/arc-ui';

const minGoal = 1;
const maxGoal = 200;

/**
 * Sets a daily question-count goal, kept on this device (see useDailyGoal).
 * Doubles as the trigger button so callers just drop it where the pill goes.
 */
export function DailyGoalDialog({
  dailyGoal,
  onChange,
}: {
  dailyGoal: number | null;
  onChange: (value: number | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(String(dailyGoal ?? 10));

  useEffect(() => {
    if (open) setDraft(String(dailyGoal ?? 10));
  }, [open, dailyGoal]);

  const parsed = Number(draft);
  const isValid =
    Number.isFinite(parsed) && parsed >= minGoal && parsed <= maxGoal;

  const save = () => {
    if (!isValid) return;
    onChange(Math.round(parsed));
    setOpen(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger
        className="inline-flex min-h-11 items-center gap-2 rounded-control border border-border px-5 text-sm font-medium text-muted-foreground transition-colors hover:border-accent-strong hover:text-foreground"
        type="button"
      >
        <Target aria-hidden="true" className="size-4" />
        {dailyGoal ? `Meta diária: ${dailyGoal}/dia` : 'Configurar meta diária'}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Meta diária</DialogTitle>
          <DialogDescription>
            Quantas questões você quer resolver por dia? Fica salvo só neste
            navegador.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-1.5">
          <Label htmlFor="daily-goal-input">Questões por dia</Label>
          <Input
            id="daily-goal-input"
            inputMode="numeric"
            max={maxGoal}
            min={minGoal}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') save();
            }}
            type="number"
            value={draft}
          />
          {!isValid && (
            <p className="text-xs text-error">
              Escolha um número entre {minGoal} e {maxGoal}.
            </p>
          )}
        </div>
        <DialogFooter className="items-center">
          {dailyGoal ? (
            <button
              className="arc-link mr-auto text-sm"
              onClick={() => {
                onChange(null);
                setOpen(false);
              }}
              type="button"
            >
              Remover meta
            </button>
          ) : null}
          <DialogClose
            className="min-h-11 rounded-control px-4 text-sm font-medium text-muted-foreground hover:text-foreground"
            type="button"
          >
            Cancelar
          </DialogClose>
          <ArcButton disabled={!isValid} onClick={save} type="button">
            Salvar
          </ArcButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
