# Authentication

Arc uses Supabase email-and-password authentication. The browser only receives
the Supabase publishable key; data access remains controlled by Row Level
Security and the authenticated user ID.

## Product behaviour

- Visitors first see a concise sign-in screen.
- New learners can switch to account creation without leaving the screen.
- When email confirmation is enabled, the UI explains that the learner must
  confirm their email before signing in.
- The session is restored by Supabase on later visits.

## Supabase configuration

For each environment, configure **Authentication → URL Configuration**:

- set the Site URL to the environment's Arc URL;
- add that same URL to Redirect URLs.

Email confirmation is a product choice. It is enabled by default on hosted
Supabase projects and is recommended before inviting real learners. Production
email delivery needs a configured SMTP provider; the built-in sender is only
appropriate for early testing.

## Persisted study data

After authentication, selected subjects, attempts and items marked for review
are stored under the authenticated user in Supabase. The browser never selects
another user's records: Row Level Security enforces ownership in the database.

The local repository is only a development fallback when Supabase configuration
is absent; it is not a migration path for a deployed environment.
