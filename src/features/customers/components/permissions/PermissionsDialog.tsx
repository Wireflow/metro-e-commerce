import QuickDialog from '@/components/quick/Dialog';

import { useCustomrPermissionsStore } from '../../store/useCustomerPermissions';
import PersmissionsDialogContent from './PersmissionsDialogContent';

type Props = {};

const PermissionsDialog = () => {
  const { setOpen, open, customer } = useCustomrPermissionsStore();

  if (!customer) return null;

  return (
    <QuickDialog
      className="flex h-[50vh] flex-col gap-5"
      open={open}
      onOpenChange={setOpen}
      title="Set Permissions"
      description="Give access to this customer"
      content={<PersmissionsDialogContent customer={customer} />}
    />
  );
};

export default PermissionsDialog;
