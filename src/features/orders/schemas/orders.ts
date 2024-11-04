import { Row } from '@/types/supabase/table';

export type Order = Row<'orders'> & {
  customer: Row<'customers'>;
  payment: Row<'order_payments'>;
};

export type OrderDetails = Row<'orders'> & {
  customer: Row<'customers'>;
  orderItems: Row<'order_items'>[];
  payment: Row<'order_payments'>;
};

export type OrderItemsDetails = Row<'order_items'> & {
  product: Row<'products'> & {
    product_images: Row<'product_images'>[];
  };
};
