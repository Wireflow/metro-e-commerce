import { endOfDay, isAfter, isBefore, isEqual, startOfDay } from 'date-fns';
import { Control } from 'react-hook-form';

import NumberInputField from '@/components/form/NumberInputField';
import { DatePicker } from '@/components/quick/DatePicker';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { CreateProductFormData } from '../../../schemas/create-product';

interface ProductDiscountProps {
  control: Control<CreateProductFormData>;
}

const ProductDiscount = ({ control }: ProductDiscountProps) => {
  const today = startOfDay(new Date());

  // Get the initial discount date from form control
  const initialDiscountDate = control._defaultValues?.pricing_info?.discounted_until;

  const getDiscountStatus = (discountDate: string | undefined) => {
    if (!discountDate) return { variant: 'error' as const, label: 'Inactive' };

    const endDate = startOfDay(new Date(discountDate));

    // Check if discount is expired (end date is before today)
    if (isBefore(endDate, today)) {
      return { variant: 'warning' as const, label: 'Expired' };
    }

    // Check if discount is active (today is before or equal to end date)
    if (isAfter(endDate, today) || isEqual(endDate, today)) {
      return { variant: 'success' as const, label: 'Active' };
    }

    return { variant: 'error' as const, label: 'Inactive' };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="md:text-2xl">Discounts</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FormField
          name={'pricing_info.discounted_until'}
          control={control}
          render={({ field }) => (
            <FormItem>
              <div className="mb-2 flex items-center gap-2">
                <FormLabel>Discount ends on</FormLabel>
                {initialDiscountDate && (
                  <Badge variant={getDiscountStatus(initialDiscountDate).variant}>
                    {getDiscountStatus(initialDiscountDate).label}
                  </Badge>
                )}
              </div>
              <FormControl>
                <DatePicker
                  date={field.value ? new Date(field.value) : undefined}
                  onSelect={date => date && field.onChange(endOfDay(date).toISOString())}
                  placeholder="Discount ends on"
                  className="w-full"
                  fromDate={today}
                />
              </FormControl>
              <FormDescription>Date when the discount will end</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <NumberInputField
          name="pricing_info.discount"
          control={control}
          label="Discount $"
          description="Discount amount"
          placeholder="0.00"
          prefix="$"
          max={100}
        />
      </CardContent>
    </Card>
  );
};

export default ProductDiscount;
