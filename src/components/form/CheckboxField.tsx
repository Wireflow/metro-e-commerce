import { ReactNode } from 'react';
import { FieldValues, Path, UseControllerProps } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface Props<TFieldValues extends FieldValues> {
  control: UseControllerProps<TFieldValues>['control'];
  name: Path<TFieldValues>;
  label?: ReactNode;
  description?: string;
}

export default function CheckboxField<TFieldValues extends FieldValues>({
  name,
  label,
  description,
  control,
}: Props<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="space-y-1 leading-none">
              {label && <FormLabel>{label}</FormLabel>}
              {description && <FormDescription>{description}</FormDescription>}
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
