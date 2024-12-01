import { useQuery } from '@tanstack/react-query';

import { createClient } from '@/utils/supabase/client';

export const useCustomerAddressClient = ({ customerId }: { customerId: string }) => {
  return useQuery({
    queryKey: ['customer-address', customerId],
    queryFn: async () => {
      const supabase = createClient();

      if (!customerId) {
        throw new Error('Customer ID is required');
      }

      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('customer_id', customerId);

      if (error) {
        throw new Error('Failed to find customer addresses');
      }

      if (!data) {
        throw new Error('Customer addresses not found');
      }

      return data;
    },
  });
};
