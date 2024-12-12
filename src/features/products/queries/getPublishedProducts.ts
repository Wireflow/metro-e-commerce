import { createClient } from '@/utils/supabase/client';

import { ProductFilters } from '../hooks/product-query-hooks';
import { Product } from '../schemas/products';

export const getPublishedProducts = async (filters: ProductFilters = {}) => {
  const supabase = createClient();

  // Start the query
  let query = supabase
    .from('products')
    .select(
      `
      *,
      images:product_images(*),
      barcodes(*)
    `
    )
    .eq('published', true);

  // Apply text search across specified fields
  if (filters?.search && filters?.search?.length > 0) {
    const searchFields = filters.searchFields || ['name', 'description', 'manufacturer'];

    if (searchFields.includes('barcodes.barcode')) {
      const barcodeQuery = supabase
        .from('barcodes')
        .select('product_id')
        .ilike('barcode', `%${filters.search}%`);

      const { data: barcodeMatches } = await barcodeQuery;
      const productIds = barcodeMatches?.map(b => b.product_id) || [];

      // Search in either product fields or matching barcode products
      query = query.or(
        `or(id.in.(${productIds.join(',')}),${searchFields
          .filter(field => field !== 'barcodes.barcode')
          .map(field => `${field}.ilike.%${filters.search}%`)
          .join(',')})`
      );
    } else {
      // Regular search without barcodes
      query = query.or(searchFields.map(field => `${field}.ilike.%${filters.search}%`).join(','));
    }
  }

  // Rest of your filtering logic remains the same
  if (filters.inStock !== undefined) {
    query = query.eq('in_stock', filters.inStock);
  }

  if (filters.category_id) {
    query = query.eq('category_id', filters.category_id);
  }

  if (filters.minPrice !== undefined) {
    query = query.gte('retail_price', filters.minPrice);
  }

  if (filters.maxPrice !== undefined) {
    query = query.lte('retail_price', filters.maxPrice);
  }

  if (filters.sortBy) {
    const order = filters.sortOrder || 'asc';
    query = query.order(filters.sortBy, { ascending: order === 'asc' });
  }

  const { data, error } = await query.returns<Product[]>();

  if (error) {
    throw new Error(`Failed to retrieve products: ${error.message}`);
  }

  if (!data) {
    throw new Error('No data returned');
  }

  return data;
};
