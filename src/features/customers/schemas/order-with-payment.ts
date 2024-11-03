import { Row } from '@/types/supabase/table';

export type OrderWithPayment = Row<'orders'> & {
  payment: Row<'order_payments'>;
};
