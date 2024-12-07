import { createClient } from '@/utils/supabase/client';

import { ProductFilters } from '../hooks/product-query-hooks';
import { Product } from '../schemas/products';

export const getPublishedProducts = async (filters: ProductFilters = {}) => {
  const supabase = createClient();

  // Start the query
  let query = supabase
    .from('products')
    .select('*, images:product_images(*), barcodes:barcodes(*)')
    .eq('published', true);
  // Apply text search across specified fields
  if (filters?.search && filters?.search?.length > 0) {
    const searchFields = filters.searchFields || ['name', 'description', 'manufacturer'];
    const searchConditions = searchFields.map(field => `${field}.ilike.%${filters.search}%`);

    query = query.or(searchConditions.join(','));
  }

  // Apply boolean filters
  if (filters.inStock !== undefined) {
    query = query.eq('in_stock', filters.inStock);
  }

  // Apply category filter
  if (filters.category_id) {
    query = query.eq('category_id', filters.category_id);
  }

  // Apply price range filters
  if (filters.minPrice !== undefined) {
    query = query.gte('retail_price', filters.minPrice);
  }

  if (filters.maxPrice !== undefined) {
    query = query.lte('retail_price', filters.maxPrice);
  }

  // Apply sorting
  if (filters.sortBy) {
    const order = filters.sortOrder || 'asc';
    query = query.order(filters.sortBy, { ascending: order === 'asc' });
  }

  // Execute the query
  const { data, error } = await query.returns<Product[]>();

  if (error) {
    throw new Error(`Failed to retrieve products: ${error.message}`);
  }

  if (!data) {
    throw new Error('No data returned');
  }

  return data;
};
