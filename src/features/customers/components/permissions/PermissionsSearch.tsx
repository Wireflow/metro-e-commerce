import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  PermissionData,
  useCreatePermission,
} from '@/features/users/hooks/mutations/useCreatePermission';
import { CustomerPermission } from '@/features/users/hooks/queries/useCustomerPermissions';
import { useIndependentSales } from '@/features/users/hooks/queries/useIndependentSales';
import { cn } from '@/lib/utils';

import { Customer } from '../../schemas/customer';

type Props = {
  search: string;
  setSearch: (search: string) => void;
  customer: Customer;
  permission: CustomerPermission[];
};

const PermissionsSearch = ({ search, setSearch, customer, permission }: Props) => {
  const { data: independentSales } = useIndependentSales();
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
    independentSales?.filter(sale =>
      search.trim() === ''
        ? false
        : `${sale.first_name} ${sale.last_name}`.toLowerCase().includes(search.toLowerCase()) &&
          !permissionSalesIds.includes(sale.id)
    ) || [];

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search Independent Salesperson"
        value={search}
        onChange={handleSearch}
        className="w-full text-sm"
      />

      <div
        className={cn(
          'absolute top-11 z-[1000] max-h-60 w-full overflow-auto rounded-lg rounded-t-none border border-gray-200 bg-white shadow-sm custom-scrollbar',
          filteredSales.length > 0 ? '' : 'hidden'
        )}
      >
        {filteredSales.map(sale => {
          const acronym = sale.first_name[0] + '' + sale.last_name[0];
          return (
            <div
              key={sale.id}
              className="flex items-center justify-between border-b px-4 py-4 last:border-b-0 hover:bg-gray-50"
            >
              <p className="flex items-center gap-5 text-sm font-medium">
                <Avatar>
                  <AvatarFallback>{acronym}</AvatarFallback>
                </Avatar>{' '}
                {sale.first_name} {sale.last_name}
              </p>
              <Button
                size={'sm'}
                variant={'link'}
                onClick={() =>
                  handleSelectSales({
                    salespersonId: sale.id,
                    customerId: customer.id as string,
                  })
                }
              >
                Give Permission
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PermissionsSearch;
