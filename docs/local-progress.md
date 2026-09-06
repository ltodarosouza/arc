# Arc — local learner progress

When Supabase is not configured locally, Arc uses browser storage as a
development fallback. In configured environments, Supabase is authoritative
for the learner account, selected subjects, attempts, and redo list.

## What is saved

- selected subject IDs;
- immutable question attempts;
- questions marked for redo;
- a schema version.

## What the fallback does not promise

- synchronisation across browsers or devices;
- backup or account recovery;
- transfer to another device.

The interface must describe this accurately until account support exists.

## Design

`LearnerRepository` is the stable application boundary. `LocalLearnerRepository`
writes JSON to browser storage only for local development; the authenticated
Supabase repository implements the same boundary in configured environments.

The key is versioned as `arc:learner-state`. Invalid, malformed, or unsupported-version records fail safely to an empty state rather than stopping the learner from studying. Future state versions need a deliberate migration before replacing this fallback.
