# Arc — Supabase setup

Arc uses Supabase Postgres for durable data and Supabase Auth anonymous users for learner progress before email login exists.

## 1. Apply the schema

1. In the Supabase project dashboard, open **SQL Editor**.
2. Create a new query.
3. Copy the complete contents of `supabase/migrations/20260905120000_initial_arc_schema.sql`.
4. Run it once.

This creates the academic catalogue tables, private learner-progress tables, database indexes, Row Level Security policies, and the secure functions that grade an answer and record an attempt.

## 2. Enable anonymous sign-ins

In **Authentication → Providers / General configuration**, enable **Anonymous sign-ins**.

This does not ask the learner for email or password. It gives the current browser a private Supabase identity so attempts and selected subjects are stored on the server and can be protected by Row Level Security. The user can later link an email or other login method to that identity.

Anonymous identity is intentionally not the same as the public publishable key. The publishable key only identifies the project; the database policies determine which records a browser may read or write.

## 3. Configure the application

Add these public values to `.env.local`:

```text
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Never put the database password, `service_role`, or a secret key in `.env.local` for browser code, Git, or this document.

## 4. Verification

After running the migration, the Table Editor should show tables including `subjects`, `questions`, `question_attempts`, `user_subjects`, and `redo_questions`.

The next implementation step will connect the catalog and learner repository to these tables. Until then, the local development fixtures remain the active visual data source.
