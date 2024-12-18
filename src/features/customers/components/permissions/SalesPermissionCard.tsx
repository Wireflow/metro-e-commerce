import { TrashIcon } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useDeletePermission } from '@/features/users/hooks/mutations/useDeletePermission';
import { CustomerPermission } from '@/features/users/hooks/queries/useCustomerPermissions';

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
      <CardContent className="flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-gray-200 text-sm font-semibold">
              {permission.salesperson.first_name[0]}.{permission.salesperson.last_name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="r flex flex-col justify-between">
            <div>
              <p className="text-sm font-semibold">
                {permission.salesperson.first_name} {permission.salesperson.last_name}
              </p>
              <p className="text-xs text-muted-foreground">{permission.salesperson.email}</p>
            </div>
          </div>
        </div>
        <Button
          variant="destructive"
          size="icon"
          className="rounded-full"
          onClick={handleDelete}
          disabled={isPending}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default SalesPermissionCard;
