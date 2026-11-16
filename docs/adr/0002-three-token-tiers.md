# Three token tiers; components use only shared and component tokens

Base tokens are CSS variables named by hue (`--pp-cobalt-600`) and have no Tailwind
utilities. A component therefore cannot reach them, and apps keep Tailwind's own palette
for everything else. Shared tokens follow the pattern
`--pp-{bg|fg|border|ring|radius|shadow}-{role}[-muted][-{state}]`. Component tokens follow
`--pp-{component}[-{variant|part}]-{property}[-{state}]`. Both point at base tokens, with
different values per theme. Each is registered for one kind of utility only
(`backgroundColor`, `textColor`, `borderColor`, `ringColor`, `fill`, `borderRadius`,
`boxShadow`), so `text-muted` exists and `bg-muted` does not.

The sharing rule: if changing a value for one component alone would break the system's
consistency, the value is a shared token and nothing else. Button and InputBox radius, and
the primary fill, are examples. Otherwise a component token exists only where apps are
likely to change that component everywhere, and it points at a shared token by default.
One-off branding, such as a "Buy me a coffee" button, is an instance override of the
tokens the component reads, not a new token.

## Considered options

- **Keep the base scales as utilities under their old names (`bg-primary-600`).** Nothing
  breaks for apps, but their scale classes would not follow the theme, and components
  would need a lint rule to stay off them.
- **Component tokens for every component, as Material and Spectrum do.** This roughly
  triples the token count and makes breaking consistency the easy path.
- **Component tokens that point straight at base tokens.** Overrides stay independent, but
  each theme would have to remap every component token instead of only the shared ones.

## Consequences

- Removing the `primary-*`, `neutral-*` and other scale utilities is a breaking change
  (0.12.0).
- A token that points at another token resolves where it is declared. Every shared and
  component token is therefore declared again in each theme block, and an instance
  override must target the token the component itself reads.
- Tints and interaction states are their own tokens, tuned per theme, so components use no
  opacity modifiers.
