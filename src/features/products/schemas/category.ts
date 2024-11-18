import { Row } from '@/types/supabase/table';

import { Product } from './products';

export type Category = Row<'categories'> & {
  product_count: number;
  sales: number;
};

export type CategoryWithProducts = Row<'categories'> & {
  products: Product[];
};
