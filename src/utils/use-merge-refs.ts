import type { ForwardedRef } from 'react';

export function useMergeRefs<T>(...refs: ForwardedRef<T>[]) {
  return (node: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref != null) {
        // eslint-disable-next-line no-param-reassign -- writing through the ref is the point
        ref.current = node;
      }
    });
  };
}
