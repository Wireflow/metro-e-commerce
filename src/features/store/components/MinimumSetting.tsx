import CurrencyInput from 'react-currency-input-field';

import { inputBaseStyles } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type Props = {
  value: number;
  onChange: (minimum: number) => void;
  disabled: boolean;
  mode: 'delivery' | 'pickup' | 'shipment';
};

const MinimumSetting = ({ value, onChange, disabled, mode }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <Label className="w-full">
        {mode === 'delivery' ? 'Delivery' : mode === 'pickup' ? 'Pickup' : 'Shipment'} Minimum
        Amount
      </Label>
      <CurrencyInput
        className={cn(inputBaseStyles)}
        prefix="$"
        value={value}
        disabled={disabled}
        onValueChange={(v, s, values) => onChange(values?.float ?? 0)}
        decimalsLimit={2}
        placeholder="ex. $500"
      />
    </div>
  );
};

export default MinimumSetting;
