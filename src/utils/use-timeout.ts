import { useCallback, useEffect, useRef } from 'react';

export type TimeoutKey = number | string | undefined;

export interface TimeoutAPI {
  clearTimeout: (key?: TimeoutKey) => void;
  clearTimeouts: () => void;
  setTimeout: (
    fn: () => void | Promise<void>,
    timeout?: number,
    key?: TimeoutKey,
  ) => void;
}

export function useTimeout(): TimeoutAPI {
  const timeouts = useRef<Map<TimeoutKey, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  const clearTimeouts = useCallback((): void => {
    timeouts.current.forEach(timeout => {
      clearTimeout(timeout);
    });
    timeouts.current.clear();
  }, []);

  const clear = useCallback((key?: TimeoutKey): void => {
    clearTimeout(timeouts.current.get(key));
    timeouts.current.delete(key);
  }, []);

  const set = useCallback(
    (
      fn: () => void | Promise<void>,
      timeout?: number,
      key?: TimeoutKey,
    ): void => {
      clearTimeout(key);
      timeouts.current.set(
        key,
        setTimeout(() => {
          void fn();
        }, timeout),
      );
    },
    [],
  );

  useEffect(
    () => () => {
      clearTimeouts();
    },
    [clearTimeouts],
  );

  return { setTimeout: set, clearTimeout: clear, clearTimeouts };
}
