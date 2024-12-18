import { TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useDeletePermission } from '@/features/users/hooks/mutations/useDeletePermission';
import { CustomerPermission } from '@/features/users/hooks/queries/useCustomerPermissions';
import { formatDateToString } from '@/utils/dateUtils';

type Props = {
  permission: CustomerPermission;
};

const SalesPermissionCard = ({ permission }: Props) => {
  const { mutate: deletePermission, isPending } = useDeletePermission();

  const handleDelete = () => {
    deletePermission({
      customerId: permission.customer_id,
      salespersonId: permission.salesperson_id,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="font-medium">
            {permission.salesperson.first_name} {permission.salesperson.last_name}
          </div>
          {permission?.access_granted_date && (
            <div className="text-sm text-muted-foreground">
              Access granted: {formatDateToString(new Date(permission.access_granted_date))}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-sm text-muted-foreground">{permission.salesperson.email}</div>
      </CardContent>
      <CardFooter className="flex justify-end pt-2">
        <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isPending}>
          <TrashIcon className="mr-2 h-4 w-4" />
          Remove Access
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SalesPermissionCard;
