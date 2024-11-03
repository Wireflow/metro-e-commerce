import { OctagonX, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';

import QuickDialog from '@/components/quick/Dialog';
import ImageViewer from '@/components/quick/ImageViewer';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

import { Customer } from '../schemas/customer';

type Props = {
  onApprove: () => void;
  onReject: () => void;
  isMutating: boolean;
  customer: Customer;
};

const ApproveTobaccoDialog = ({ onApprove, onReject, isMutating, customer }: Props) => {
  const [open, setOpen] = useState(false);

  const canApprove = useMemo(() => {
    return (
      !customer.approved_tobacco &&
      Boolean(customer.tobacco_license && customer.tobacco_license_image_url)
    );
  }, [customer.approved_tobacco, customer.tobacco_license, customer.tobacco_license_image_url]);

  return (
    <QuickDialog
      title={`${customer.approved_tobacco ? 'Reject Tobacco' : 'Approve Tobacco'} Customer`}
      description={'Before approving or rejecting a customer, please review the information below.'}
      onOpenChange={setOpen}
      open={open}
      trigger={
        <Button
          variant={customer.approved_tobacco ? 'minimal' : 'success'}
          size="sm"
          disabled={isMutating || (!customer.approved_tobacco && !canApprove)}
        >
          {customer.approved_tobacco ? (
            <OctagonX className="h-4 w-4" />
          ) : (
            <ShieldCheck className="h-4 w-4" />
          )}
          {customer.approved_tobacco ? 'Reject Tobacco' : 'Approve Tobacco'}
        </Button>
      }
      content={
        <div className="my-4 flex items-end gap-12 space-y-4">
          {/* Tobacco License Section - Only show if either field exists */}
          {(customer.tobacco_license || customer.tobacco_license_image_url) && (
            <div className="space-y-2">
              {customer.tobacco_license && (
                <div>
                  <p className="text-xs text-gray-600">Submitted Tobacco License</p>
                  <p>{customer.tobacco_license}</p>
                </div>
              )}
              {customer.tobacco_license_image_url && (
                <div>
                  <span className="mb-1 block text-xs text-muted-foreground">Tobacco License</span>
                  <ImageViewer
                    src={customer.tobacco_license_image_url}
                    alt="Tobacco License"
                    className="h-20 w-20 sm:h-24 sm:w-24"
                  />
                </div>
              )}
            </div>
          )}

          {/* Validation Alert */}
          {!customer.approved_tobacco && !canApprove && (
            <Alert variant="destructive" className="my-4 -ml-1">
              <AlertDescription>
                Tobacco license and tobacco license image are required for approval.
              </AlertDescription>
            </Alert>
          )}
        </div>
      }
      footer={
        <div className="flex gap-2 sm:justify-end">
          {customer.approved_tobacco ? (
            <Button variant="destructive" size="sm" onClick={onReject} disabled={isMutating}>
              <OctagonX className="h-4 w-4" />
              Reject Tobacco
            </Button>
          ) : (
            <Button
              variant="success"
              size="sm"
              onClick={onApprove}
              disabled={isMutating || !canApprove}
            >
              <ShieldCheck className="h-4 w-4" />
              Approve Tobacco
            </Button>
          )}
        </div>
      }
    />
  );
};

export default ApproveTobaccoDialog;
