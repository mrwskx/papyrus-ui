import type { RefObject } from 'react';

function getItems(menuRef: RefObject<HTMLElement>, getAllItems: boolean) {
  if (!menuRef.current) {
    return [];
  }

  const listRole = menuRef.current.getAttribute('role');
  const itemRole = listRole === 'tablist' ? 'tab' : 'menuitem';

  if (getAllItems) {
    const nodes = menuRef.current.querySelectorAll<HTMLElement>(
      `[role=${itemRole}]`,
    );

    return Array.from(nodes).filter(
      item => item.getAttribute('aria-disabled') !== 'true',
    );
  }

  return Array.from(menuRef.current.childNodes)
    .map(node => node.childNodes[0])
    .filter(
      node =>
        node instanceof Element &&
        node.getAttribute('role') === itemRole &&
        node.getAttribute('aria-disabled') !== 'true',
    ) as HTMLElement[];
}

export function getNextItem(
  menuRef: RefObject<HTMLElement>,
  current: HTMLElement,
  getAllItems = false,
): HTMLElement | undefined {
  const items = getItems(menuRef, getAllItems);
  const currIdx = items.findIndex(item => item === current);
  const nextIdx = currIdx === items.length - 1 ? 0 : currIdx + 1;
  return items[nextIdx];
}

export function getPrevItem(
  menuRef: RefObject<HTMLElement>,
  current: HTMLElement,
  getAllItems = false,
): HTMLElement | undefined {
  const items = getItems(menuRef, getAllItems);
  const currIdx = items.findIndex(item => item === current);
  const prevIdx = currIdx === 0 ? items.length - 1 : currIdx - 1;
  return items[prevIdx];
}

export function getFirstItem(
  menuRef: RefObject<HTMLElement>,
  getAllItems = false,
): HTMLElement | undefined {
  const items = getItems(menuRef, getAllItems);
  return items[0];
}

export function getLastItem(
  menuRef: RefObject<HTMLElement>,
  getAllItems = false,
): HTMLElement | undefined {
  const items = getItems(menuRef, getAllItems);
  return items[items.length - 1];
}
