# Token values are full CSS colors, and utilities wrap them in `color-mix`

Every color token holds a complete CSS color. Each Tailwind color is registered as
`color-mix(in srgb, var(--pp-…) calc(<alpha-value> * 100%), transparent)`. Opacity
modifiers such as `bg-primary/50` keep working on both Tailwind 3 and 4, and apps can
override a token with any CSS color, such as `#ffdd00` or `oklch(…)`. The usual Tailwind 3
pattern stores bare channels for `rgb(var(--x) / <alpha-value>)`, and with it a hex
override silently renders transparent.

## Considered options

- **Bare channels.** These work in the widest range of browsers, but overrides must be
  written as `255 221 0`.
- **Plain `var(--x)`.** The simplest option, but Tailwind 3 silently stops generating
  opacity modifiers for these colors.
- **Colors defined as functions (`({ opacityValue }) => …`).** Tailwind 4 ignores them.

## Consequences

- The lowest supported browsers become those with `color-mix`: Chrome and Edge 111,
  Safari 16.2 and Firefox 113. Tailwind 4 output adds a plain `var()` fallback for older
  browsers; Tailwind 3 output has none.
