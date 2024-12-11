import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createClient } from '@/utils/supabase/client';

import { Product } from '../../schemas/products';

export const useProductByBarcode = (sku: string | null) => {
  return useQuery({
    queryKey: ['products', sku],
    queryFn: async () => {
      const supabase = createClient();

      if (!sku) {
        throw new Error('SKU is required');
      }

      const trimmedSku = sku.replace(/^0+/, '');

      const { data: barcode, error: barcodeError } = await supabase
        .from('barcodes')
        .select('product_id')
        .or(`barcode.ilike.%${sku}%,barcode.ilike.%${trimmedSku}%`);

      if (barcodeError) {
        toast.error('Could not find product');
        throw new Error('Barcode not found');
      }

      if (!barcode || barcode.length === 0) {
        toast.error('Could not find product');
        throw new Error('Barcode not found');
      }

      const { data, error } = await supabase
        .from('products')
        .select('*, images:product_images(*), barcodes:barcodes(id, barcode)')
        .eq('id', barcode[0].product_id)
        .single();

      if (error) {
        toast.error('Could not find product');
        throw new Error('Failed to find product');
      }

      if (!data) {
        toast.error('Could not find product');
        throw new Error('Product not found');
      }

      toast.success('Product found');

      return data as Product;
    },
    enabled: !!sku,
    retry: false,
  });
};
