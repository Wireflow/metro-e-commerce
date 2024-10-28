import { Control } from 'react-hook-form';

import NumberInputField from '@/components/form/NumberInputField';
import { DatePicker } from '@/components/quick/DatePicker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { CreateProductFormData } from '../../schemas/create-product';

interface ProductDiscountProps {
  control: Control<CreateProductFormData>;
}

const ProductDiscount = ({ control }: ProductDiscountProps) => {
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
              <FormLabel>Discount ends on</FormLabel>
              <FormControl>
                <DatePicker
                  date={field.value ? new Date(field.value) : undefined}
                  onSelect={date => field.onChange(date?.toISOString())}
                  placeholder="Discount ends on"
                  className="w-full"
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
          description="Discount percentage"
          placeholder="0.00"
          prefix="$"
          max={100}
        />
      </CardContent>
    </Card>
  );
};

export default ProductDiscount;
