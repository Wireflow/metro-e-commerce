/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductFilters } from '../hooks/product-query-hooks';

export const buildProductQuery = (query: any, filters: ProductFilters) => {
  let filteredQuery = query;

  // Apply text search
  if (filters.search) {
    const searchFields = filters.searchFields || ['name', 'description', 'manufacturer'];
    const searchConditions = searchFields.map(field => `${field}.ilike.%${filters.search}%`);
    filteredQuery = filteredQuery.or(searchConditions.join(','));
  }

  // Apply boolean filters
  if (filters.inStock !== undefined) {
    filteredQuery = filteredQuery.eq('in_stock', filters.inStock);
  }

  if (filters.published !== undefined) {
    filteredQuery = filteredQuery.eq('published', filters.published);
  }

  // Apply category filter
  if (filters.category) {
    filteredQuery = filteredQuery.eq('category', filters.category);
  }

  // Apply price range
  if (filters.minPrice !== undefined) {
    filteredQuery = filteredQuery.gte('price', filters.minPrice);
  }

  if (filters.maxPrice !== undefined) {
    filteredQuery = filteredQuery.lte('price', filters.maxPrice);
  }

  // Apply sorting
  if (filters.sortBy) {
    const order = filters.sortOrder || 'asc';
    filteredQuery = filteredQuery.order(filters.sortBy, { ascending: order === 'asc' });
  }

  return filteredQuery;
};
