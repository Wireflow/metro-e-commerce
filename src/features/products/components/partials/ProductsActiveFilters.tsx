import { X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { ProductFilters, useCategoryById } from '../../hooks/product-query-hooks';
import { useProductFiltersStore } from '../../store/useProductFilters';

const getFilterLabel = (key: string): string => {
  const labels: Record<string, string> = {
    search: 'Search',
    searchFields: 'Search Fields',
    inStock: 'In Stock',
    published: 'Published',
    category_id: 'Category',
    minPrice: 'Min Price',
    maxPrice: 'Max Price',
    sortBy: 'Sort By',
    sortOrder: 'Sort Order',
    is_discounted: 'Discounted',
  };
  return labels[key] || key;
};

const ProductActiveFilters = () => {
  const { filters, resetFilters, updateFilters } = useProductFiltersStore();

  // Only include filters that have actual values (not undefined or empty string)
  const activeFilters = Object.entries(filters).filter(
    ([key, value]) =>
      value !== undefined &&
      value !== '' &&
      !(Array.isArray(value) && value.length === 0) &&
      key !== 'searchFields'
  );

  const handleRemoveFilter = (key: keyof ProductFilters) => {
    updateFilters({ [key]: undefined });
  };

  const { data: category } = useCategoryById(filters.category_id as string);

  const formatFilterValue = (key: string, value: string): string => {
    if (value === undefined || value === '') return '';

    switch (key) {
      case 'minPrice':
      case 'maxPrice':
        return `$${value}`;
      case 'sortOrder':
        return value.toUpperCase();
      case 'sortBy':
        return value
          .split('_')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      case 'inStock':
      case 'published':
      case 'is_discounted':
        return value ? 'Yes' : 'No';
      case 'searchFields':
        return '';
      case 'category_id':
        return category?.name ?? '';
      default:
        return String(value);
    }
  };
  return (
    <Card className="w-full border-none shadow-none">
      <CardContent className="p-0 pb-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium">Filters</h3>
          {activeFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          )}
        </div>

        {activeFilters.length === 0 ? (
          <p className="text-sm text-muted-foreground">No active filters</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {activeFilters.map(([key, value]) => (
              <Badge key={key} variant="secondary" className="flex items-center gap-1 px-2 py-1">
                <span className="font-medium">{getFilterLabel(key)}:</span>
                <span className="capitalize">{formatFilterValue(key, value)}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFilter(key as keyof ProductFilters)}
                  className="h-4 w-4 p-0 hover:bg-transparent"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductActiveFilters;
