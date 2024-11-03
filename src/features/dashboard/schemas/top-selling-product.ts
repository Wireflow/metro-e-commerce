import { Row, ViewRow } from '@/types/supabase/table';

export type TopSellingProduct = ViewRow<'product_sales_analytics'> & {
  product: Row<'products'> & {
    images: Row<'product_images'>[];
  };
};
