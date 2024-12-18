import { useState } from 'react';

import { Input } from '@/components/ui/input';
import {
  PermissionData,
  useCreatePermission,
} from '@/features/users/hooks/mutations/useCreatePermission';
import { useIndependentSales } from '@/features/users/hooks/queries/useIndependentSales';

import { Customer } from '../schemas/customer';

type Props = {
  customer: Customer;
};

const PermissionsDialogContent = ({ customer }: Props) => {
  const [search, setSearch] = useState('');
  const { data: independentSales } = useIndependentSales();
  const { mutate: createPermission } = useCreatePermission();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSelectSales = ({ salespersonId, customerId }: PermissionData) => {
    createPermission({ salespersonId, customerId });
  };
  const filteredSales =
    independentSales?.filter(sale =>
      search.trim() === ''
        ? false
        : `${sale.first_name} ${sale.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
          sale.id?.toString().includes(search)
    ) || [];

  return (
    <div className="mt-5">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search Independent Sales"
          value={search}
          onChange={handleSearch}
          className="w-full"
        />
      </div>

      {filteredSales.length > 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          {filteredSales.map(sale => (
            <div
              onClick={() =>
                handleSelectSales({ salespersonId: sale.id, customerId: customer.id as string })
              }
              key={sale.id}
              className="flex items-center justify-between border-b px-4 py-4 last:border-b-0 hover:bg-gray-50"
            >
              <p className="text-sm font-medium">
                {sale.first_name} {sale.last_name}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500">
          {search.trim() === ''
            ? 'Start typing to search sales'
            : 'No sales found matching your search'}
        </div>
      )}
    </div>
  );
};

export default PermissionsDialogContent;
