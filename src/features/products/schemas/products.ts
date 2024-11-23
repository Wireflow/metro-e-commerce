import { Row } from '@/types/supabase/table';

export type Product = Row<'products'> & {
  images: Row<'product_images'>[];
  barcodes: Pick<Row<'barcodes'>, 'barcode' | 'id'>[];
};
