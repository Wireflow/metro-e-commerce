import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Row } from '@/types/supabase/table';
import { formatDateToString } from '@/utils/dateUtils';

type Props = {
  shipping: Row<'order_shipping'> | null;
};

const ShippingInfo = ({ shipping }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyTracking = () => {
    if (shipping?.tracking_number) {
      navigator.clipboard
        .writeText(shipping.tracking_number)
        .then(() => {
          setIsCopied(true);
          toast.success('Tracking Number Copied');
          setTimeout(() => {
            setIsCopied(false);
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy:', err);
          toast.error('Failed to copy tracking number');
        });
    }
  };

  return (
    <Card className="p-3 shadow-none">
      <div className="space-y-3 px-6">
        <h1 className="text-xl font-semibold">Shipment Info</h1>

        <div className="space-y-2">
          <div className="flex flex-col flex-wrap gap-2">
            <div className="flex flex-col">
              <span className="text-lg font-semibold">Carrier</span>
              <p className="text-sm text-neutral-600">{shipping?.provider ?? 'Pending Shipment'}</p>
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-semibold">Tracking Number</span>
              <div className="flex w-fit items-center gap-2">
                <p className="flex-grow text-sm text-neutral-600">
                  {shipping?.tracking_number ?? 'Not Available'}
                </p>

                {shipping?.tracking_number && (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-1 hover:bg-neutral-100"
                      onClick={handleCopyTracking}
                    >
                      {isCopied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {shipping?.shipped_at && (
              <div className="flex flex-col">
                <span className="text-lg font-medium">Shipped Date</span>
                <p className="text-sm text-neutral-600">
                  {formatDateToString(new Date(shipping.shipped_at))}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ShippingInfo;
