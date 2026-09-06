# Arc — environment configuration

## Goal

Environment configuration must make it clear which values are safe to ship to a browser, which belong to a hosting environment, and which must never be committed.

The application uses Supabase authentication and a durable data store. It still
does not require any _secret_ value in browser code.

## Local setup

Copy `.env.example` to `.env.local` when local overrides are needed. `.env.local` is ignored by Git.

| Variable                               | Purpose                                                      | Browser-visible? | Default                 |
| -------------------------------------- | ------------------------------------------------------------ | ---------------- | ----------------------- |
| `ARC_APP_ENV`                          | Identifies the execution environment for future diagnostics. | No               | `development`           |
| `ARC_SITE_ORIGIN`                      | Canonical app origin for server-side/build-time features.    | No               | `http://localhost:3000` |
| `NEXT_PUBLIC_ARC_APP_NAME`             | Non-sensitive display name.                                  | Yes              | `Arc`                   |
| `NEXT_PUBLIC_SITE_URL`                 | Canonical public Arc URL for metadata.                       | Yes              | `http://localhost:3000` |
| `NEXT_PUBLIC_SUPABASE_URL`             | Supabase project URL.                                        | Yes              | Unset: local fallback   |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable client key.                             | Yes              | Unset: local fallback   |

Any variable prefixed with `NEXT_PUBLIC_` is available to browser code. It must never contain a secret, private identifier, credential, or user data.

## Configuration ownership

| Value type                         | Owner and location                                                                                |
| ---------------------------------- | ------------------------------------------------------------------------------------------------- |
| Non-sensitive defaults             | `.env.example`, reviewed in Git with the application source.                                      |
| Developer-specific overrides       | Each developer’s ignored `.env.local`.                                                            |
| Preview and production non-secrets | The hosting environment configuration, maintained by the project owner.                           |
| Credentials and secrets            | Hosting secret store only; never Git, browser code, logs, issue bodies, or client-side variables. |

## Future variables

When Arc adds analytics or external services, each variable must be added deliberately with:

1. a documented purpose and owning service;
2. a decision on whether it is server-only or browser-visible;
3. a non-secret placeholder in `.env.example` only when a developer needs to know it exists;
4. a hosting-environment value managed outside the repository for every secret.

## Current constraint

With both Supabase public values unset, the application deliberately uses the
local development fallback. A deployed environment must configure both values
so login and learner progress are durable.
