'use client';

import { Filter, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import QuickSelect from '@/components/quick/Select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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

import {
  CustomerFilters,
  CustomerSearchFields,
  CustomerSortFields,
} from '../hooks/customer-paginated-query';
import { useCustomerFiltersStore } from '../store/useCustomerFilters';

const CustomerFiltersSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { filters, setFilter, resetFilters } = useCustomerFiltersStore();
  const [tempFilters, setTempFilters] = useState<CustomerFilters>(filters);

  // Update temp filters when store filters change (e.g., on reset)
  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const searchFields = [
    { value: 'business_name', label: 'Business Name' },
    { value: 'phone', label: 'Phone Number' },
    { value: 'street', label: 'Address' },
    { value: 'tax_id', label: 'Tax ID' },
    { value: 'tobacco_license', label: 'Tobacco License' },
    { value: 'email', label: 'Email' },
    { value: 'zip_code', label: 'Zip Code' },
    { value: 'city', label: 'City' },
    { value: 'state', label: 'State' },
    { value: 'first_name', label: 'First Name' },
    { value: 'last_name', label: 'Last Name' },
  ];

  const sortOptions = [
    { value: 'customer_type', label: 'Business Type' },
    { value: 'approved', label: 'Approval Status' },
    { value: 'blocked', label: 'Blocked Status' },
    { value: 'updated_at', label: 'Date Updated' },
    { value: 'created_at', label: 'Date Created' },
  ];

  const approvalOptions = [
    { value: 'undefined', label: 'All Customers' },
    { value: 'true', label: 'Approved' },
    { value: 'false', label: 'Pending Approval' },
  ];

  const blockedOptions = [
    { value: 'undefined', label: 'All Customers' },
    { value: 'true', label: 'Blocked' },
    { value: 'false', label: 'Active' },
  ];

  const customerTypeOptions = [
    { value: 'undefined', label: 'All Customers' },
    { value: 'wholesale', label: 'Wholesale' },
    { value: 'retail', label: 'Retail' },
  ];

  const orderOptions = [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' },
  ];

  const handleSearchFieldToggle = (field: CustomerSearchFields) => {
    const currentFields = tempFilters.searchFields || [];
    const newFields = currentFields.includes(field)
      ? currentFields.filter(f => f !== field)
      : [...currentFields, field];
    setTempFilters(prev => ({ ...prev, searchFields: newFields }));
  };

  const handleReset = () => {
    resetFilters();
    setIsOpen(false);
  };

  const handleStatusChange = (key: 'approved' | 'blocked' | 'customer_type', value?: string) => {
    const valueMap = {
      true: true,
      false: false,
      undefined: undefined,
      wholesale: 'wholesale',
      retail: 'retail',
    };
    setTempFilters(prev => ({
      ...prev,
      [key]: valueMap[value as keyof typeof valueMap],
    }));
  };

  const handleApplyFilters = () => {
    Object.entries(tempFilters).forEach(([key, value]) => {
      setFilter(key as keyof CustomerFilters, value);
    });
    setIsOpen(false);
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={open => {
        setIsOpen(open);
        if (open) {
          setTempFilters(filters);
        }
      }}
    >
      <SheetTrigger asChild>
        <Button variant="minimal" className="mb-4">
          <Filter className="h-5 w-5" /> Filter Customers
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px]">
        <SheetHeader>
          <SheetTitle>Customer Filters</SheetTitle>
          <SheetDescription>Filter customers by type, status, and more.</SheetDescription>
        </SheetHeader>

        <div className="flex-1">
          <div className="mt-6 space-y-6 pb-20">
            {/* Search */}
            <div className="space-y-2">
              <Label>Search</Label>
              <Input
                placeholder="Search customers..."
                value={tempFilters.search || ''}
                onChange={e => setTempFilters(prev => ({ ...prev, search: e.target.value }))}
              />
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Search in:</Label>
                <div className="space-y-2">
                  {searchFields.map(field => (
                    <div key={field.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={field.value}
                        checked={tempFilters.searchFields?.includes(
                          field.value as CustomerSearchFields
                        )}
                        className="data-[state=checked]:bg-black"
                        onCheckedChange={() =>
                          handleSearchFieldToggle(field.value as CustomerSearchFields)
                        }
                      />
                      <label htmlFor={field.value} className="text-sm">
                        {field.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status Filters */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Customer Type</Label>
                <QuickSelect
                  placeholder="Select customer type"
                  options={customerTypeOptions}
                  value={String(tempFilters.customer_type)}
                  onValueChange={value => handleStatusChange('customer_type', value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Approval Status</Label>
                <QuickSelect
                  placeholder="Select approval status"
                  options={approvalOptions}
                  value={String(tempFilters.approved)}
                  onValueChange={value => handleStatusChange('approved', value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Account Status</Label>
                <QuickSelect
                  placeholder="Select account status"
                  options={blockedOptions}
                  value={String(tempFilters.blocked)}
                  onValueChange={value => handleStatusChange('blocked', value)}
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
                onValueChange={value =>
                  setTempFilters(prev => ({ ...prev, sortBy: value as CustomerSortFields }))
                }
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
export default CustomerFiltersSheet;
