import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';

const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: true,
          refetchOnMount: true,
        },
      },
    })
);

export function invalidateAndClearCache() {
  getQueryClient().invalidateQueries();
}

export function clearAllCaches() {
  getQueryClient().clear();
}

export default getQueryClient;
