import { Control } from 'react-hook-form';

import CheckboxField from '@/components/form/CheckboxField';
import InputField from '@/components/form/InputField';
import TextareaField from '@/components/form/TextareaField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { CreateProductFormData } from '../../../schemas/create-product';

interface ProductGeneralInfoProps {
  control: Control<CreateProductFormData>;
}

const ProductGeneralInfo = ({ control }: ProductGeneralInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="md:text-2xl">General Information</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-3">
          <InputField
            control={control}
            name="general_info.name"
            label="Name"
            description="Product display name for catalog"
            placeholder="Premium Cotton T-Shirt"
            containerClassName="md:col-span-2"
          />
          <InputField
            control={control}
            name="general_info.item_number"
            label="Item Number"
            description="Product item number"
            placeholder="Unique Item Number"
          />
        </div>
        <TextareaField
          control={control}
          name="general_info.description"
          label="Description"
          description="Key features and specifications"
          placeholder="Product features, benefits, and details..."
          rows={4}
        />
        <div className="grid items-start gap-4 md:grid-cols-3">
          <InputField
            control={control}
            name="general_info.unit"
            label="Quantity & Unit"
            description="Unit of measurement"
            placeholder="12 piece, 24 pack, 10 kg"
          />
          <InputField
            control={control}
            name="general_info.manufacturer"
            label="Brand"
            description="Brand or manufacturer name"
            placeholder="Hershey's, Samsung, Apple"
          />
          <InputField
            type="number"
            control={control}
            name="general_info.case_count"
            label="Case Count"
            description="Amount items in each case"
            placeholder="24"
          />
        </div>
        <div className="mt-4">
          <CheckboxField
            className="data-[state=checked]:bg-black"
            control={control}
            name="general_info.is_tobacco"
            label="Is Tobacco Product"
            description="For tobacco-related products"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductGeneralInfo;
