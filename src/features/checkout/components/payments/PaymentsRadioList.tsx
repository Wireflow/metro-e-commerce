import { formatDate, isToday } from 'date-fns';
import { Plus } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { ViewRow } from '@/types/supabase/table';

import AddCardFormDialog from '../forms/AddCardFormDialog';

type Props = {
  onSelect?: (payment: ViewRow<'payment_methods_with_spending'>) => void;
  selected?: ViewRow<'payment_methods_with_spending'> | null;
  payments: ViewRow<'payment_methods_with_spending'>[];
};

const PaymentsRadioList = ({ onSelect, selected, payments }: Props) => {
  const handleValueChange = (value: string) => {
    const payment = payments.find(p => p.id === value);
    if (payment) {
      onSelect?.(payment);
    }
  };

  const formatAddedDate = (dateString: string) => {
    const date = new Date(dateString);
    return isToday(date) ? 'Today' : formatDate(date, 'MMM d, yyyy');
  };

  return (
    <RadioGroup value={selected?.id ?? undefined} onValueChange={handleValueChange}>
      {payments.map((payment, index) => (
        <div key={payment.id}>
          <div
            className={cn(
              'w-full cursor-pointer border-t p-4 transition-colors hover:bg-gray-50',
              selected?.id === payment.id && 'bg-primary/15',
              { '-mb-2 -mt-2': index > 0 }
            )}
            onClick={() => handleValueChange(payment.id ?? '')}
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value={payment.id ?? ''} id={payment.id ?? undefined} />
              <Label className="flex flex-1 cursor-pointer items-center justify-between gap-4 text-sm">
                <div className="space-y-1">
                  <p className="inline-flex">
                    <span className="mr-1 hidden md:block">**** **** </span> ****{' '}
                    {payment.last_four}
                  </p>
                  {payment.added_at && (
                    <p className="text-xs text-gray-500">
                      Added {formatAddedDate(payment.added_at)}
                    </p>
                  )}
                </div>
                <span className="truncate text-gray-500">{payment.card_holder}</span>
              </Label>
            </div>
          </div>
        </div>
      ))}
      <AddCardFormDialog
        trigger={
          <div>
            <div
              className={cn(
                'w-full cursor-pointer border-t p-4 py-5 transition-colors hover:bg-gray-50'
              )}
            >
              <div className="flex items-center space-x-3">
                <Plus className="h-5 w-5 text-primary" />
                <Label className="flex flex-1 cursor-pointer items-center justify-between gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="inline-flex">Add New Card</p>
                  </div>
                </Label>
              </div>
            </div>
          </div>
        }
      />
    </RadioGroup>
  );
};

export default PaymentsRadioList;
