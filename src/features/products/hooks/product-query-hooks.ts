import { useQuery } from '@tanstack/react-query';

import { Row } from '@/types/supabase/table';
import { createClient } from '@/utils/supabase/client';

import { getProducts } from '../queries/getProducts';
import { getPublishedProducts } from '../queries/getPublishedProducts';
import { Product } from '../schemas/products';
import { getCategoryById } from '../server/categories/getCategoryById';
import { getProductsAnalytics } from '../server/products/getProductsAnalytics';

export interface ProductFilters {
  search?: string;
  searchFields?: ('name' | 'description' | 'manufacturer')[];
  inStock?: boolean;
  published?: boolean;
  category_id?: string;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  sortBy?: 'retail_price' | 'name' | 'created_at';
  sortOrder?: 'asc' | 'desc';
  is_discounted?: boolean;
  manufacturers?: string[];
}

interface UseProductsOptions {
  filters?: ProductFilters;
  enabled?: boolean;
}

export type ProductProps = Row<'products'> & {
  images: {
    product_images: Row<'product_images'>[];
  };
};

export const useProducts = ({ filters = {}, enabled = true }: UseProductsOptions = {}) => {
  return useQuery({
    queryKey: ['products', JSON.stringify(filters)],
    queryFn: () => getProducts(filters),
    enabled,
  });
};

export const usePublishedProducts = ({ filters = {}, enabled = true }: UseProductsOptions = {}) => {
  return useQuery({
    queryKey: ['products', 'published', JSON.stringify(filters)],
    queryFn: () => getPublishedProducts(filters),
    enabled,
  });
};

export const useAnalytics = () => {
  return useQuery({
    queryKey: ['products', 'analytics'],
    queryFn: () => getProductsAnalytics(),
  });
};

export const useCategoryById = (categoryId: string) => {
  return useQuery({
    queryKey: ['categories', categoryId],
    queryFn: () => getCategoryById(categoryId),
  });
};

export const useProductSales = () => {
  return useQuery({
    queryKey: ['products', 'sales'],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('discounted_products')
        .select(
          `
          *,
          images:product_images(*)
        `
        )
        .eq('published', true)
        .order('discounted_until', { ascending: true })
        .limit(3);

      if (error) {
        throw new Error('Error getting sales products');
      }

      if (!data) {
        throw new Error('No data returned from useProductSales');
      }

      return data as unknown as Product[];
    },
  });
};

export const useProductBestSellers = () => {
  return useQuery({
    queryKey: ['products', 'bestSellers'],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('lifetime_product_sales')
        .select(
          `
          sales,
          product:products!inner(
            *,
            images:product_images(*)
          )
        `
        )
        .eq('products.published', true)
        .order('sales', { ascending: false })
        .limit(3);

      if (error) {
        throw new Error('Error getting products with sales data');
      }

      if (!data) {
        throw new Error('No data returned from useProductBestSellers');
      }

      // Map to extract just the product data with sales
      return data.map(item => ({
        ...item.product,
        sales: item.sales,
      })) as (Product & { sales: number })[];
    },
  });
};

export const useProductNewArrivals = () => {
  return useQuery({
    queryKey: ['products', 'newArrivals'],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('products')
        .select(
          `
        *,
           images:product_images(*)
        `
        )
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Query error:', error);
        throw new Error('Error getting new arrival products');
      }

      if (!data) {
        throw new Error('No data returned from useProductNewArrivals');
      }

      return data as Product[];
    },
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('featured_products')
        .select(
          `
        *,
           images:product_images(*)
        `
        )
        .eq('published', true)
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) {
        console.error('Query error:', error);
        throw new Error('Error getting featured products');
      }

      if (!data) {
        throw new Error('No data returned from useFeaturedProducts');
      }

      return data as Product[];
    },
  });
};
