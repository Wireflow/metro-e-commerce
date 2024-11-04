'use server';
import { createClient } from '@/utils/supabase/server';

import { OrderDetails } from '../../schemas/orders';

export const getOrderById = async (orderId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('orders')
    .select(
      '*,customer:customers(*), payment:order_payments(*), orderItems:order_items(*, product:products(*, product_images:product_images(*)))'
    )
    .eq('id', orderId)
    .single();

  if (error) {
    throw new Error('Failed to find order');
  }

  if (!data) {
    throw new Error('order not found');
  }

  return data as OrderDetails;
};
