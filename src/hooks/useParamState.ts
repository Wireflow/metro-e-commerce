import { useSearchParams } from 'next/navigation';

import { useCallback, useEffect } from 'react';

type ParamParser<T> = {
  parse: (value: string | null) => T;
  serialize: (value: T) => string;
  equals: (a: T, b: T) => boolean;
};

// Built-in parsers for common types
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
  /**
   * Delay in ms before clearing empty values from URL
   * Set to 0 to disable cleanup
   */
  cleanupDelay?: number;
};

export function useParamState<T>({
  key,
  parser,
  defaultValue,
  cleanupDelay = 500,
}: UseSearchParamOptions<T>): [T, (newValue: T | null) => void] {
  const searchParams = useSearchParams();

  // Create a function to update URL search params
  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === null) {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      // Remove empty parameters to keep URL clean
      const cleanParams = Array.from(params.entries())
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => value !== '')
        .reduce((acc, [key, value]) => {
          acc.set(key, value);
          return acc;
        }, new URLSearchParams());

      return cleanParams.toString();
    },
    [searchParams]
  );

  // Get current value from search params
  const value = parser.parse(searchParams.get(key));

  // Create setter function
  const setValue = useCallback(
    (newValue: T | null) => {
      const serializedValue = newValue === null ? null : parser.serialize(newValue);
      const queryString = createQueryString(key, serializedValue);

      // Update URL without page refresh
      const newUrl = queryString ? `?${queryString}` : window.location.pathname;
      window.history.pushState(null, '', newUrl);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key, createQueryString]
  );

  // Cleanup effect for empty/default values
  useEffect(() => {
    if (cleanupDelay > 0 && parser.equals(value, defaultValue)) {
      const timer = setTimeout(() => {
        setValue(null);
      }, cleanupDelay);
      return () => clearTimeout(timer);
    }
  }, [value, defaultValue, setValue, cleanupDelay, parser]);

  return [value || defaultValue, setValue];
}
