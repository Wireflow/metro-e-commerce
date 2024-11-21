import { Minus, Plus } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type QuantityControlProps = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  className?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  debounceMs?: number;
};

const QuantityControl = ({
  quantity,
  onIncrease,
  onDecrease,
  className,
  disabled = false,
  debounceMs = 300,
}: QuantityControlProps) => {
  const increaseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const decreaseTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleIncrease = useCallback(() => {
    // Clear any existing timer
    if (increaseTimerRef.current) {
      clearTimeout(increaseTimerRef.current);
    }

    // Set new timer
    increaseTimerRef.current = setTimeout(() => {
      onIncrease();
    }, debounceMs);
  }, [onIncrease, debounceMs]);

  const handleDecrease = useCallback(() => {
    // Clear any existing timer
    if (decreaseTimerRef.current) {
      clearTimeout(decreaseTimerRef.current);
    }

    // Set new timer
    decreaseTimerRef.current = setTimeout(() => {
      onDecrease();
    }, debounceMs);
  }, [onDecrease, debounceMs]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (increaseTimerRef.current) {
        clearTimeout(increaseTimerRef.current);
      }
      if (decreaseTimerRef.current) {
        clearTimeout(decreaseTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      className={cn(
        'inline-flex h-10 items-center rounded-[1px] border',
        disabled && 'opacity-50',
        className
      )}
    >
      <Button
        variant="ghost"
        size="lg"
        className="h-9 w-9 rounded-none border-r-0 px-0"
        onClick={handleDecrease}
        disabled={disabled}
      >
        <Minus className="h-4 w-4" />
      </Button>

      <div className="flex h-9 w-9 items-center justify-center text-sm font-medium">
        {String(quantity)}
      </div>

      <Button
        variant="ghost"
        size="lg"
        className="h-9 w-9 rounded-none border-l-0 px-0"
        onClick={handleIncrease}
        disabled={disabled}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuantityControl;
