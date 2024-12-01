import { useEffect, useState } from 'react';

import { Animate } from '@/components/animation/Animate';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Row } from '@/types/supabase/table';

import { useDeliveryAddress } from '../../hooks/queries/useDeliveryAddress';
import AddressesList from './AddressesList';

type Props = {
  addresses: Row<'addresses'>[];
};

const BillingAddresses = ({ addresses }: Props) => {
  const [useSameAsDelivery, setUseSameAsDelivery] = useState(false);
  const [prevouslySelected, setPreviouslySelected] = useState<Row<'addresses'> | null>(null);
  const [selected, setSelected] = useState<Row<'addresses'> | null>(null);

  const { formattedAddress, address: deliveryAddress } = useDeliveryAddress();

  useEffect(() => {
    if (addresses.length > 0) {
      setSelected(addresses[0]);
      setPreviouslySelected(addresses[0]);
    }
  }, [addresses]);

  const handleDeliveryAddressToggle = (checked: boolean) => {
    setUseSameAsDelivery(checked);

    if (!deliveryAddress) return;

    setSelected(checked ? deliveryAddress : null);

    if (!checked) {
      setSelected(prevouslySelected);
    }
  };

  const handleSelect = (address: Row<'addresses'> | null) => {
    setSelected(address);
    setPreviouslySelected(address);
  };

  return (
    <div>
      <p className="mb-4 font-semibold md:text-lg">Billing Information</p>
      <div className="space-y-4">
        <Animate show={!useSameAsDelivery} type="fade" delay={0.1}>
          <AddressesList addresses={addresses ?? []} onSelect={handleSelect} selected={selected} />
        </Animate>
        <Animate show={!!deliveryAddress}>
          <div className="flex items-center gap-2">
            <Checkbox
              id="use-delivery-address"
              className="h-5 w-5"
              checked={useSameAsDelivery}
              onCheckedChange={handleDeliveryAddressToggle}
            />
            <Label htmlFor="use-delivery-address">Same as business address</Label>
          </div>
          <div>
            <p className="mt-2 text-xs text-gray-500">{formattedAddress}</p>
          </div>
        </Animate>
      </div>
    </div>
  );
};

export default BillingAddresses;
