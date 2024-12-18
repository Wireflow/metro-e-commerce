import { useMutation } from '@tanstack/react-query';

import { createClient } from '@/utils/supabase/client';

export const useDeletePermission = () => {
  return useMutation({
    mutationKey: ['users', 'delete-permission'],
    mutationFn: async (permissionId: string) => {
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
        .eq('id', permissionId);

      if (accessError) {
        throw new Error('Failed to delete access permission');
      }
      return accessData;
    },
  });
};
