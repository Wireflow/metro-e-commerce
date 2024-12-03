import { useState } from 'react';

import QuickDialog from '@/components/quick/Dialog';
import { cn } from '@/lib/utils';
import { Row } from '@/types/supabase/table';

import AddressForm from '../forms/AddressForm';
import AddressCard, { AddressOptions } from './AddressCard';
import NewAddressCard from './NewAddressCard';

type Props = {
  addresses: Row<'addresses'>[];
  onSelect?: (address: Row<'addresses'> | null) => void;
  selected?: Row<'addresses'> | null;
  containerClassName?: string;
  cardOptions?: AddressOptions;
  showForm?: boolean;
};

const defaultCardOptions: AddressOptions = {
  showTitle: false,
  showSelection: true,
};

const AddressesList = ({
  addresses = [],
  onSelect,
  selected,
  containerClassName,
  cardOptions = defaultCardOptions,
  showForm = true,
}: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddressFormSuccess = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3', containerClassName)}>
      {addresses.map(address => (
        <AddressCard
          key={address.id}
          address={address}
          options={cardOptions}
          onSelect={onSelect}
          selected={selected}
        />
      ))}
      {showForm && (
        <QuickDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          title="New Billing Address"
          description="Add a new billing address to your account"
          className="max-w-[600px]"
          content={
            <div className="mt-4">
              <AddressForm type="billing" onSuccess={handleAddressFormSuccess} />
            </div>
          }
          trigger={<NewAddressCard onClick={() => setIsDialogOpen(true)} />}
        />
      )}
    </div>
  );
};

export default AddressesList;
