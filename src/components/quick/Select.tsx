import { ReactNode } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export type SelectOptions = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type QuickSelectProps = {
  options: SelectOptions[];
  onValueChange: (option?: string) => void;
  defaultValue?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  emptyMessage?: string;
  action?: ReactNode;
  disabled?: boolean;
};

const QuickSelect = ({
  options,
  onValueChange,
  disabled,
  defaultValue,
  className,
  placeholder,
  emptyMessage = 'No options available',
  value,
  action,
}: QuickSelectProps) => {
  const hasOptions = options && options.length > 0;

  return (
    <Select
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      value={value}
      disabled={disabled}
    >
      <SelectTrigger
        className={cn('bg-white', className, { capitalize: !!value, 'text-gray-500': !value })}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {hasOptions ? (
          options.map(option => (
            <SelectItem
              key={option.value}
              className={cn(
                'px-4 py-3 capitalize focus:bg-black focus:text-white',
                option.disabled && 'cursor-not-allowed opacity-50'
              )}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label.toLowerCase()}
            </SelectItem>
          ))
        ) : (
          <div className="h-12 px-4 py-2 text-sm text-gray-500">{emptyMessage}</div>
        )}
        {action}
      </SelectContent>
    </Select>
  );
};

export default QuickSelect;
