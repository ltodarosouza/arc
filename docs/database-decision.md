# Database decision — Supabase Postgres

**Status:** accepted for the Arc MVP

## Decision

Arc uses Supabase Postgres as its persistent data store. The application uses the Supabase publishable key in browser code and protects all records with Row Level Security (RLS). No browser code receives a database password, service-role key, or other secret.

The initial migration is stored in `supabase/migrations/20260905120000_initial_arc_schema.sql` and has been applied to the project.

## Why Supabase

Arc needs more than a small content database. Its long-term core includes:

- shared relational content: subjects, taxonomy, questions, options, hints, solutions, and provenance;
- learner-owned records: selected subjects, attempts, and questions to redo;
- authentication and a safe migration from no-login use to persistent accounts;
- row-level isolation so one learner never reads another learner’s progress.

Supabase provides Postgres, built-in authentication, database migrations, and RLS in one managed service. This keeps the initial implementation focused on the learning experience rather than operating separate identity and database systems.

## Alternatives considered

### Cloudflare D1

D1 would fit a small SQLite-backed application hosted entirely in the Cloudflare ecosystem. It was not selected because Arc expects authentication, user-owned study history, relational reporting, and content workflows to become central. Supabase offers a more direct path to these features with Postgres and integrated authentication.

### Browser-only storage

Browser storage remains useful for non-authoritative preferences, but not as the source of truth for learner progress. It cannot provide reliable backup, cross-device use, or data recovery.

## Initial security model

- Published catalogue content is readable by visitors.
- Answer keys and full solutions are not directly readable from public tables.
- A secure database function records a multiple-choice attempt and returns only its outcome.
- A learner can request a solution only after an attempt exists.
- User-owned tables use RLS and `auth.uid()` so users can access only their records.
- Before email login exists, Arc uses Supabase anonymous sign-in. It creates an authenticated but non-identifying user record for the current browser.

Anonymous users retain server-side progress while their browser session persists. If they clear browser data or move devices before linking a login identity, recovery is not guaranteed; the interface must communicate this honestly.

## Cost and maintenance boundary

Supabase’s free tier is sufficient for early validation, but free projects can pause after inactivity. The product owner should review usage, backup needs, and paid-plan costs before public launch. Database migrations remain versioned in Git and are applied through the Supabase project, never constructed at runtime.

## Consequences

- The current local repository becomes a temporary fallback, not the authoritative store.
- The next data-layer work connects the catalogue and learner repository to Supabase.
- Introducing email/social login later links a persistent identity to the learner’s current anonymous identity instead of replacing their progress.
- Content administration needs a separate protected workflow; browser clients cannot publish or alter questions.
