import { Order } from '@/features/orders/schemas/orders';
import { createClient } from '@/utils/supabase/server';

export const getCustomerOrders = async (customerId: string) => {
  const supabase = createClient();

  if (!customerId) {
    throw new Error('Customer not found');
  }

  const { data, error } = await supabase
    .from('orders')
    .select('*, payment:order_payments(*), customer:customers(*)')
    .order('created_at', { ascending: false })
    .eq('customer_id', customerId);

  if (error) {
    throw new Error('Failed to find orders');
  }

  if (!data) {
    throw new Error('Cutomer orders not found');
  }

  return data as Order[];
};
