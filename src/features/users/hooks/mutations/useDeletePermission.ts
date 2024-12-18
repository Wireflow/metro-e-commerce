import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createClient } from '@/utils/supabase/client';

type PermissionData = {
  customerId: string;
  salespersonId: string;
};

export const useDeletePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['users', 'delete-permission'],
    mutationFn: async (data: PermissionData) => {
      const supabase = createClient();
      const { data: user, error } = await supabase.auth.getUser();

      if (error) {
        throw error;
      }

      if (!user) {
        throw new Error('User not found');
      }
      const { data: accessData, error: accessError } = await supabase
        .from('customer_access')
        .delete()
        .match({
          customer_id: data.customerId,
          salesperson_id: data.salespersonId,
        });

      if (accessError) {
        throw new Error('Failed to delete access permission');
      }
      return accessData;
    },
    onSuccess: (data, variable) => {
      toast.success('Successfully removed access');
      queryClient.invalidateQueries({ queryKey: ['permissions', variable.customerId] });
    },
  });
};
