import { useQuery } from '@tanstack/react-query';

import { createClient } from '@/utils/supabase/client';

export const useCustomerById = (customerId: string) => {
  return useQuery({
    queryKey: ['customers', customerId],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('customers_with_address')
        .select('*')
        .eq('id', customerId)
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
  });
};
