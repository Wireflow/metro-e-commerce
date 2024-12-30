import { X } from 'lucide-react';

import AnimtedLoadingSpinner from '@/components/animation/AnimtedLoader';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  PermissionData,
  useCreatePermission,
} from '@/features/users/hooks/mutations/useCreatePermission';
import { CustomerPermission } from '@/features/users/hooks/queries/useCustomerPermissions';
import { useSalesFilter } from '@/features/users/hooks/queries/useSalesFilter';
import { cn } from '@/lib/utils';
import { formatPhoneNumber, truncate } from '@/utils/utils';

import { Customer } from '../../schemas/customer';

type Props = {
  search: string;
  setSearch: (search: string) => void;
  customer: Customer;
  permission: CustomerPermission[];
};

const PermissionsSearch = ({ search, setSearch, customer, permission }: Props) => {
  const {
    data: independentSales,
    isFetching,
    isError,
  } = useSalesFilter({
    roles: ['independent_sales'],
    searchQuery: search,
    enabled: !!search,
  });

  const { mutate: createPermission } = useCreatePermission();

  const permissionSalesIds = permission.map(p => p.salesperson_id);

  const handleSelectSales = ({ salespersonId, customerId }: PermissionData) => {
    setSearch('');
    createPermission({ salespersonId, customerId });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const filteredSales =
    independentSales?.filter(sale => !permissionSalesIds.includes(sale.id)) || [];

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search by name, email, or phone"
        value={search}
        onChange={handleSearch}
        className="w-full text-sm placeholder:text-gray-500 focus-visible:ring-0"
      />

      {isFetching && (
        <div className="absolute right-3 top-2.5 text-sm text-gray-700">
          <AnimtedLoadingSpinner size={20} />
        </div>
      )}
      {isError && (
        <div className="absolute right-3 top-2.5 text-sm text-gray-700">
          <X size={20} color="gray" />
        </div>
      )}

      <div
        className={cn(
          'absolute top-11 z-[1000] max-h-60 w-full overflow-auto rounded-lg rounded-t-none border border-gray-200 bg-white shadow-sm custom-scrollbar',
          filteredSales.length > 0 ? '' : 'hidden'
        )}
      >
        {filteredSales.map(sale => {
          const acronym = sale.first_name[0] + '' + sale.last_name[0];
          const fullName = `${sale.first_name} ${sale.last_name}`;
          return (
            <div
              key={sale.id}
              className="flex flex-col justify-between border-b px-4 py-4 last:border-b-0 hover:bg-gray-50 md:flex-row md:items-center"
            >
              <div className="flex items-center gap-5">
                <Avatar>
                  <AvatarFallback>{acronym}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-start text-sm font-medium">{truncate(fullName, 20)}</p>
                  <div className="flex flex-col items-start md:flex-row md:gap-1">
                    <p className={`text-xs text-gray-500`}>{sale.email}</p>
                    <p className={`hidden text-xs text-gray-500 md:block`}>{sale.phone && `•`}</p>
                    <p className={`text-xs text-gray-500`}>
                      {sale.phone && `${formatPhoneNumber(sale.phone)}`}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  size="sm"
                  variant="link"
                  onClick={() =>
                    handleSelectSales({
                      salespersonId: sale.id,
                      customerId: customer.id as string,
                    })
                  }
                >
                  Grant Access
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PermissionsSearch;
