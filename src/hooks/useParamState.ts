import { useSearchParams } from 'next/navigation';

import { useCallback, useEffect, useRef } from 'react';

type ParamParser<T> = {
  parse: (value: string | null) => T;
  serialize: (value: T) => string;
  equals: (a: T, b: T) => boolean;
};

// Parsers remain the same
export const StringParser: ParamParser<string> = {
  parse: value => value || '',
  serialize: value => value,
  equals: (a, b) => a === b,
};

export const NumberParser: ParamParser<number> = {
  parse: value => (value ? Number(value) : 0),
  serialize: value => value.toString(),
  equals: (a, b) => a === b,
};

export const BooleanParser: ParamParser<boolean> = {
  parse: value => value === 'true',
  serialize: value => value.toString(),
  equals: (a, b) => a === b,
};

export const ArrayParser = <T>(itemParser: ParamParser<T>): ParamParser<T[]> => ({
  parse: value => (value ? value.split(',').map(itemParser.parse) : []),
  serialize: value => value.map(itemParser.serialize).join(','),
  equals: (a, b) =>
    a.length === b.length && a.every((item, index) => itemParser.equals(item, b[index])),
});

type UseSearchParamOptions<T> = {
  key: string;
  parser: ParamParser<T>;
  defaultValue: T;
  cleanupDelay?: number;
};

// Create a global batch update manager
const batchManager = {
  updates: new Map<string, string | null>(),
  timeout: null as NodeJS.Timeout | null,

  scheduleUpdate() {
    if (this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);

      // Apply all updates
      this.updates.forEach((value, key) => {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      // Clean empty params
      const cleanParams = Array.from(params.entries())
        .filter(([_, value]) => value !== '')
        .reduce((acc, [key, value]) => {
          acc.set(key, value);
          return acc;
        }, new URLSearchParams());

      // Update URL
      const queryString = cleanParams.toString();
      const newUrl = queryString ? `?${queryString}` : window.location.pathname;
      window.history.pushState(null, '', newUrl);
      window.dispatchEvent(new Event('popstate'));

      // Clear updates
      this.updates.clear();
      this.timeout = null;
    }, 0);
  },
};

export function useParamState<T>({
  key,
  parser,
  defaultValue,
  cleanupDelay = 500,
}: UseSearchParamOptions<T>): [T, (newValue: T | null) => void] {
  const searchParams = useSearchParams();
  const cleanupTimerRef = useRef<NodeJS.Timeout | null>(null);

  const value = parser.parse(searchParams.get(key));

  const setValue = useCallback(
    (newValue: T | null) => {
      if (cleanupTimerRef.current) {
        clearTimeout(cleanupTimerRef.current);
      }

      const serializedValue = newValue === null ? null : parser.serialize(newValue);

      // Add to batch updates
      batchManager.updates.set(key, serializedValue);
      batchManager.scheduleUpdate();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key]
  );

  useEffect(() => {
    if (cleanupDelay > 0 && parser.equals(value, defaultValue)) {
      cleanupTimerRef.current = setTimeout(() => {
        setValue(null);
      }, cleanupDelay);
      return () => {
        if (cleanupTimerRef.current) {
          clearTimeout(cleanupTimerRef.current);
        }
      };
    }
  }, [value, defaultValue, setValue, cleanupDelay, parser]);

  return [value || defaultValue, setValue];
}
