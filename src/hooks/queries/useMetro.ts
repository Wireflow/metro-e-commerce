import { useQuery } from '@tanstack/react-query';

import { METRO_BRANCH_ID } from '@/data/constants';
import { getBranchById } from '@/server/branches/getBranchById';

export const useBranch = () => {
  const {
    data: branch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['branch', METRO_BRANCH_ID],
    queryFn: async () => {
      const { data: branch, error } = await getBranchById(METRO_BRANCH_ID);

      if (error) {
        throw error;
      }

      return branch;
    },
    staleTime: 1000 * 60 * 5,
    retry: 3,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  return {
    branch,
    isLoading,
    isError,
    error: error as Error | null,
  };
};
