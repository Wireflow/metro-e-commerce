import { useEffect, useState } from 'react';

import { Row } from '@/types/supabase/table';

import AddressesList from './AddressesList';

type Props = {
  addresses: Row<'addresses'>[];
};

const BillingAddresses = ({ addresses }: Props) => {
  const [selected, setSelected] = useState<Row<'addresses'> | null>(null);

  useEffect(() => {
    if (addresses.length > 0) {
      setSelected(addresses[0]);
    }
  }, [addresses]);

  return (
    <div>
      <p className="mb-4 font-semibold md:text-lg">Billing Information</p>
      <AddressesList addresses={addresses ?? []} onSelect={setSelected} selected={selected} />
    </div>
  );
};

export default BillingAddresses;
