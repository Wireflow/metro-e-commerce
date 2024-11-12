import { useQuery } from '@tanstack/react-query';

import { getBranchSettings } from '../../server/getBranchSettings';

export const useBranchSettings = () => {
  return useQuery({
    queryKey: ['branch-settings'],
    queryFn: async () => {
      const response = await getBranchSettings();

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
  });
};
