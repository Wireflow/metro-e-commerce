import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useClearCart } from '@/features/cart/hooks/mutations/useClearCart';
import { useDeliveryPossible } from '@/features/cart/hooks/queries/useDeliveryPossible';
import { Enum } from '@/types/supabase/enum';
import { Row } from '@/types/supabase/table';
import { createPaymentApi } from '@/utils/payments/makePaymentRequest';
import { createClient } from '@/utils/supabase/client';

import { useCancelOrder } from './useCancelOrder';

type OrderData = {
  orderType: Enum<'order_type'>;
  notes?: string;
  paymentMethodId?: string;
  paymentOption?: Enum<'payment_type'>;
};

export const useCreateOrder = () => {
  const { isPossible: isDeliveryPossible, refetch: checkDeliveryPossible } = useDeliveryPossible();
  const { mutate: clearCart } = useClearCart();
  const { mutate: cancelOrder } = useCancelOrder();

  const router = useRouter();

  return useMutation({
    mutationKey: ['create-order'],
    mutationFn: async (data: OrderData) => {
      const supabase = createClient();
      const paymentApi = createPaymentApi();

      await checkDeliveryPossible();

      if (!isDeliveryPossible && data.orderType === 'delivery') {
        throw new Error('Delivery address is not within our delivery radius');
      }

      if (!data.orderType) {
        throw new Error('Order type is required');
      }

      // Step 1: Create the initial order
      const { data: order, error: createError } = await supabase
        .rpc('create_order_from_cart', {
          p_order_type: data.orderType,
          p_instructions: data.notes,
        })
        .returns<Row<'orders'>>();

      if (createError || !order) {
        throw new Error(`Failed to create order: ${createError?.message}`);
      }

      // Step 2: Handle online payment if selected
      if (data.paymentOption === 'online' && data.paymentMethodId) {
        try {
          // Get payment method token
          const { data: method, error: methodError } = await supabase
            .from('payment_methods')
            .select('token, id')
            .eq('id', data.paymentMethodId)
            .single();

          if (methodError || !method) {
            throw new Error('Failed to get payment method');
          }

          // Authorize payment
          const { error: paymentError, data: payment } = await paymentApi.authorizeToken({
            token: method.token,
            amount: order.total_amount,
          });

          if (paymentError) {
            throw new Error('Failed to authorize payment');
          }

          // Create payment record
          const { error: paymentMethodError } = await supabase.from('order_payments').insert({
            order_id: order.id,
            payment_method_id: method.id,
            payment_type: 'online',
            payment_amount: order.total_amount,
            payment_status: 'pending',
            payment_date: new Date().toISOString(),
            tran_key: payment?.tranKey,
          });

          if (paymentMethodError) {
            throw new Error('Failed to link payment method');
          }

          // Update order status
          const { data: updatedOrder, error: updateError } = await supabase.rpc(
            'update_order_status',
            {
              p_order_id: order.id,
              p_status: 'pending',
            }
          );

          if (updateError || !updatedOrder) {
            throw new Error(`Failed to update order status`);
          }

          return updatedOrder;
        } catch (error) {
          cancelOrder(order.id);
          throw error;
        }
      }

      if (data.paymentOption === 'later') {
        const { error: paymentMethodError } = await supabase.from('order_payments').insert({
          order_id: order.id,
          payment_type: 'later',
          payment_amount: order.total_amount,
          payment_status: 'pending',
        });

        if (paymentMethodError) {
          throw new Error('Failed to link payment method');
        }

        // Update order status
        const { data: updatedOrder, error: updateError } = await supabase.rpc(
          'update_order_status',
          {
            p_order_id: order.id,
            p_status: 'pending',
          }
        );

        if (updateError || !updatedOrder) {
          throw new Error(`Failed to update order status`);
        }

        return updatedOrder;
      }

      return order;
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
    onSuccess: order => {
      if (order) {
        clearCart();
        router.replace(
          `/customer/checkout/placed?orderId=${order?.id}&orderNumber=${order?.order_number}`
        );
        toast.success('Order created successfully');
      }
    },
  });
};
