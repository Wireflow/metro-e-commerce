import { X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { CategoryFilters } from '../../hooks/category-paginated-query';
import { useCategoryFiltersStore } from '../../store/useCategoryFilters';

const formatFilterValue = (key: string, value: string): string => {
  if (value === undefined || value === '') return '';

  switch (key) {
    case 'sortOrder':
      return value.toUpperCase();
    case 'sortBy':
      const sortByLabels: Record<string, string> = {
        product_count: 'Product Count',
        name: 'Name',
        created_at: 'Created At',
        sales: 'Sales',
      };
      return sortByLabels[value] || value;
    case 'searchFields':
      return '';
    default:
      return String(value);
  }
};

const getFilterLabel = (key: string): string => {
  const labels: Record<string, string> = {
    search: 'Search',
    searchFields: 'Search Fields',
    sortBy: 'Sort By',
    sortOrder: 'Sort Order',
  };
  return labels[key] || key;
};

const CategoryActiveFilters = () => {
  const { filters, resetFilters, updateFilters } = useCategoryFiltersStore();

  // Only include filters that have actual values (not undefined or empty string)
  const activeFilters = Object.entries(filters).filter(
    ([key, value]) =>
      value !== undefined &&
      value !== '' &&
      !(Array.isArray(value) && value.length === 0) &&
      key !== 'searchFields'
  );

  const handleRemoveFilter = (key: keyof CategoryFilters) => {
    updateFilters({ [key]: undefined });
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
                  onClick={() => handleRemoveFilter(key as keyof CategoryFilters)}
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

export default CategoryActiveFilters;
