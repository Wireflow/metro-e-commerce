import { Row } from '@/types/supabase/table';

export type Order = Row<'orders'> & {
  customer: Row<'customers'>;
  payment: Row<'order_payments'>;
  salesperson: Row<'users'>;
};

export type OrderPayment =
  | (Row<'order_payments'> & {
      payment_method: Row<'payment_methods'> & {
        billingAddress: Row<'addresses'> | null;
      };
    })
  | null;

export type OrderDetails = Row<'orders'> & {
  customer: Row<'customers'>;
  orderItems: OrderItemsDetails[];
  payment: OrderPayment;
  deliveryAddress: Row<'addresses'> | null;
};

export type OrderItemsDetails = Row<'order_items'> & {
  product: Row<'products'> & {
    product_images: Row<'product_images'>[];
    barcodes: Row<'barcodes'>[];
  };
  customer: Row<'customers'>;
  payment: Row<'order_payments'>;
};
