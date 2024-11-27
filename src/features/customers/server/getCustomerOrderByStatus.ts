import { useQuery } from '@tanstack/react-query';

import { Order } from '@/features/orders/schemas/orders';
import { createClient } from '@/utils/supabase/client';

export const useCustomerOrdersByStatusClient = ({
  customerId,
  status,
}: {
  customerId: string;
  status?: string;
}) => {
  return useQuery({
    queryKey: ['customerByStatus', customerId, status],
    queryFn: async () => {
      const supabase = createClient();

      let query = supabase
        .from('orders')
        .select('id')
        .order('created_at', { ascending: false })
        .eq('customer_id', customerId);

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error('Failed to find orders');
      }

      if (!data) {
        throw new Error('Cutomer orders not found');
      }

      return data as Order[];
    },
  });
};
