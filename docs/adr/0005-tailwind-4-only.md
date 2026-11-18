# Papyrus UI supports Tailwind 4 only

Supersedes [ADR-0004](./0004-one-plugin-for-tailwind-3-and-4.md).

The peer range becomes `tailwindcss: ^4`, dropping `^3`. The plugin stays the same
JavaScript module Tailwind 4 already loads through `@plugin`; rewriting it in Tailwind 4's
CSS-first API (`@theme`, `@utility`) is a separate decision (#247). Dropping Tailwind 3
removes the parts of the plugin, theme and test suite that existed only to keep a compiler
nobody targets anymore working: the `tailwindcss3` dev dependency, `postcss`, and the
PostCSS-driven compile test, plus the `ringOffsetWidth.DEFAULT`, `ringOffsetColor.DEFAULT`
and `ringColor.DEFAULT` theme settings Tailwind 4 ignores. `ringWidth.DEFAULT` and
`ringColor.focus` stay, because Tailwind 4 reads both.

## Considered options

- **Keep `^3 || ^4` (status quo, ADR-0004).** Every theme and test change still has to be
  checked against two compilers whose defaults differ.
- **Rewrite the plugin in Tailwind 4's CSS-first API now.** Bundles an unrelated rewrite
  with the version drop; tracked separately as #247.

## Consequences

- Apps still on Tailwind 3 must upgrade to Tailwind 4 or stay on the last release that
  supports Tailwind 3.
- ADR-0001's Tailwind 3 `darkMode` setting (`darkMode: ['variant', …]`) no longer applies;
  only the Tailwind 4 `@custom-variant dark` setting remains.
- Dropping Tailwind 3's `require('papyrus-ui/plugin')` setup removes one of the reasons the
  plugin still ships CommonJS (#202).
