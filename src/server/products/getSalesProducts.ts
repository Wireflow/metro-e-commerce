import { Row } from '@/types/supabase/table';
import { createClient } from '@/utils/supabase/server';

export type ProductProps = Row<'products'> & {
  images: {
    product_images: Row<'product_images'>[];
  };
};

export const getSalesProducts = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('products')
    .select(
      `
      *,
      images:product_images(*)
    `
    )
    .order('discount', { ascending: false })
    .limit(3)
    .returns<ProductProps[]>();

  if (error) {
    throw new Error('Error getting sales products');
  }

  if (!data) {
    throw new Error('No data returned from getSalesProducts');
  }

  return data;
};
