import { useQuery } from '@tanstack/react-query';

import { useUser } from '@/hooks/useUser';
import { createClient } from '@/utils/supabase/client';

export const usePaymentMethods = () => {
  const { user } = useUser();

  return useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const supabase = createClient();

      if (!user) {
        throw new Error('User not found');
      }

      const { data, error } = await supabase
        .from('payment_methods_with_spending')
        .select('*')
        .eq('customer_id', user?.id);

      if (error) {
        throw new Error('Failed to find payment methods');
      }

      if (!data) {
        throw new Error('Payment methods not found');
      }

      return data;
    },
  });
};
