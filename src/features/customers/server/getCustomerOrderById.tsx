import { useQuery } from '@tanstack/react-query';

import { createClient } from '@/utils/supabase/client';

export const useCustomerOrderByIdClient = ({ id }: { id: string }) => {
  const supabase = createClient();
  return useQuery({
    queryKey: ['customerOrderById', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, payment:order_payments(*), order_items:order_items(*)')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error('Failed to find order');
      }

      if (!data) {
        throw new Error('Order not found');
      }

      return data;
    },
  });
};
