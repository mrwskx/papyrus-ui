# Papyrus UI

A React UI kit whose components take every color, radius and shadow from design
tokens, so one set of components renders correctly in any theme.

## Tokens

**Base token**:
A named raw value from the Papyrus palette, such as one step of the cobalt scale. Components never use it directly.
_Avoid_: primitive, palette color, raw color

**Shared token**:
A token named by purpose that several components read, which must stay consistent across them (such as the primary fill or the input radius).
_Avoid_: semantic token, global token

**Component token**:
A token named after one component, for a value that apps are likely to change for that component everywhere.
_Avoid_: local token, component variable

**Instance override**:
New values for the tokens a component reads, set on one element so that only that element and its contents change.
_Avoid_: custom variant, inline theme

## Themes

**Theme**:
One complete set of values for every shared and component token. Papyrus UI has a light theme and a dark theme.
_Avoid_: color mode, skin

**Theme scope**:
The part of a page that renders in one theme: the whole page, which follows the system setting, or any element marked light or dark, together with its contents.
_Avoid_: theme wrapper, theme provider

## Brand

**Brand surface**:
A place that carries Papyrus UI's own identity, such as the logo, the docs welcome page or the README cover. Brand textures appear only here, never in components.
_Avoid_: marketing page, showcase
