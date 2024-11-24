import { useQuery } from '@tanstack/react-query';

import { createClient } from '@/utils/supabase/client';

import { CategoryWithProducts } from '../schemas/category';
import { Product } from '../schemas/products';
import { getCategories } from '../server/categories/getCategories';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};

export const useCategoriesWithSub = () => {
  return useQuery({
    queryKey: ['categories', 'with-sub'],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('categories')
        .select(
          '*, products(*, images:product_images(*), barcodes:barcodes(barcode, id)), sub_categories:categories(id, name, image_url)'
        );

      if (error) {
        throw new Error('Faild to fetch categories');
      }
      if (!data) {
        throw new Error('No data returned from useCategoriesWithSub');
      }
      return data as unknown as CategoryWithProducts;
    },
  });
};

export const useFeaturedCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ['categories', 'featured', categoryId],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('categories')
        .select(
          '*, products(*, images:product_images(*), barcodes:barcodes(barcode, id)), sub_categories:categories(id, name, image_url)'
        )
        .eq('id', categoryId)
        .single();
      if (error) {
        throw new Error('Faild to fetch featured category');
      }
      if (!data) {
        throw new Error('No data returned from useFeaturedCategory');
      }
      return data as unknown as CategoryWithProducts;
    },
  });
};

export const useCategoryProducts = (categoryId: string) => {
  return useQuery({
    queryKey: ['categories', 'products', categoryId],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('categories')
        .select(
          '*, products(*, images:product_images(*), barcodes:barcodes(barcode, id)), sub_categories:categories(id, name, image_url)'
        )
        .eq('id', categoryId)
        .eq('published', true)
        .single();
      if (error) {
        throw new Error('Faild to fetch  category');
      }
      if (!data) {
        throw new Error('No data returned from useCategoryProducts');
      }
      return data as unknown as CategoryWithProducts;
    },
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

export const useTopCategories = () => {
  return useQuery({
    queryKey: ['categories', 'top'],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('categories_sales_and_products_count')
        .select('*')
        .order('sales', { ascending: false })
        .limit(10);
      if (error) {
        throw new Error('Failed to find categories');
      }

      if (!data) {
        throw new Error('Categories not found');
      }
      return data;
    },
  });
};

export const useManufacturers = (limit: number = 10) => {
  return useQuery({
    queryKey: ['manufacturers'],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('category_manufacturers')
        .select('*')
        .limit(limit);

      if (error) {
        throw new Error('Failed to find manufacturers');
      }

      if (!data) {
        throw new Error('Manufacturers not found');
      }
      return data;
    },
  });
};
