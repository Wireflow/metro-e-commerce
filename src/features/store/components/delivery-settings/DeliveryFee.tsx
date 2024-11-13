import CurrencyInput from 'react-currency-input-field';

import { inputBaseStyles } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Enum } from '@/types/supabase/enum';

type Props = {
  feeType: Enum<'delivery_fee_type'>;
  deliveryFee: number;
  onChange: (fee: number, type: Enum<'delivery_fee_type'>) => void;
  disabled: boolean;
};

const DeliveryFee = ({ feeType, deliveryFee, disabled, onChange }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        {/* Fee Type Select */}
        <div className="w-full space-y-2 sm:w-[200px]">
          <Label>Fee Type</Label>
          <Select
            value={feeType}
            onValueChange={value => onChange(deliveryFee, value as Enum<'delivery_fee_type'>)}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select fee type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fixed">Fixed Amount</SelectItem>
              <SelectItem value="percentage">Percentage</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Delivery Fee Input */}
        <div className="w-full space-y-2">
          <Label>Delivery Fee {feeType === 'percentage' ? 'Percentage' : 'Amount'}</Label>
          <CurrencyInput
            className={cn(inputBaseStyles)}
            suffix={feeType === 'percentage' ? '%' : ''}
            prefix={feeType === 'fixed' ? '$' : ''}
            maxLength={feeType === 'percentage' ? 3 : 10}
            value={deliveryFee}
            onValueChange={value => onChange(value ? parseFloat(value) : 0, feeType)}
            groupSeparator=","
            decimalSeparator="."
            max={feeType === 'percentage' ? 100 : undefined}
            decimalsLimit={2}
            min={0}
            placeholder={feeType === 'percentage' ? 'ex. 5%' : 'ex. $10.00'}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryFee;
