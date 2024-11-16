'use server';
import { createClient } from '@/utils/supabase/server';

import { OrderDetails } from '../../schemas/orders';

export const getOrderById = async (orderId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('orders')
    .select(
      `   *,
      customer:customers(*),
      salesperson:users(*),
      payment:order_payments(
        *,
        payment_method:payment_methods(
          *,
          billingAddress:addresses(*)
        )
      ),
      orderItems:order_items(
        *,
        product:products(
          *,
          product_images(*),
          barcodes(*)
        )
      ),
      deliveryAddress:addresses!delivery_address_id(*)`
    )
    .eq('id', orderId)
    .returns<OrderDetails>()
    .single();
  if (error) {
    throw new Error('Failed to find order');
  }

  if (!data) {
    throw new Error('order not found');
  }

  return data;
};
