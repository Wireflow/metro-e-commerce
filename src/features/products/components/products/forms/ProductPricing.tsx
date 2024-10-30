import { Control } from 'react-hook-form';

import CheckboxField from '@/components/form/CheckboxField';
import NumberInputField from '@/components/form/NumberInputField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { CreateProductFormData } from '../../../schemas/create-product';

interface ProductPricingProps {
  control: Control<CreateProductFormData>;
}

const ProductPricing = ({ control }: ProductPricingProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="md:text-2xl">Pricing</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-3">
          <NumberInputField
            control={control}
            name="pricing_info.retail_price"
            description="Selling price for retail account customers"
            label="Retail Price $"
            placeholder="$0.00"
            prefix="$"
          />

          <NumberInputField
            control={control}
            name="pricing_info.wholesale_price"
            description="Selling price for wholesale account customers"
            label="Wholesale Price $"
            placeholder="$0.00"
            prefix="$"
          />
          <NumberInputField
            control={control}
            name="pricing_info.cost_price"
            description="Your purchase or production cost"
            label="Cost Price $"
            placeholder="$0.00"
            prefix="$"
          />
        </div>
        <CheckboxField
          control={control}
          name="pricing_info.is_taxed"
          label="Taxable Product"
          description="Check if this product is taxable"
        />
      </CardContent>
    </Card>
  );
};

export default ProductPricing;
