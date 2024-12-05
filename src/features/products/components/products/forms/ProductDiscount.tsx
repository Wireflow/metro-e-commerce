import { endOfDay, isAfter, isBefore, isEqual, startOfDay } from 'date-fns';
import { AlertTriangle, XCircle } from 'lucide-react';
import { useMemo } from 'react';
import { Control, useWatch } from 'react-hook-form';

import NumberInputField from '@/components/form/NumberInputField';
import { DatePicker } from '@/components/quick/DatePicker';
import { Alert, AlertDescription } from '@/components/ui/alert';
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

const getDiscountBadgeProps = (discountPercentage: number) => {
  if (discountPercentage > 100) {
    return {
      variant: 'destructive' as const,
      message: 'Impossible discount! Discount cannot exceed price.',
    };
  }
  if (discountPercentage >= 50) {
    return {
      variant: 'destructive' as const,
      message: 'High discount! This may affect your margins significantly.',
    };
  }
  if (discountPercentage >= 25) {
    return {
      variant: 'warning' as const,
      message: 'Moderate discount - ensure this aligns with your pricing strategy.',
    };
  }
  return {
    variant: 'success' as const,
    message: 'Standard discount range',
  };
};

const ProductDiscount = ({ control }: ProductDiscountProps) => {
  const today = startOfDay(new Date());

  // Get the initial discount date from form control
  const initialDiscountDate = control._defaultValues?.pricing_info?.discounted_until;
  const retailDiscountAmount = useWatch({ control, name: 'pricing_info.retail_discount' });
  const wholesaleDiscountAmount = useWatch({ control, name: 'pricing_info.wholesale_discount' });
  const wholesalePrice = useWatch({ control, name: 'pricing_info.wholesale_price' });
  const retailPrice = useWatch({ control, name: 'pricing_info.retail_price' });

  const getDiscountStatus = (discountDate: string | undefined) => {
    if (!discountDate) return { variant: 'error' as const, label: 'Inactive' };

    const endDate = startOfDay(new Date(discountDate));

    if (isBefore(endDate, today)) {
      return { variant: 'warning' as const, label: 'Expired' };
    }

    if (isAfter(endDate, today) || isEqual(endDate, today)) {
      return { variant: 'success' as const, label: 'Active' };
    }

    return { variant: 'error' as const, label: 'Inactive' };
  };

  const [retailDiscount, wholesaleDiscount] = useMemo(() => {
    const retailPercentage =
      retailPrice && retailDiscountAmount ? (retailDiscountAmount / retailPrice) * 100 : 0;

    const wholesalePercentage =
      wholesalePrice && wholesaleDiscountAmount
        ? (wholesaleDiscountAmount / wholesalePrice) * 100
        : 0;

    return [retailPercentage, wholesalePercentage];
  }, [retailDiscountAmount, wholesaleDiscountAmount, retailPrice, wholesalePrice]);

  const retailBadgeProps = getDiscountBadgeProps(retailDiscount);
  const wholesaleBadgeProps = getDiscountBadgeProps(wholesaleDiscount);

  const hasImpossibleDiscount = retailDiscount > 100 || wholesaleDiscount > 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="md:text-2xl">Discounts</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {hasImpossibleDiscount && (
          <Alert variant="destructive" className="mb-2">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              Warning: One or more discount amounts exceed the product price! This will result in a
              negative selling price, which is not possible. Please reduce the discount amount.
            </AlertDescription>
          </Alert>
        )}

        <FormField
          name="pricing_info.discounted_until"
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
              <FormDescription>Date when the discounts will end</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <NumberInputField
            name="pricing_info.retail_discount"
            control={control}
            label="Retail Discount"
            description="Discount amount for retail price"
            placeholder="0.00"
            prefix="$"
            max={retailPrice || 100}
          />

          <NumberInputField
            name="pricing_info.wholesale_discount"
            control={control}
            label="Wholesale Discount"
            description="Discount amount for wholesale price"
            placeholder="0.00"
            prefix="$"
            max={wholesalePrice || 100}
          />
        </div>

        {(retailDiscount > 0 || wholesaleDiscount > 0) && (
          <div className="space-y-4">
            {retailDiscount > 0 && (
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium">Retail discount:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{retailDiscount.toFixed(0)}%</span>
                  <Badge variant={retailBadgeProps.variant}>{retailDiscount.toFixed(0)}% off</Badge>
                </div>
              </div>
            )}

            {wholesaleDiscount > 0 && (
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium">Wholesale discount:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{wholesaleDiscount.toFixed(0)}%</span>
                  <Badge variant={wholesaleBadgeProps.variant}>
                    {wholesaleDiscount.toFixed(0)}% off
                  </Badge>
                </div>
              </div>
            )}

            {!hasImpossibleDiscount && (retailDiscount >= 25 || wholesaleDiscount >= 25) && (
              <Alert variant="warning" className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {retailDiscount >= 50 || wholesaleDiscount >= 50
                    ? 'Warning: High discount percentage may significantly impact margins.'
                    : 'Note: Consider reviewing the discount strategy for optimal pricing.'}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductDiscount;
