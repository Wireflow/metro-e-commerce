import { useQuery } from '@tanstack/react-query';

import { getBranchById } from '@/server/branches/getBranchById';
import { formatAddress } from '@/utils/utils';

import { useUser } from '../useUser';

export const useCurrentBranch = () => {
  const { user } = useUser();

  const {
    data: branch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['branch', user?.user_metadata?.branch_id, user?.id],
    queryFn: async () => {
      const { data: branch, error } = await getBranchById(user?.user_metadata?.branch_id);

      if (error) {
        throw error;
      }

      return branch;
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const pickupAddress =
    branch &&
    formatAddress({
      street: branch?.address,
      ...branch,
    });

  return {
    branch,
    isLoading,
    isError,
    error: error as Error | null,
    formattedAddress: pickupAddress,
  };
};
