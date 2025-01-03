import { Minus, Plus } from 'lucide-react';
import { ChangeEvent, KeyboardEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type QuantityControlProps = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onChange: (value: number) => void;
  className?: string;
  disabled?: boolean;
  min?: number | null;
  max?: number | null;
};

const QuantityControl = ({
  quantity,
  onIncrease,
  onDecrease,
  onChange,
  className,
  disabled = false,
  min = 0,
  max,
}: QuantityControlProps) => {
  const isAtMin = min !== null && min !== undefined && quantity <= min;
  const isAtMax = max !== null && max !== undefined && quantity >= max;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    if (!value) return;

    let newValue = parseInt(value, 10);

    // Clamp the value between min and max if they exist
    if (min !== null && min !== undefined) {
      newValue = Math.max(min, newValue);
    }
    if (max !== null && max !== undefined) {
      newValue = Math.min(max, newValue);
    }

    onChange(newValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' && !isAtMax) {
      e.preventDefault();
      onIncrease();
    } else if (e.key === 'ArrowDown' && !isAtMin) {
      e.preventDefault();
      onDecrease();
    }
  };

  return (
    <div
      onClick={e => e.stopPropagation()}
      className={cn(
        'inline-flex h-10 items-center rounded-[1px] border',
        disabled && 'opacity-50',
        className
      )}
    >
      <Button
        variant="ghost"
        size="lg"
        className="h-9 w-9 shrink-0 rounded-none border-r-0 px-0"
        onClick={onDecrease}
        disabled={disabled || isAtMin}
      >
        <Minus className="h-4 w-4" />
      </Button>

      <Input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={quantity}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="h-9 w-full min-w-[40px] rounded-none border-0 text-center text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
      />

      <Button
        variant="ghost"
        size="lg"
        className="h-9 w-9 shrink-0 rounded-none border-l-0 px-0"
        onClick={onIncrease}
        disabled={disabled || isAtMax}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuantityControl;
