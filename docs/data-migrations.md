# Arc — data migration policy

## Principles

- Learner history is valuable. Never silently discard a known state version.
- A schema change is append-only: add a new migration instead of editing an applied migration.
- Application code must tolerate a missing or unavailable persistent store by showing a recoverable state, never by inventing progress.
- Production migrations are reviewed, committed, applied once, and recorded in Git before application code relies on them.

## Browser-state versions

The temporary browser state uses `version` in `LearnerState`.

| Version              | Meaning                                                    | Behaviour                                                                         |
| -------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `0`                  | Legacy shape using `selectedSubjects` and `redoQuestions`. | Converted to version 1 and saved again.                                           |
| `1`                  | Current shape.                                             | Read normally.                                                                    |
| Unknown or malformed | Not safely interpretable.                                  | Original raw value is backed up locally, then a clean version 1 state is created. |

This code lives in `lib/data/local-learner-repository.ts`. Browser state is transitional only; it may preserve a learner experience during rollout, but Supabase is the authoritative store for durable progress.

## Supabase schema migrations

- Every database change gets a new chronologically named SQL file in `supabase/migrations/`.
- An applied migration is immutable. Fixes use a new migration, never a rewrite of history.
- Migrations may include small, reviewed catalogue corrections when required by
  the MVP. They must never include credentials or ad-hoc changes to private
  learner data.
- Before applying, review indexes, constraints, RLS policies, and rollback implications.
- Apply the migration to a development project first, verify it, then apply the exact committed file to production.
- Record the applied migration in the related GitHub issue.

## Legacy local progress

The deployed MVP requires an e-mail account. Local browser state belongs only to
development fallback and must never silently replace remote data. If a future
import for pre-authentication data is introduced, it must be explicit,
idempotent, and leave the local copy intact until the remote write succeeds.

## Backups and recovery

- Database backup and point-in-time recovery are owned by the Supabase project configuration and must be reviewed before public launch.
- Database credentials stay outside Git.
- Browser backups are a short-term safety net only; they are not a user-facing backup system.
