import { ReactNode } from 'react';
import { FieldValues, Path, useController, UseControllerProps } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Textarea, TextareaProps } from '../ui/textarea';

interface Props<TFieldValues extends FieldValues> extends Omit<TextareaProps, 'name'> {
  control: UseControllerProps<TFieldValues>['control'];
  name: Path<TFieldValues>;
  label?: ReactNode;
  description?: string;
}
export default function TextareaField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
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
            <Textarea
              {...props}
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
