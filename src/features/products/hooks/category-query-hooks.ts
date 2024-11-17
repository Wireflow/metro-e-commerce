import { useQuery } from '@tanstack/react-query';

import { createClient } from '@/utils/supabase/client';

import { Product } from '../schemas/products';
import { getCategories } from '../server/categories/getCategories';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};

export const useCategoryFeaturedProducts = (categoryId: string) => {
  return useQuery({
    queryKey: ['categories', 'featured', categoryId],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from(`products`)
        .select('*, images:product_images(*), barcodes:barcodes(barcode, id)')
        .eq('category_id', categoryId)
        .eq('is_featured', true)
        .order('id', { ascending: false })
        .limit(3)
        .returns<Product[]>();

      if (error) {
        throw new Error(error.message);
      }
      return data ?? [];
    },
    enabled: !!categoryId,
    retry: false,
  });
};

export const useCategoryManufacturers = (categoryId: string) => {
  return useQuery({
    queryKey: ['categories', 'manufacturers', categoryId],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('category_manufacturers')
        .select('*')
        .eq('category_id', categoryId)
        .limit(10);

      if (error) {
        throw new Error(error.message);
      }

      return data ?? [];
    },
    enabled: !!categoryId,
    retry: false,
  });
};
