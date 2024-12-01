import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Enum } from '@/types/supabase/enum';
import { createClient } from '@/utils/supabase/client';

type OrderData = {
  orderType: Enum<'order_type'>;
  notes?: string;
};

export const useCreateOrder = () => {
  return useMutation({
    mutationKey: ['create-order'],
    mutationFn: async (data: OrderData) => {
      const supabase = createClient();

      if (!data.orderType) {
        throw new Error('Order type is required');
      }

      const { data: order, error } = await supabase.rpc('create_order_from_cart', {
        p_order_type: data.orderType ?? '',
        p_instructions: data.notes,
      });

      if (error) {
        throw new Error(error.message);
      }

      return order;
    },

    onError: err => {
      toast.error(err.message);
    },
    onSuccess: order => {
      toast.success('Order created successfully');
    },
  });
};
