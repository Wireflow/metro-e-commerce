import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

type Props = {
  value: number;
  onChange: (radius: number) => void;
  disabled: boolean;
};

const DeliveryRadius = ({ value, onChange, disabled }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between">
            <Label>Delivery Radius</Label>
            <span className="text-sm text-muted-foreground">
              {value} {value === 1 ? 'mile' : 'miles'}
            </span>
          </div>
          <div className="px-1">
            <Slider
              value={[value]}
              onValueChange={value => onChange(value[0])}
              max={50}
              min={0}
              step={1}
              disabled={disabled}
              className="py-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryRadius;
