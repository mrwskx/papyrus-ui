import { useId as useFallbackId } from 'react';

export function useId(customId?: string): string {
  const fallbackId = useFallbackId();
  // An empty customId must fall back too; id="" is not a usable anchor.
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  return customId || fallbackId;
}
