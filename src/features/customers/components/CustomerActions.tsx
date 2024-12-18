import { EllipsisVertical, Eye, Pencil, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type Props = {
  customerId: string;
  approved: boolean;
  blocked: boolean;
  onEdit?: () => void;
  onView?: () => void;
  onPremission?: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomerActions = ({
  customerId,
  approved,
  onEdit,
  blocked,
  onView,
  onPremission,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48" align="end">
          <div className="grid gap-1">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                className="flex w-full items-center justify-start gap-2"
                onClick={() => {
                  onEdit();
                  setIsOpen(false);
                }}
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            )}
            {onView && (
              <Button
                variant="ghost"
                size="sm"
                className="flex w-full items-center justify-start gap-2"
                onClick={() => {
                  onView();
                  setIsOpen(false);
                }}
              >
                <Eye className="h-4 w-4" />
                View
              </Button>
            )}
            {onPremission && (
              <Button
                variant="ghost"
                size="sm"
                className="flex w-full items-center justify-start gap-2"
                onClick={() => {
                  onPremission();
                  setIsOpen(false);
                }}
              >
                <ShieldCheck className="h-4 w-4" />
                Set Permissions
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default CustomerActions;
