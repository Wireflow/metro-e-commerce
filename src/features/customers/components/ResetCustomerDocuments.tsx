import { RefreshCcw } from 'lucide-react';
import { useState } from 'react';

import QuickDialog from '@/components/quick/Dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

type Props = {
  onResetDocuments: () => void;
  isResetting: boolean;
};

const ResetCustomerDocuments = ({ onResetDocuments, isResetting }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <QuickDialog
      title={'Reset Customer Documents'}
      description={'Are you sure you want to reset the customer documents?'}
      onOpenChange={setOpen}
      open={open}
      trigger={
        <Button variant={'warning'} size="sm" disabled={isResetting}>
          <RefreshCcw className="h-4 w-4" />
          Reset Documents
        </Button>
      }
      content={
        <Alert variant="warning" className="my-4 -ml-1">
          <AlertTitle className="font-bold">Please be aware</AlertTitle>
          <AlertDescription>
            This will reset the customer documents and approval status to the default values.
          </AlertDescription>
          <AlertTitle className="mt-4 font-bold text-gray-500">This cannot be undone</AlertTitle>

          <AlertDescription className="text-gray-500">
            Meaning their approval status will be revoked and their documents will be removed.
          </AlertDescription>
        </Alert>
      }
      footer={
        <div className="flex gap-2 sm:justify-end">
          <Button variant="warning" size="sm" onClick={onResetDocuments} disabled={isResetting}>
            <RefreshCcw className="h-4 w-4" />
            Reset Now
          </Button>
        </div>
      }
    />
  );
};

export default ResetCustomerDocuments;
