import { Row } from '@/types/supabase/table';

export type Category = Row<'categories'> & {
  product_count: number;
  sales: number;
};
