import QuickDialog from '@/components/quick/Dialog';

import { Customer } from '../schemas/customer';
import { useCustomrPermissionsStore } from '../store/useCustomerPermissions';
import PersmissionsDialogContent from './PersmissionsDialogContent';

type Props = {
  customer: Customer;
};

const PermissionsDialog = ({ customer }: Props) => {
  const { setOpen, open } = useCustomrPermissionsStore();
  return (
    <QuickDialog
      className="h-[60vh]"
      open={open}
      onOpenChange={setOpen}
      title="Set Permissions"
      description="Select the user you want to give access to this customer"
      content={<PersmissionsDialogContent customer={customer} />}
    />
  );
};

export default PermissionsDialog;
