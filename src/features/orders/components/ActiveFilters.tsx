import { X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { OrdersFilters } from '../hooks/orders-query-hook';
import { useOrdersFiltersStore } from '../store/useOrdersFilters';

const formatFilterValue = (key: string, value: string): string => {
  if (value === undefined || value === '') return '';

  switch (key) {
    case 'minPrice':
    case 'maxPrice':
      return `$${value}`;
    case 'sortOrder':
      return value.toUpperCase();
    case 'showFailed':
      return value ? 'Yes' : 'No';
    case 'orderType':
      return value === 'undefined' ? 'All Orders' : value;
    case 'status':
      return value === 'undefined' ? 'All Order Status' : value;
    case 'sortBy':
      return value
        .split('_')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
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
    orderNumber: 'Order Number',
    minPrice: 'Min Price',
    maxPrice: 'Max Price',
    sortBy: 'Sort By',
    sortOrder: 'Sort Order',
    status: 'Status',
    showFailed: 'Show Failed',
    orderType: 'Order Type',
  };
  return labels[key] || key;
};

const ActiveFilters = () => {
  const { filters, resetFilters, updateFilters } = useOrdersFiltersStore();

  // Only include filters that have actual values (not undefined or empty string)
  const activeFilters = Object.entries(filters).filter(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, value]) =>
      value !== undefined && value !== '' && !(Array.isArray(value) && value.length === 0)
  );

  const handleRemoveFilter = (key: keyof OrdersFilters) => {
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
            {activeFilters.map(
              ([key, value]) =>
                key !== 'searchFields' && (
                  <Badge
                    key={key}
                    variant="secondary"
                    className="flex items-center gap-1 px-2 py-1"
                  >
                    <span className="font-medium">{getFilterLabel(key)}:</span>
                    <span className="capitalize">{formatFilterValue(key, value)}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFilter(key as keyof OrdersFilters)}
                      className="h-4 w-4 p-0 hover:bg-transparent"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveFilters;
