import { Row } from '@/types/supabase/table';

export type Order = Row<'orders'> & {
  customer: Row<'customers'>;
  payment: Row<'order_payments'>;
};

export type OrderDetails = Row<'orders'> & {
  customer: Row<'customers'>;
  orderItems: Row<'order_items'>[];
};
