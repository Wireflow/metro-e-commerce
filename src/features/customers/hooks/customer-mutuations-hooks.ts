import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateCustomer } from '../server/updateCustomer';

export const useApproveCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['approve-customer'],
    mutationFn: updateCustomer,
    onSuccess: data => {
      if (data?.success) {
        toast.success('Customer approved!');
      } else {
        toast.error(data.error);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};
