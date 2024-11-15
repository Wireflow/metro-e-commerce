'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import React, { useState } from 'react';

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  const [queryClient] = useState(
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

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>{children}</NuqsAdapter>
    </QueryClientProvider>
  );
};

export default Providers;
