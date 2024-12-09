import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateBranchSettings } from '../../server/updateBranchSettings';

export const useUpdateBranchSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-branch-settings'],
    mutationFn: updateBranchSettings,
    onSuccess: data => {
      if (data?.success) {
        toast.success('Website settings updated!');
      } else {
        toast.error(data.error);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['branches'] });
      queryClient.invalidateQueries({ queryKey: ['branch'] });
      queryClient.invalidateQueries({ queryKey: ['branch-settings'] });
    },
  });
};
