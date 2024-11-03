// 'use client';

// import { Filter, X } from 'lucide-react';
// import { useEffect, useState } from 'react';

// import QuickSelect, { SelectOptions } from '@/components/quick/Select';
// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from '@/components/ui/sheet';
// import { Switch } from '@/components/ui/switch';
// import { useCategories } from '@/features/products/hooks/category-query-hooks';

// import { OrdersFilters } from '../hooks/orders-query-hook';
// import { useOrdersFiltersStore } from '../store/useOrdersFilters';

// const OrderFiltersSheet = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { filters, setFilter, resetFilters } = useOrdersFiltersStore();
//   const { data: categories } = useCategories();
//   const [tempFilters, setTempFilters] = useState<OrdersFilters>(filters);

//   // Update temp filters when store filters change (e.g., on reset)
//   useEffect(() => {
//     setTempFilters(filters);
//   }, [filters]);

//   const searchFields = [
//     { value: 'order_number', label: 'Order ID' },
//     { value: 'customer_name', label: 'Customer Name' },
//   ];

//   const sortOptions = [
//     { value: 'order_number', label: 'Order ID' },
//     { value: 'total_amount', label: 'Total Amount' },
//     { value: 'created_at', label: 'Date Created' },
//   ];

//   const orderStatusOptions = [
//     { value: 'pending', label: 'All Stock Status' },
//     { value: 'cancelled', label: 'In Stock' },
//     { value: 'completed', label: 'Out of Stock' },
//     { value: 'refunded', label: 'All Stock Status' },
//     { value: 'confirmed', label: 'In Stock' },
//     { value: 'preparing', label: 'Out of Stock' },
//   ];

//   const orderOptions = [
//     { label: 'Ascending', value: 'asc' },
//     { label: 'Descending', value: 'desc' },
//   ];

//   const handleSearchFieldToggle = (field: 'order_number' | 'customer_name') => {
//     const currentFields = tempFilters.searchFields || [];
//     const newFields = currentFields.includes(field)
//       ? currentFields.filter(f => f !== field)
//       : [...currentFields, field];
//     setTempFilters(prev => ({ ...prev, searchFields: newFields }));
//   };

//   const handleReset = () => {
//     resetFilters();
//     setIsOpen(false);
//   };

//   const handleStatusChange = (key: 'inStock' | 'published', value?: string) => {
//     const valueMap = {
//       true: true,
//       false: false,
//       undefined: undefined,
//     };
//     setTempFilters(prev => ({
//       ...prev,
//       [key]: valueMap[value as keyof typeof valueMap],
//     }));
//   };

//   const handleApplyFilters = () => {
//     // Apply all temp filters to the store
//     Object.entries(tempFilters).forEach(([key, value]) => {
//       setFilter(key as keyof OrdersFilters, value);
//     });
//     setIsOpen(false);
//   };

//   const categoryOptions: SelectOptions[] =
//     categories?.map(category => ({
//       label: category.name,
//       value: category.id,
//     })) ?? [];

//   return (
//     <Sheet
//       open={isOpen}
//       onOpenChange={open => {
//         setIsOpen(open);
//         if (open) {
//           // Reset temp filters to current store filters when opening
//           setTempFilters(filters);
//         }
//       }}
//     >
//       <SheetTrigger asChild>
//         <Button variant="minimal" className="mb-4">
//           <Filter className="h-5 w-5" /> Filter Records
//         </Button>
//       </SheetTrigger>
//       <SheetContent className="w-[400px]">
//         <SheetHeader>
//           <SheetTitle>Product Filters</SheetTitle>
//           <SheetDescription>Filter products by category, price, and more.</SheetDescription>
//         </SheetHeader>

//         <div className="mt-6 space-y-6">
//           {/* Search */}
//           <div className="space-y-2">
//             <Label>Search</Label>
//             <Input
//               placeholder="Search products..."
//               value={tempFilters.search || ''}
//               onChange={e => setTempFilters(prev => ({ ...prev, search: e.target.value }))}
//             />
//             <div className="space-y-2">
//               <Label className="text-sm text-muted-foreground">Search in:</Label>
//               <div className="space-y-2">
//                 {searchFields.map(field => (
//                   <div key={field.value} className="flex items-center space-x-2">
//                     <Checkbox
//                       id={field.value}
//                       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                       checked={tempFilters.searchFields?.includes(field.value as any)}
//                       className="data-[state=checked]:bg-black"
//                       onCheckedChange={() =>
//                         handleSearchFieldToggle(field.value as 'customer_name' | 'order_number')
//                       }
//                     />
//                     <label htmlFor={field.value} className="text-sm">
//                       {field.label}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           {/* Category Filters */}
//           <div className="space-y-2">
//             <Label>Category</Label>
//             <QuickSelect
//               placeholder="Select category"
//               options={categoryOptions}
//               value={tempFilters.category_id}
//               onValueChange={value => setTempFilters(prev => ({ ...prev, category_id: value }))}
//             />
//           </div>

//           {/* Status Filters */}
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <Label>Stock Status</Label>
//               <QuickSelect
//                 placeholder="Select stock status"
//                 options={stockStatusOptions}
//                 value={String(tempFilters.inStock)}
//                 onValueChange={value => handleStatusChange('inStock', value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Publication Status</Label>
//               <QuickSelect
//                 placeholder="Select publication status"
//                 options={publishStatusOptions}
//                 value={String(tempFilters.published)}
//                 onValueChange={value => handleStatusChange('published', value)}
//               />
//             </div>
//           </div>

//           {/* Discount Filters */}
//           <div className="flex w-full items-center justify-between space-x-2 rounded-sm border p-2">
//             <Label>Active Discounts</Label>
//             <Switch
//               checked={tempFilters.is_discounted}
//               onCheckedChange={e => setTempFilters(prev => ({ ...prev, is_discounted: e }))}
//             />
//           </div>

//           {/* Price Range */}
//           <div className="space-y-2">
//             <Label>Price Range</Label>
//             <div className="flex space-x-2">
//               <Input
//                 type="number"
//                 placeholder="Min"
//                 value={tempFilters.minPrice || ''}
//                 onChange={e =>
//                   setTempFilters(prev => ({
//                     ...prev,
//                     minPrice: Number(e.target.value) || undefined,
//                   }))
//                 }
//               />
//               <Input
//                 type="number"
//                 placeholder="Max"
//                 value={tempFilters.maxPrice || ''}
//                 onChange={e =>
//                   setTempFilters(prev => ({
//                     ...prev,
//                     maxPrice: Number(e.target.value) || undefined,
//                   }))
//                 }
//               />
//             </div>
//           </div>

//           {/* Sort Options */}
//           <div className="space-y-2">
//             <Label>Sort By</Label>
//             <QuickSelect
//               placeholder="Select sort field"
//               options={sortOptions}
//               value={tempFilters.sortBy}
//               // eslint-disable-next-line @typescript-eslint/no-explicit-any
//               onValueChange={value => setTempFilters(prev => ({ ...prev, sortBy: value as any }))}
//             />

//             <QuickSelect
//               placeholder="Select sort order"
//               options={orderOptions}
//               value={tempFilters.sortOrder}
//               onValueChange={value =>
//                 setTempFilters(prev => ({
//                   ...prev,
//                   sortOrder: value as 'asc' | 'desc',
//                 }))
//               }
//             />
//           </div>
//         </div>

//         <SheetFooter className="absolute bottom-0 left-0 right-0 bg-background p-6">
//           <div className="flex w-full space-x-2">
//             <Button variant="outline" onClick={handleReset} className="w-full">
//               <X className="mr-2 h-4 w-4" /> Reset
//             </Button>
//             <Button onClick={handleApplyFilters} className="w-full" variant={'black'}>
//               Apply Filters
//             </Button>
//           </div>
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   );
// };

// export default OrderFiltersSheet;
