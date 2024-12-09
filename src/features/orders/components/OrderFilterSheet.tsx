'use client';

import { Filter, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import QuickSelect from '@/components/quick/Select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';

import { OrdersFilters } from '../hooks/orders-query-hook';
import { useOrdersFiltersStore } from '../store/useOrdersFilters';

const OrderFiltersSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { filters, setFilter, resetFilters } = useOrdersFiltersStore();
  const [tempFilters, setTempFilters] = useState<OrdersFilters>(filters);

  // Update temp filters when store filters change (e.g., on reset)
  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const sortOptions = [
    { value: 'order_number', label: 'Order ID' },
    { value: 'total_amount', label: 'Total Amount' },
    { value: 'created_at', label: 'Date Created' },
  ];

  const orderStatusOptions = [
    { value: 'undefined', label: 'All Order Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'completed', label: 'Completed' },
    { value: 'refunded', label: 'Refunded' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'created', label: 'Failed' },
  ];

  const orderOptions = [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' },
  ];

  const handleOrderNumberFieldSearch = (orderNumber: string) => {
    if (orderNumber.length === 0) {
      setTempFilters(prev => ({ ...prev, orderNumber: undefined }));
      return;
    }
    setTempFilters(prev => ({ ...prev, orderNumber: orderNumber }));
  };

  const handleReset = () => {
    resetFilters();
    setIsOpen(false);
  };

  type OrderStatus =
    | 'pending'
    | 'cancelled'
    | 'completed'
    | 'refunded'
    | 'confirmed'
    | 'preparing'
    | undefined;

  const handleStatusChange = (key: 'status', value?: string) => {
    setTempFilters(prev => ({
      ...prev,
      [key]: value as OrderStatus,
    }));
  };

  const handleApplyFilters = () => {
    // Apply all temp filters to the store
    Object.entries(tempFilters).forEach(([key, value]) => {
      setFilter(key as keyof OrdersFilters, value);
    });
    setIsOpen(false);
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={open => {
        setIsOpen(open);
        if (open) {
          // Reset temp filters to current store filters when opening
          setTempFilters(filters);
        }
      }}
    >
      <SheetTrigger asChild>
        <Button variant="minimal" className="mb-4">
          <Filter className="h-5 w-5" /> Filter Records
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px]">
        <SheetHeader>
          <SheetTitle>Orders Filters</SheetTitle>
          <SheetDescription>
            Filter orders by Business name, Order number, and more.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Search */}
          <div className="space-y-2">
            <Label>Search by business name</Label>
            <Input
              placeholder="Search order by business name..."
              value={tempFilters.search || ''}
              onChange={e => setTempFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label>Search by order number</Label>
            <Input
              onKeyDown={e => {
                if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-') {
                  e.preventDefault();
                }
              }}
              type="number"
              placeholder="Search order number..."
              value={tempFilters.orderNumber || ''}
              onChange={e => {
                handleOrderNumberFieldSearch(e.target.value as string);
              }}
            />
          </div>

          {/* Category Filters */}

          {/* Status Filters */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Order Status</Label>
              <QuickSelect
                placeholder="Select order status"
                options={orderStatusOptions}
                value={String(tempFilters.status)}
                onValueChange={value => handleStatusChange('status', value)}
              />
            </div>
          </div>

          <div className="flex w-full items-center justify-between space-x-2 rounded-sm border p-2">
            <Label>Show Failed</Label>
            <Switch
              checked={tempFilters.showFailed}
              onCheckedChange={e => setTempFilters(prev => ({ ...prev, showFailed: e }))}
            />
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <Label>Price Range</Label>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Min"
                value={tempFilters.minPrice || ''}
                onChange={e =>
                  setTempFilters(prev => ({
                    ...prev,
                    minPrice: Number(e.target.value) || undefined,
                  }))
                }
              />
              <Input
                type="number"
                placeholder="Max"
                value={tempFilters.maxPrice || ''}
                onChange={e =>
                  setTempFilters(prev => ({
                    ...prev,
                    maxPrice: Number(e.target.value) || undefined,
                  }))
                }
              />
            </div>
          </div>

          {/* Sort Options */}
          <div className="space-y-2">
            <Label>Sort By</Label>
            <QuickSelect
              placeholder="Select sort field"
              options={sortOptions}
              value={tempFilters.sortBy}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onValueChange={value => setTempFilters(prev => ({ ...prev, sortBy: value as any }))}
            />

            <QuickSelect
              placeholder="Select sort order"
              options={orderOptions}
              value={tempFilters.sortOrder}
              onValueChange={value =>
                setTempFilters(prev => ({
                  ...prev,
                  sortOrder: value as 'asc' | 'desc',
                }))
              }
            />
          </div>
        </div>

        <SheetFooter className="absolute bottom-0 left-0 right-0 bg-background p-6">
          <div className="flex w-full space-x-2">
            <Button variant="outline" onClick={handleReset} className="w-full">
              <X className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button onClick={handleApplyFilters} className="w-full" variant={'black'}>
              Apply Filters
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default OrderFiltersSheet;
