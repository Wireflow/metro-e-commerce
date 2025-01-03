import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createClient } from '@/utils/supabase/client';

export type PermissionData = {
  customerId: string;
  salespersonId: string;
};

export const useCreatePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['users', 'create-permission'],
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
        .insert({
          granted_by: user.user.id,
          customer_id: data.customerId,
          salesperson_id: data.salespersonId,
        });

      if (accessError) {
        throw new Error('Failed to create access permission');
      }
      return accessData;
    },
    onSuccess: (data, variable) => {
      toast.success('Successfully granted access');
      queryClient.invalidateQueries({ queryKey: ['permissions', variable.customerId] });
    },
  });
};
