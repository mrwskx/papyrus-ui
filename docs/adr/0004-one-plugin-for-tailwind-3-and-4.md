# One JavaScript plugin serves Tailwind 3 and Tailwind 4

The package keeps the peer range `tailwindcss: ^3 || ^4` and ships one JavaScript plugin.
Tailwind 3 loads it with `plugins: [require('papyrus-ui/plugin')]`, and Tailwind 4 with
`@plugin "papyrus-ui/plugin"`. Tailwind 4 loads a Tailwind 3-style plugin unchanged,
including theme extensions, `@apply` inside component classes and `<alpha-value>`, so one
source covers both versions. CI compiles a test project on each version, so neither
version goes untested.

## Considered options

- **Tailwind 3 only, removing `^4`.** The least work, but the peer range already promised
  Tailwind 4.
- **Tailwind 4's CSS-based `@theme`.** Native to Tailwind 4, but Tailwind 3 would then need
  a second, separate setup.

## Consequences

- Tailwind 4 ignores `ringColor.DEFAULT`, so focus rings use an explicit `ring-focus` token
  instead of Tailwind's default ring color.
- The plugin cannot read Tailwind 4's dark-mode setting. This is one reason dark mode
  follows its own rule instead of the app's configuration (ADR-0001).
- `presets: [require('papyrus-ui/plugin')]` produces no styles on either version, so the
  docs show only `plugins` and `@plugin`.
