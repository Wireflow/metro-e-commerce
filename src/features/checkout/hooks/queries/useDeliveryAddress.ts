import { useQuery } from '@tanstack/react-query';

import { useUser } from '@/hooks/useUser';
import { createClient } from '@/utils/supabase/client';

export const useDeliveryAddress = () => {
  const { user } = useUser();
  return useQuery({
    queryKey: ['addresses', 'delivery'],
    queryFn: async () => {
      const supabase = createClient();

      if (!user) {
        throw new Error('User not found');
      }

      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('customer_id', user?.id)
        .eq('type', 'delivery')
        .single();

      if (error) {
        throw new Error('Failed to find delivery address');
      }

      if (!data) {
        throw new Error('Delivery address not found');
      }

      return data;
    },
  });
};
