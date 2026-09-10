import { SlidersHorizontal, X } from 'lucide-react';

import { ArcCard } from '@/components/arc-ui';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { QuestionStatusFilter } from '@/lib/domain/question-filtering';
import type { Difficulty } from '@/lib/domain/questions';
import type { TaxonomyNode } from '@/lib/domain/taxonomy';

const selectTriggerClass =
  'arc-filter-control min-h-11 w-full rounded-xl border-border px-3 text-sm font-medium shadow-none transition-colors duration-200 hover:border-accent-strong focus:border-ring';
const selectContentClass =
  'rounded-2xl border-border bg-surface p-1.5 shadow-float';
const selectItemClass =
  'min-h-10 rounded-xl px-3 py-2 text-sm text-foreground data-highlighted:bg-accent data-highlighted:text-foreground';

const difficultyOptions = [
  { id: 'easy', label: 'Fácil' },
  { id: 'medium', label: 'Média' },
  { id: 'hard', label: 'Difícil' },
] as const;

const statusOptions = [
  { id: 'all', label: 'Todas' },
  { id: 'not_attempted', label: 'Não feitas' },
  { id: 'attempted', label: 'Feitas' },
  { id: 'correct', label: 'Acertadas' },
  { id: 'incorrect', label: 'Erradas' },
  { id: 'redo', label: 'Refazer' },
] as const;

const difficultyLabel: Record<Difficulty, string> = {
  easy: 'Fácil',
  medium: 'Média',
  hard: 'Difícil',
};

const statusChipLabel: Record<Exclude<QuestionStatusFilter, 'all'>, string> = {
  not_attempted: 'Não feitas',
  attempted: 'Feitas',
  correct: 'Acertadas',
  incorrect: 'Erradas',
  redo: 'Refazer',
};

const chipButtonClass = (selected: boolean) =>
  `rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
    selected
      ? 'bg-primary text-primary-foreground'
      : 'bg-surface text-muted-foreground hover:bg-accent hover:text-foreground'
  }`;

export function QuestionFilters({
  units,
  topics,
  unitId,
  topicId,
  selectedDifficulties,
  selectedStatus,
  activeFilters,
  onSelectUnit,
  onSelectTopic,
  onToggleDifficulty,
  onSelectStatus,
  onClearFilter,
  onClearAll,
}: {
  units: TaxonomyNode[];
  topics: TaxonomyNode[];
  unitId: string | null;
  topicId: string | null;
  selectedDifficulties: Difficulty[];
  selectedStatus: QuestionStatusFilter;
  activeFilters: TaxonomyNode[];
  onSelectUnit: (value: string) => void;
  onSelectTopic: (value: string) => void;
  onToggleDifficulty: (difficulty: Difficulty) => void;
  onSelectStatus: (status: QuestionStatusFilter) => void;
  onClearFilter: (kind: 'unit' | 'topic') => void;
  onClearAll: () => void;
}) {
  const hasActiveFilters =
    activeFilters.length > 0 ||
    selectedDifficulties.length > 0 ||
    selectedStatus !== 'all';

  return (
    <ArcCard className="arc-panel mt-8 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-accent-strong" />
          <p className="text-sm font-medium">Filtrar questões</p>
        </div>
        {hasActiveFilters && (
          <button
            className="text-xs font-medium text-accent-strong hover:underline"
            onClick={onClearAll}
            type="button"
          >
            Limpar filtros
          </button>
        )}
      </div>
      <div className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
        <div className="grid gap-1.5 text-xs font-medium text-muted-foreground">
          Assunto
          <Select
            onValueChange={(value) => onSelectUnit(value ?? '')}
            value={unitId}
          >
            <SelectTrigger aria-label="Assunto" className={selectTriggerClass}>
              <SelectValue placeholder="Todas">
                {units.find((unit) => unit.id === unitId)?.name ?? 'Todas'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className={selectContentClass}>
              <SelectItem className={selectItemClass} value={null}>
                Todas
              </SelectItem>
              {units.map((unit) => (
                <SelectItem
                  className={selectItemClass}
                  key={unit.id}
                  value={unit.id}
                >
                  {unit.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-1.5 text-xs font-medium text-muted-foreground">
          Subassunto
          <Select
            disabled={!topics.length}
            onValueChange={(value) => onSelectTopic(value ?? '')}
            value={topicId}
          >
            <SelectTrigger
              aria-label="Subassunto"
              className={selectTriggerClass}
            >
              <SelectValue placeholder="Todos">
                {topics.find((topic) => topic.id === topicId)?.name ?? 'Todos'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className={selectContentClass}>
              <SelectItem className={selectItemClass} value={null}>
                Todos
              </SelectItem>
              {topics.map((topic) => (
                <SelectItem
                  className={selectItemClass}
                  key={topic.id}
                  value={topic.id}
                >
                  {topic.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <fieldset>
          <legend className="text-xs font-medium text-muted-foreground">
            Dificuldade
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {difficultyOptions.map((difficulty) => {
              const selected = selectedDifficulties.includes(difficulty.id);
              return (
                <button
                  aria-pressed={selected}
                  className={chipButtonClass(selected)}
                  key={difficulty.id}
                  onClick={() => onToggleDifficulty(difficulty.id)}
                  type="button"
                >
                  {difficulty.label}
                </button>
              );
            })}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-xs font-medium text-muted-foreground">
            Status
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {statusOptions.map((status) => {
              const selected = selectedStatus === status.id;
              return (
                <button
                  aria-pressed={selected}
                  className={chipButtonClass(selected)}
                  key={status.id}
                  onClick={() => onSelectStatus(status.id)}
                  type="button"
                >
                  {status.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Aplicados:</span>
          {activeFilters.map((filter) => (
            <button
              className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-foreground"
              key={filter.id}
              onClick={() => {
                if (filter.kind !== 'subtopic') onClearFilter(filter.kind);
              }}
            >
              {filter.name}
              <X className="size-3" />
            </button>
          ))}
          {selectedDifficulties.map((difficulty) => (
            <button
              className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-foreground"
              key={difficulty}
              onClick={() => onToggleDifficulty(difficulty)}
            >
              {difficultyLabel[difficulty]}
              <X className="size-3" />
            </button>
          ))}
          {selectedStatus !== 'all' && (
            <button
              className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-foreground"
              onClick={() => onSelectStatus('all')}
            >
              {statusChipLabel[selectedStatus]}
              <X className="size-3" />
            </button>
          )}
        </div>
      )}
    </ArcCard>
  );
}
