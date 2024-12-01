import { CheckCircle } from 'lucide-react';

import ActionsPopover from '@/components/quick/ActionsPopover';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Row } from '@/types/supabase/table';
import { formatAddress } from '@/utils/utils';

import { useDeleteAddress } from '../../hooks/mutations/useDeleteAddress';

export type AddressOptions = {
  showTitle?: boolean;
  showName?: boolean;
  showAddress?: boolean;
  showAction?: boolean;
  showSelection?: boolean;
  showOptions?: boolean;
};

interface AddressCardProps {
  address: Row<'addresses'>;
  title?: (address: Row<'addresses'>) => string;
  action?: React.ReactNode;
  onSelect?: (address: Row<'addresses'>) => void;
  selected?: Row<'addresses'> | null;
  options?: AddressOptions;
}

const AddressCard = ({
  address,
  action,
  title,
  onSelect,
  selected,
  options = {},
}: AddressCardProps) => {
  const {
    showTitle = true,
    showName = true,
    showAddress = true,
    showAction = true,
    showSelection = false,
    showOptions = true,
  } = options;

  const displayTitle = title?.(address) ?? `${address.type} Address`;
  const isSelected = selected?.id === address.id;

  const { mutate: deleteAddress, isPending: deleting } = useDeleteAddress();

  return (
    <Card
      className={`relative shadow-none transition-all duration-300 ${onSelect ? 'cursor-pointer hover:bg-gray-50' : ''} ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
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
            <p className="font-medium">{address.name}</p>
          </div>
        )}
        {showAddress && (
          <div>
            <p className="text-xs text-gray-500">Address</p>
            <p>{formatAddress(address)}</p>
          </div>
        )}
        {showAction && action}
      </CardContent>
    </Card>
  );
};

export default AddressCard;
