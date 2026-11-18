# Dark mode follows the system setting, and `.light`/`.dark` override it

The plugin declares every shared and component token in three blocks:
`:root, .light` with light values, then
`@media (prefers-color-scheme: dark) { :root:not(.light) }` and `.dark` with dark values,
each setting `color-scheme`. Components carry no `dark:` variants. The system setting is
the default so that statically generated sites render the right theme with no script and
no flash. A class-only strategy would need a blocking inline script in `<head>` just to
follow the system. The classes work at any depth, so a `.dark` section inside a light page
is its own theme scope. Portaled overlays copy the nearest `.light`/`.dark` class from the
element that opens them, so they stay in the same scope.

## Considered options

- **`.dark` class only.** This is the usual Tailwind convention, but following the system
  setting then needs JavaScript in `<head>`.
- **A configurable selector through `plugin.withOptions`.** This adds an option that has to
  keep working on both Tailwind versions. Tailwind 4 also keeps its dark-mode setting in
  CSS, where the plugin cannot read it.

## Consequences

- An app's own `dark:` utilities must match the library's rule. The Installation docs give
  the Tailwind 4 setting (`@custom-variant dark`). The Tailwind 3 setting
  (`darkMode: ['variant', …]`) no longer applies ([ADR-0005](./0005-tailwind-4-only.md)).
- A user's saved theme choice still needs a small inline `<head>` script, because CSS
  cannot read storage.
