import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateBranch } from '../../server/updateBranch';

export const useUpdateBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-branch'],
    mutationFn: updateBranch,
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
