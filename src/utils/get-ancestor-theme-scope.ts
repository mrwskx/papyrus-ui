import type { VirtualElement } from '@floating-ui/react';

export type ThemeScope = 'light' | 'dark' | undefined;

// ADR-0001: a `.light`/`.dark` section is its own theme scope, and portaled
// overlays must copy the nearest one from the element that opened them.
export function getAncestorThemeScope(
  reference: Element | VirtualElement | null,
): ThemeScope {
  const element =
    reference instanceof Element ? reference : reference?.contextElement;

  const scoped = element?.closest('.light, .dark');

  if (!scoped) {
    return undefined;
  }

  return scoped.classList.contains('dark') ? 'dark' : 'light';
}
