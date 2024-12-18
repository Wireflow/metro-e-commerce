import { useQuery } from '@tanstack/react-query';

import { Order } from '@/features/orders/schemas/orders';
import { createClient } from '@/utils/supabase/client';

export const useCustomerOrdersClient = ({
  customerId,
  limit,
}: {
  customerId: string;
  limit: number;
}) => {
  return useQuery({
    queryKey: ['orders', 'customer', customerId],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('orders')
        .select('*, payment:order_payments(*), customer:customers(*)')
        .order('created_at', { ascending: false })
        .neq('status', 'created')
        .eq('order_category', 'regular')
        .eq('customer_id', customerId)
        .limit(limit);

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
