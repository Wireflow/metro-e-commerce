import { useMutation } from '@tanstack/react-query';

import { createClient } from '@/utils/supabase/client';

export const useCustomerPermissions = () => {
  return useMutation({
    mutationKey: ['users', 'permissions'],
    mutationFn: async (customerId: string) => {
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
        .select('*')
        .eq('customer_id', customerId);

      if (accessError) {
        throw new Error('Failed to get access permission');
      }

      if (!accessData) {
        throw new Error('No access permission found');
      }
      return accessData;
    },
  });
};
