import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createClient } from '@/utils/supabase/client';

export type UpdateBranch = {
  name: string;
  phone: string;
  email: string;
  orders_notified_email: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  branchId: string;
};

export const useUpdateBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['orders', 'info'],
    mutationFn: async (input: UpdateBranch) => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('branches')
        .update({
          name: input.name,
          phone: input.phone,
          email: input.email,
          orders_notified_email: input.orders_notified_email,
          address: input.address,
          city: input.city,
          state: input.state,
          zip_code: input.zip_code,
        })
        .eq('id', input.branchId);

      if (error) {
        throw new Error(error.message ?? 'Failed to updated branch info');
      }

      return data;
    },
    onError: error => {
      toast.error(error.message ?? 'Failed to updated branch info');
    },
    onSuccess: (data, variable) => {
      toast.success('Successfully updated branch info');
      queryClient.invalidateQueries({
        queryKey: ['branch', variable.branchId],
      });
    },
  });
};
