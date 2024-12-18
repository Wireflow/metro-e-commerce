import { useQuery } from '@tanstack/react-query';

import { Row } from '@/types/supabase/table';
import { createClient } from '@/utils/supabase/client';

export type CustomerPermission = Row<'customer_access'> & {
  salesperson: Row<'users'>;
};

export const useCustomerPermissions = (customerId: string) => {
  return useQuery({
    queryKey: ['permissions', customerId],
    queryFn: async () => {
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
        .select('*, salesperson:customer_access_salesperson_id_fkey(*)')
        .eq('customer_id', customerId)
        .returns<CustomerPermission[]>();

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
