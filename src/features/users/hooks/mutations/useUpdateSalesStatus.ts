import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createClient } from '@/utils/supabase/client';

export type UpdateSalesStatusType = {
  blocked: boolean;
  sales_id: string;
};

export const useUpdateSalesStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-status'],
    mutationFn: async (data: UpdateSalesStatusType) => {
      const supbase = createClient();
      const { data: updatedpassword, error } = await supbase
        .from('users')
        .update({
          blocked: data.blocked,
        })
        .eq('id', data.sales_id);
      if (error) {
        throw new Error('Failed to update salesperson status');
      }

      return updatedpassword;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'sales-reps'] });
    },
    onSuccess: () => {
      toast.success('Sales rep status updated successfully');
    },
    onError: () => {
      toast.error('Failed to update sales rep status');
    },
  });
};
