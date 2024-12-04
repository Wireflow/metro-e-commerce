import { CheckCircle } from 'lucide-react';

import ActionsPopover from '@/components/quick/ActionsPopover';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import { Row } from '@/types/supabase/table';
import { formatAddress, formatPhoneNumber } from '@/utils/utils';

import { useDeleteAddress } from '../../hooks/mutations/useDeleteAddress';

export type AddressOptions = {
  showTitle?: boolean;
  showName?: boolean;
  showAddress?: boolean;
  showAction?: boolean;
  showSelection?: boolean;
  showOptions?: boolean;
  showEmail?: boolean;
  showPhone?: boolean;
};

interface AddressCardProps {
  address?: Row<'addresses'>;
  title?: (address: Row<'addresses'>) => string;
  action?: React.ReactNode;
  onSelect?: (address: Row<'addresses'>) => void;
  selected?: Row<'addresses'> | null;
  options?: AddressOptions;
  className?: string;
  placeholderTitle?: string;
}

const AddressCard = ({
  address,
  action,
  title,
  onSelect,
  className,
  selected,
  placeholderTitle = 'Address',
  options = {},
}: AddressCardProps) => {
  const { metadata } = useUser();
  const { mutate: deleteAddress, isPending: deleting } = useDeleteAddress();

  const {
    showTitle = true,
    showName = true,
    showAddress = true,
    showAction = true,
    showSelection = false,
    showOptions = true,
    showEmail = false,
    showPhone = false,
  } = options;

  if (!address) {
    return (
      <Card
        className={cn(
          `relative shadow-none transition-all duration-300 ${onSelect ? 'cursor-pointer hover:bg-gray-50' : ''}`,
          className
        )}
      >
        <CardHeader className="border-b pb-3 pt-4">
          <CardTitle className="font-medium capitalize">{placeholderTitle}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 pb-4 pt-3">
          <div>
            <p className="text-xs text-gray-500">Name</p>
            <p className="font-medium">N/A</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Address</p>
            <p>N/A</p>
          </div>
          {showAction && action}
        </CardContent>
      </Card>
    );
  }

  const displayTitle = title?.(address) ?? `${address.type} Address`;
  const isSelected = selected?.id === address.id;

  return (
    <Card
      className={cn(
        `relative shadow-none transition-all duration-300 ${onSelect ? 'cursor-pointer hover:bg-gray-50' : ''} ${
          isSelected ? 'ring-2 ring-primary' : ''
        }`,
        className
      )}
      onClick={() => onSelect?.(address)}
    >
      {!isSelected && showOptions && (
        <ActionsPopover
          disabled={deleting}
          className="absolute right-2 top-2"
          onDelete={() => deleteAddress(address.id)}
        />
      )}

      {isSelected && showSelection && (
        <div className="absolute right-2 top-2 transition-all duration-200">
          <CheckCircle className="h-5 w-5 text-primary" />
        </div>
      )}
      {showTitle && (
        <CardHeader className="border-b pb-3 pt-4">
          <CardTitle className="font-medium capitalize">{displayTitle}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="flex flex-col gap-2 pb-4 pt-3">
        {showName && address.name && (
          <div>
            <p className="text-xs text-gray-500">Name</p>
            <p className="font-medium capitalize">{address.name}</p>
          </div>
        )}
        {showAddress && (
          <div>
            <p className="text-xs text-gray-500">Address</p>
            <p className="text-sm">{formatAddress(address)}</p>
          </div>
        )}
        {showEmail && metadata?.email && (
          <div>
            <p className="text-xs text-gray-500">Email</p>
            <p className="font-medium">{metadata?.email}</p>
          </div>
        )}
        {showPhone && metadata?.phone && (
          <div>
            <p className="text-xs text-gray-500">Phone</p>
            <p className="font-medium">{formatPhoneNumber(metadata?.phone)}</p>
          </div>
        )}
        {showAction && action}
      </CardContent>
    </Card>
  );
};

export default AddressCard;
