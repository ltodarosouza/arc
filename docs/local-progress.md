# Arc — local learner progress

Until login exists, Arc saves the learner’s state only on the current browser and device.

## What is saved

- selected subject IDs;
- immutable question attempts;
- questions marked for redo;
- a schema version.

## What is not promised

- synchronisation across browsers or devices;
- backup or account recovery;
- transfer to another device.

The interface must describe this accurately until account support exists.

## Design

`LearnerRepository` is the stable application boundary. The current `LocalLearnerRepository` writes JSON to browser storage; a future authenticated repository can implement the same interface against the database planned in issue #58.

The key is versioned as `arc:learner-state`. Invalid, malformed, or unsupported-version records fail safely to an empty state rather than stopping the learner from studying. Future state versions need a deliberate migration before replacing this fallback.
