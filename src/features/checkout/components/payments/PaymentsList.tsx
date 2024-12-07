import { ViewRow } from '@/types/supabase/table';

import PaymentCard from './PaymentCard';

type Props = {
  payments: ViewRow<'payment_methods_with_spending'>[];
  onSelect?: (payment: ViewRow<'payment_methods_with_spending'> | null) => void;
  selected?: ViewRow<'payment_methods_with_spending'> | null;
};

const PaymentsList = ({ payments = [], onSelect, selected }: Props) => {
  return (
    <div className="flex w-full flex-wrap gap-4">
      {payments.map(payment => (
        <PaymentCard
          key={payment.id}
          payment={payment}
          options={{
            showTitle: false,
            showSelection: true,
            showAction: false,
          }}
          onSelect={onSelect}
          selected={selected}
        />
      ))}
      {/* <QuickDialog
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
      /> */}
    </div>
  );
};

export default PaymentsList;
