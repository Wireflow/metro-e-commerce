import { useState } from 'react';

import { DialogHeader } from '@/components/ui/dialog';
import { useCustomerPermissions } from '@/features/users/hooks/queries/useCustomerPermissions';

import { Customer } from '../../schemas/customer';
import PermissionsSearch from './PermissionsSearch';
import SalesPermissionCard from './SalesPermissionCard';

type Props = {
  customer: Customer;
};

const PermissionsDialogContent = ({ customer }: Props) => {
  const [search, setSearch] = useState('');
  const { data: permissions } = useCustomerPermissions(customer?.id ?? '');

  return (
    <div className="">
      <div className="relative">
        {/* Sticky search bar */}
        <div className="sticky top-0 z-10 bg-white">
          <DialogHeader>
            <PermissionsSearch
              permission={permissions || []}
              customer={customer}
              search={search}
              setSearch={setSearch}
            />
          </DialogHeader>
        </div>

        <div>
          {permissions && permissions.length > 0 ? (
            <div className="mt-2 flex flex-col gap-2">
              {permissions.map(p => (
                <SalesPermissionCard key={`${p.salesperson_id}-${p.customer_id}`} permission={p} />
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
      </div>
    </div>
  );
};

export default PermissionsDialogContent;
