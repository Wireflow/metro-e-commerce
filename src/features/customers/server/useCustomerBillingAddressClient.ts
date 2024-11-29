import { useQuery } from '@tanstack/react-query';

import { createClient } from '@/utils/supabase/client';

export const useCustomerBillingAddressClient = ({ customerId }: { customerId: string }) => {
  return useQuery({
    queryKey: ['addresses', customerId],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('customer_id', customerId)
        .eq('type', 'billing');

      if (error) {
        throw new Error('Failed to find customer billing address');
      }

      if (!data) {
        throw new Error('Customer billing address not found');
      }

      return data;
    },
  });
};
