import { useMutation } from '@tanstack/react-query';

import { createPaymentApi } from '@/utils/payments/makePaymentRequest';
import { createClient } from '@/utils/supabase/client';

export const useCancelOrder = () => {
  return useMutation({
    mutationKey: ['cancel-order'],
    mutationFn: async (orderId: string) => {
      const supabase = createClient();
      const paymentApi = createPaymentApi();

      const { data: payment, error: paymentError } = await supabase
        .from('order_payments')
        .select('tran_key')
        .eq('id', orderId)
        .single();

      if (paymentError || !payment.tran_key) {
        throw new Error(`Failed to get order`);
      }

      const { data: updatedOrder, error: updateError } = await supabase.rpc('update_order_status', {
        p_order_id: orderId,
        p_status: 'cancelled',
      });

      if (updateError) {
        throw new Error(`Failed to cancel order!`);
      }

      const { error } = await paymentApi.voidTransaction({
        tranKey: payment.tran_key,
      });

      if (error) {
        throw new Error(`Failed to void transaction`);
      }

      await supabase
        .from('order_payments')
        .update({
          payment_status: 'voided',
        })
        .eq('id', orderId);

      return updatedOrder;
    },
  });
};
