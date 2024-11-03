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

const ApproveCustomerDialog = ({ onApprove, onReject, isMutating, customer }: Props) => {
  const [open, setOpen] = useState(false);

  const canApprove = useMemo(() => {
    // Only require tax_id and tax_id_image_url for approval
    return !customer.approved && Boolean(customer.tax_id && customer.tax_id_image_url);
  }, [customer.approved, customer.tax_id, customer.tax_id_image_url]);

  return (
    <QuickDialog
      title={`${customer.approved ? 'Reject' : 'Approve'} Customer`}
      description={'Before approving or rejecting a customer, please review the information below.'}
      onOpenChange={setOpen}
      open={open}
      trigger={
        <Button
          variant={customer.approved ? 'minimal' : 'success'}
          size="sm"
          disabled={isMutating || (!customer.approved && !canApprove)}
        >
          {customer.approved ? (
            <OctagonX className="h-4 w-4" />
          ) : (
            <ShieldCheck className="h-4 w-4" />
          )}
          {customer.approved ? 'Reject' : 'Approve'}
        </Button>
      }
      content={
        <div className="my-4 flex items-end gap-12 space-y-4">
          {/* Tax ID Section */}
          {(customer.tax_id || customer.tax_id_image_url) && (
            <div className="space-y-2">
              {customer.tax_id && (
                <div>
                  <p className="text-xs text-gray-600">Submitted Tax ID</p>
                  <p>{customer.tax_id}</p>
                </div>
              )}
              {customer.tax_id_image_url && (
                <div>
                  <span className="mb-1 block text-xs text-muted-foreground">Tax ID Image</span>
                  <ImageViewer
                    src={customer.tax_id_image_url}
                    alt="Tax ID"
                    className="h-20 w-20 sm:h-24 sm:w-24"
                  />
                </div>
              )}
            </div>
          )}

          {/* Validation Alert */}
          {!customer.approved && !canApprove && (
            <Alert variant="destructive" className="my-4 -ml-1">
              <AlertDescription>
                Tax ID and Tax ID image are required for approval.
              </AlertDescription>
            </Alert>
          )}
        </div>
      }
      footer={
        <div className="flex gap-2 sm:justify-end">
          {customer.approved ? (
            <Button variant="destructive" size="sm" onClick={onReject} disabled={isMutating}>
              <OctagonX className="h-4 w-4" />
              Reject
            </Button>
          ) : (
            <Button
              variant="success"
              size="sm"
              onClick={onApprove}
              disabled={isMutating || !canApprove}
            >
              <ShieldCheck className="h-4 w-4" />
              Approve
            </Button>
          )}
        </div>
      }
    />
  );
};

export default ApproveCustomerDialog;
