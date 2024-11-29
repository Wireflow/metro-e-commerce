import { useState } from 'react';

import QuickDialog from '@/components/quick/Dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Row } from '@/types/supabase/table';

import { useDeliveryAddress } from '../hooks/queries/useDeliveryAddress';
import AddressCard from './AddressCard';
import AddressForm from './forms/AddressForm';
import NewAddressCard from './NewAddressCard';

type Props = {
  addresses: Row<'addresses'>[];
  onSelect?: (address: Row<'addresses'> | null) => void;
  selected?: Row<'addresses'> | null;
};

const AddressesList = ({ addresses = [], onSelect, selected }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [useSameAsDelivery, setUseSameAsDelivery] = useState(false);
  const { data: deliveryAddress } = useDeliveryAddress();

  const handleDeliveryAddressToggle = (checked: boolean) => {
    setUseSameAsDelivery(checked);

    if (!deliveryAddress) return;

    onSelect?.(checked ? deliveryAddress : null);
  };

  const handleAddressFormSuccess = () => {
    setIsDialogOpen(false);
  };

  const renderAddressCards = () => {
    if (useSameAsDelivery) return null;

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

  const renderDeliveryAddressSelector = () => {
    if (!deliveryAddress) return null;

    return (
      <div className="flex items-center gap-2">
        <Checkbox
          id="use-delivery-address"
          className="h-5 w-5"
          checked={useSameAsDelivery}
          onCheckedChange={handleDeliveryAddressToggle}
        />
        <Label htmlFor="use-delivery-address">Same as business / delivery address</Label>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderAddressCards()}
      {renderDeliveryAddressSelector()}
    </div>
  );
};

export default AddressesList;
