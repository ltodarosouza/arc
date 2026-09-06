# Arc — feedback states

The learner should always understand what happened and what to do next. Empty and error states are part of the study flow, not a technical afterthought.

## Shared rules

- Use a quiet, generous surface with one clear message and one relevant action.
- Explain the situation in learner language, never in technical error language.
- Do not use a destructive visual treatment for ordinary empty results.
- Keep the primary action close to the explanation.
- Loading states use lightweight skeletons or a calm pulse; they never block the entire application unnecessarily.

## Required states by area

### Início

| Situation                           | Message                                            | Primary action         |
| ----------------------------------- | -------------------------------------------------- | ---------------------- |
| No selected subjects                | “Escolha suas disciplinas”                         | Open subject selection |
| Selected subject has no content yet | “Estamos preparando questões para esta disciplina” | Choose another subject |

### Explorar

| Situation                          | Message                                  | Primary action          |
| ---------------------------------- | ---------------------------------------- | ----------------------- |
| Filter has no results              | “Nenhuma questão encontrada”             | Clear filters           |
| Subject has no published questions | “Ainda não há questões disponíveis”      | Return to subjects      |
| Question cannot be loaded          | “Esta questão não está disponível agora” | Return to question bank |

### Progresso

| Situation              | Message                                     | Primary action        |
| ---------------------- | ------------------------------------------- | --------------------- |
| No completed attempts  | “Seu progresso começa na primeira questão”  | Practise a question   |
| No incorrect questions | “Você não tem erros para revisar agora”     | Explore all questions |
| No redo questions      | “Nenhuma questão está marcada para refazer” | Explore a subject     |

## Error recovery

An unavailable question, failed content load, or malformed local record must preserve the learner’s route back to a usable question-bank view. It must never erase valid local attempt history as part of recovery.

## Implementation

`components/feedback-state.tsx` provides the shared visual primitive and specific states for subject selection, no search results, unavailable questions, and no progress. Each consuming screen owns the action itself, so it can route the learner to the correct next step.
