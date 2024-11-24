import { useQuery } from '@tanstack/react-query';

import { createClient } from '@/utils/supabase/client';

export const useOrderTracking = ({
  orderNumber,
  enabled,
}: {
  orderNumber: number;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ['order-tracking', orderNumber],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('orders')
        .select(
          'status, created_at, confirmed_at, preparing_at, ready_at, completed_at, cancelled_at, refunded_at, expected_delivery_at, order_number, total_quantity, total_amount, type'
        )
        .eq('order_number', orderNumber)
        .single();

      if (error) {
        throw new Error('Error getting order tracking: ' + error.message);
      }

      if (!data) {
        throw new Error('order information not found');
      }
      return data;
    },
    enabled: enabled,
    retry: false,
  });
};
