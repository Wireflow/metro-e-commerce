import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import CheckoutToast from '@/components/toasts/CheckoutToast';
import { useClearCart } from '@/features/cart/hooks/mutations/useClearCart';
import { useDefaultCart } from '@/features/cart/hooks/queries/useDefaultCart';
import { useDeliveryPossible } from '@/features/cart/hooks/queries/useDeliveryPossible';
import { useOrderMinimum } from '@/hooks/useOrderMinimum';
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
  const { meetsMinimum, reason } = useOrderMinimum();
  const { mutate: clearCart } = useClearCart();
  const { mutate: cancelOrder } = useCancelOrder();
  const { data: cartData, error: cartError } = useDefaultCart();

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

      if (!meetsMinimum) {
        throw new Error(reason ?? 'Order does not meet minimum');
      }

      if (!data.orderType) {
        throw new Error('Order type is required');
      }

      if (cartError) {
        throw new Error('Error fetching cart');
      }

      if (!cartData) {
        throw new Error('No cart found');
      }

      // Step 1: Create the initial order
      const { data: order, error: createError } = await supabase
        .rpc('create_order_from_cart', {
          p_cart_id: cartData.id,
          p_order_type: data.orderType,
          p_instructions: data.notes,
        })
        .returns<Row<'orders'>>();

      if (createError || !order) {
        throw new Error(createError?.message ?? 'Failed to create order');
      }

      // Step 2: Handle online payment if selected
      if (data.paymentOption === 'online') {
        try {
          if (!data.paymentMethodId) {
            throw new Error('You must select a payment method');
          }

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
            throw new Error(paymentError ?? 'Failed to authorize payment');
          }

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
      toast.custom(() => <CheckoutToast variant="error" description={err.message} />, {
        duration: 3000,
        className: 'bg-white rounded-lg shadow-lg p-4 w-full',
      });
    },
    onSuccess: async order => {
      if (order) {
        try {
          // Show success toast first
          toast.custom(
            () => <CheckoutToast variant="success" orderNumber={order?.order_number} />,
            {
              duration: 3000,
              className: 'bg-white rounded-lg shadow-lg p-4 w-full',
            }
          );

          // Clear cart
          await clearCart();

          // Add a small delay to ensure toast is visible
          await new Promise(resolve => setTimeout(resolve, 100));

          // Use push instead of replace to ensure proper history handling
          await router.push(
            `/customer/checkout/placed?orderId=${order?.id}&orderNumber=${order?.order_number}`
          );
        } catch (error) {
          console.error('Navigation error:', error);
          // Fallback navigation
          window.location.href = `/customer/checkout/placed?orderId=${order?.id}&orderNumber=${order?.order_number}`;
        }
      }
    },
  });
};
