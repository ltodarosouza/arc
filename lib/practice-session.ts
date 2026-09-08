const storagePrefix = 'arc:practice-session:';

export type PracticeSession = {
  questionIds: string[];
  returnPath: string;
};

function storageKey(id: string) {
  return `${storagePrefix}${id}`;
}

export function createPracticeSession(session: PracticeSession) {
  const id = crypto.randomUUID();
  window.sessionStorage.setItem(storageKey(id), JSON.stringify(session));
  return id;
}

export function getPracticeSession(id: string | null) {
  if (!id) return null;
  try {
    const value = window.sessionStorage.getItem(storageKey(id));
    if (!value) return null;
    const parsed = JSON.parse(value) as Partial<PracticeSession>;
    if (
      !Array.isArray(parsed.questionIds) ||
      !parsed.questionIds.every(
        (questionId) => typeof questionId === 'string',
      ) ||
      typeof parsed.returnPath !== 'string' ||
      !parsed.returnPath.startsWith('/questions')
    )
      return null;
    return { questionIds: parsed.questionIds, returnPath: parsed.returnPath };
  } catch {
    return null;
  }
}
