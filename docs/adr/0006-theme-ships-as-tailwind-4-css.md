# The theme ships as Tailwind 4 CSS, not a JavaScript plugin

Supersedes [ADR-0003](./0003-token-values-are-full-css-colors.md)'s `<alpha-value>` wrapping.

The package exports `papyrus-ui/theme.css`. An app imports it after `@import 'tailwindcss'`
and needs no other setup: no `@plugin`, `@custom-variant` or `@source` line. The stylesheet
declares every theme value as a Tailwind 4 theme variable (`@theme`), every component class
as an `@utility` of the same name and output, the base rules in `@layer base`, the `dark`
variant from [ADR-0001](./0001-dark-mode-follows-system-with-class-override.md) as a
`@custom-variant`, and an `@source` for the package's own build output. The `papyrus-ui/plugin`
entry, written against Tailwind 3's plugin API and run through Tailwind 4's compatibility
layer ([ADR-0004](./0004-one-plugin-for-tailwind-3-and-4.md)), is gone.

ADR-0002's registration keys map to Tailwind 4's per-property color namespaces where its
sharing rule limits a token to one kind of utility: `--background-color-*`, `--text-color-*`,
`--border-color-*`, `--ring-color-*` and `--fill-*`. Today's color scales
(`primary`, `info`, `success`, `warning`, `danger`, `neutral`) are read by every one of these
utility kinds already, so they stay on the generic `--color-*` namespace; the per-property
namespaces apply once a token is scoped to a single kind, as the future base/shared/component
tiers (#226, #227) will be.

ADR-0003 wrapped every color in `color-mix(in srgb, var(--pp-…) calc(<alpha-value> * 100%),
transparent)` because Tailwind 3 silently drops opacity modifiers on plain `var()` colors.
Tailwind 4 reads a color registered as a theme variable and applies `/50` itself, emitting its
own `color-mix` with a plain-`var()` fallback for browsers without `color-mix` support. A token
declared as a CSS custom property keeps opacity modifiers and hex/`oklch()` overrides with no
wrapping required.

## Considered options

- **Keep the JavaScript plugin, drop only the Tailwind 3 compatibility shim.** Tailwind 4
  still runs it through the same compatibility layer that ignores `ringColor.DEFAULT` and
  inlines theme values instead of emitting CSS variables, so overriding a token still needs a
  JavaScript theme merge rather than a CSS variable override.
- **Per-property color namespaces for every token now.** This is the three-tier design ADR-0002
  and ADR-0003 already describe, but migrating today's color scales onto it is a theme-value
  and component change, out of scope here and tracked separately (#226, #227, #228–#231).

## Consequences

- `@source` is resolved relative to the stylesheet that declares it, not the importing app's
  file, so shipping it inside `theme.css` finds the package's own build output regardless of
  where the app installs its dependencies.
- A missing `@source` target (e.g. compiling `src/theme.css` directly, before `pnpm build` has
  produced `dist/es`) resolves to no extra candidates rather than an error.
- Component classes built with `@apply` and colors read through `@theme` now render as
  `var(--color-…)` references rather than inlined hex, which is the opposite of ADR-0003's
  wrapping: apps can override a token and see every utility reading it follow, without a
  rebuild.
