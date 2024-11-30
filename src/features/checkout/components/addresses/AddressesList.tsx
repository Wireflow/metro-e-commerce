import { useState } from 'react';

import QuickDialog from '@/components/quick/Dialog';
import { Row } from '@/types/supabase/table';

import AddressForm from '../forms/AddressForm';
import AddressCard from './AddressCard';
import NewAddressCard from './NewAddressCard';

type Props = {
  addresses: Row<'addresses'>[];
  onSelect?: (address: Row<'addresses'> | null) => void;
  selected?: Row<'addresses'> | null;
};

const AddressesList = ({ addresses = [], onSelect, selected }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddressFormSuccess = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {addresses.map(address => (
        <AddressCard
          key={address.id}
          address={address}
          options={{
            showTitle: false,
            showSelection: true,
          }}
          onSelect={onSelect}
          selected={selected}
        />
      ))}
      <QuickDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="New Billing Address"
        description="Add a new billing address to your account"
        className="max-w-[900px]"
        content={
          <div className="mt-4">
            <AddressForm type="billing" onSuccess={handleAddressFormSuccess} />
          </div>
        }
        trigger={<NewAddressCard onClick={() => setIsDialogOpen(true)} />}
      />
    </div>
  );
};

export default AddressesList;
