import { ReactNode } from 'react';
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';
import { FieldValues, Path, UseControllerProps } from 'react-hook-form';

import { cn } from '@/lib/utils';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

interface NumberInputFieldProps<TFieldValues extends FieldValues>
  extends Omit<CurrencyInputProps, 'name'> {
  control: UseControllerProps<TFieldValues>['control'];
  name: Path<TFieldValues>;
  label?: ReactNode;
  description?: string;
}

export default function NumberInputField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  className,
  decimalsLimit = 2,
  allowNegativeValue = false,
  decimalSeparator = '.',
  groupSeparator = ',',
  ...props
}: NumberInputFieldProps<TFieldValues>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              <CurrencyInput
                className={cn(
                  'flex h-10 w-full rounded-[2px] border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                  className
                )}
                name={name}
                id={`input-${name}`}
                value={field.value}
                placeholder="Please enter a number"
                decimalsLimit={decimalsLimit}
                decimalSeparator={decimalSeparator}
                groupSeparator={groupSeparator}
                allowNegativeValue={allowNegativeValue}
                onValueChange={value => {
                  const afterDecimalSeparator = value && value.split(decimalSeparator)[1];

                  if (value === '' || !value) {
                    field.onChange(null);
                  } else if (
                    value.includes(decimalSeparator) &&
                    afterDecimalSeparator?.length === 0
                  ) {
                    field.onChange(value);
                  } else {
                    field.onChange(parseFloat(value));
                  }
                }}
                {...props}
              />
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
