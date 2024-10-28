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
import { cn } from '@/lib/utils';

interface Props<TFieldValues extends FieldValues> {
  control: UseControllerProps<TFieldValues>['control'];
  name: Path<TFieldValues>;
  label?: ReactNode;
  description?: string;
  className?: string;
}

export default function CheckboxField<TFieldValues extends FieldValues>({
  name,
  label,
  description,
  control,
  className,
}: Props<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-row items-start space-x-3 space-y-0 rounded-[3px] border px-4 py-3">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className={cn(className)}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              {label && <FormLabel>{label}</FormLabel>}
              {description && (
                <FormDescription className="leading-4">{description}</FormDescription>
              )}
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
