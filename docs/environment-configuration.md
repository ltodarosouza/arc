# Arc — environment configuration

## Goal

Environment configuration must make it clear which values are safe to ship to a browser, which belong to a hosting environment, and which must never be committed.

The MVP has no authentication, external API, or database credentials. It therefore requires no secrets to run locally.

## Local setup

Copy `.env.example` to `.env.local` when local overrides are needed. `.env.local` is ignored by Git.

| Variable | Purpose | Browser-visible? | Default |
| --- | --- | --- | --- |
| `ARC_APP_ENV` | Identifies the execution environment for future diagnostics. | No | `development` |
| `ARC_SITE_ORIGIN` | Canonical app origin for server-side/build-time features. | No | `http://localhost:3000` |
| `VITE_ARC_APP_NAME` | Non-sensitive display name. | Yes | `Arc` |

Any variable prefixed with `VITE_` is available to browser code. It must never contain a secret, private identifier, credential, or user data.

## Configuration ownership

| Value type | Owner and location |
| --- | --- |
| Non-sensitive defaults | `.env.example`, reviewed in Git with the application source. |
| Developer-specific overrides | Each developer’s ignored `.env.local`. |
| Preview and production non-secrets | The hosting environment configuration, maintained by the project owner. |
| Credentials and secrets | Hosting secret store only; never Git, browser code, logs, issue bodies, or client-side variables. |

## Future variables

When Arc adds a database, authentication, analytics, or external services, each variable must be added deliberately with:

1. a documented purpose and owning service;
2. a decision on whether it is server-only or browser-visible;
3. a non-secret placeholder in `.env.example` only when a developer needs to know it exists;
4. a hosting-environment value managed outside the repository for every secret.

## Current constraint

The application must not depend on a secret or production-only value to render its initial multi-subject catalogue, question bank, or locally stored progress. This keeps the MVP runnable for contributors and test learners without an account or infrastructure setup.
