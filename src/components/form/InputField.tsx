import { Eye, EyeOff } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { FieldValues, Path, useController, UseControllerProps } from 'react-hook-form';

import { cn } from '@/lib/utils';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input, InputProps } from '../ui/input';

interface InputFieldProps<TFieldValues extends FieldValues> extends Omit<InputProps, 'name'> {
  control: UseControllerProps<TFieldValues>['control'];
  name: Path<TFieldValues>;
  label?: ReactNode;
  description?: string;
}

export default function InputField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  onChange,
  type,
  className,
  ...props
}: InputFieldProps<TFieldValues>) {
  const [showPassword, setShowPassword] = useState(false);
  const { field } = useController({
    name,
    control,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | number | null = e.target.value;

    if (type === 'number') {
      // Remove any non-numeric characters except decimal point
      value = value.replace(/[^0-9.]/g, '');

      if (value === '') {
        value = null;
      } else {
        value = parseFloat(value) || null;
      }
    }

    if (onChange) {
      onChange(e);
    } else {
      field.onChange(value);
    }
  };

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              <Input
                {...props}
                type={
                  type === 'password'
                    ? showPassword
                      ? 'text'
                      : 'password'
                    : type === 'number'
                      ? 'text'
                      : type
                }
                value={props.value ?? field.value ?? ''}
                onChange={handleChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                inputMode={type === 'number' ? 'decimal' : undefined}
                className={cn(type === 'password' && 'pr-10', className)}
              />
              {type === 'password' && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
