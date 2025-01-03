import { Row } from '@/types/supabase/table';

import { Product } from './products';

export type Category = Row<'categories'> & {
  product_count?: number;
  sales?: number;
  subcategory_count?: number;
  sub_categories?: Category[] | null;
};

export type CategoryWithProducts = Row<'categories'> & {
  products: Product[];
  sub_categories: Row<'categories'>[];
};
