# Arc — minimal design system

## Direction

Arc should feel calm, immediate, and academic without looking institutional. The interface uses warm neutral backgrounds, restrained sage accents, soft borders, and generous whitespace. Colour supports meaning; it is never decorative noise.

## Tokens

- **Surface:** off-white page, white cards, and subtle sage supporting surfaces.
- **Text:** near-black primary text and muted green-grey secondary text.
- **Accent:** soft green for the next action; dark green-black for decisive actions.
- **Feedback:** green for correct, warm red for incorrect, and amber for redo.
- **Corners:** pill buttons, soft controls, and 28px-style content cards.
- **Motion:** short lift/fade transitions only; respect reduced-motion preference.

## Reusable components

`components/arc-ui.tsx` defines:

- `ArcButton`: primary, accent, and quiet actions;
- `ArcCard`: the shared content surface;
- `AttemptStatusBadge`: the compact `Acertou`, `Errou`, and `Refazer` labels.

Future screens must use these primitives instead of recreating their own button, surface, or attempt-status styles.

## Accessibility

- Keyboard focus uses the shared high-contrast focus ring.
- Status badges always include text; colour is not the only signal.
- Motion is disabled for users who request reduced motion.
- Secondary text is reserved for supporting information, never for essential actions or answer feedback.
