import { ReactNode } from 'react';
import { FieldValues, Path, useController, UseControllerProps } from 'react-hook-form';

import Select, { QuickSelectProps } from '@/components/quick/Select';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

interface Props<TFieldValues extends FieldValues> extends Partial<QuickSelectProps> {
  control: UseControllerProps<TFieldValues>['control'];
  name: Path<TFieldValues>;
  label?: ReactNode;
  description?: string;
  disabled?: boolean;
}

export function SelectField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  disabled,
  options,
  ...props
}: Props<TFieldValues>) {
  const { field } = useController({
    name,
    control,
  });

  return (
    <FormField
      name={name}
      control={control}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              {...props}
              options={options ?? []}
              value={field.value ?? ''}
              onValueChange={Value => field.onChange(Value)}
              defaultValue={field.value}
              disabled={disabled}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
