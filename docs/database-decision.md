# Database decision — Supabase Postgres

**Status:** accepted for the Arc MVP

## Decision

Arc uses Supabase Postgres as its persistent data store. The application uses the Supabase publishable key in browser code and protects all records with Row Level Security (RLS). No browser code receives a database password, service-role key, or other secret.

The schema and catalogue changes are versioned in `supabase/migrations/` and
must be applied in chronological order.

## Why Supabase

Arc needs more than a small content database. Its long-term core includes:

- shared relational content: subjects, taxonomy, questions, options, hints, solutions, and provenance;
- learner-owned records: selected subjects, attempts, and questions to redo;
- email-and-password authentication with persistent cross-device accounts;
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
- Arc requires a verified Supabase e-mail session before it opens study areas.
  This makes account-bound progress available on another device after sign-in.

## Cost and maintenance boundary

Supabase’s free tier is sufficient for early validation, but free projects can pause after inactivity. The product owner should review usage, backup needs, and paid-plan costs before public launch. Database migrations remain versioned in Git and are applied through the Supabase project, never constructed at runtime.

## Consequences

- The current local repository becomes a temporary fallback, not the authoritative store.
- The catalogue and learner repository use Supabase in deployed environments.
- Local storage remains a development-only fallback, not a user migration path.
- Content administration needs a separate protected workflow; browser clients cannot publish or alter questions.
