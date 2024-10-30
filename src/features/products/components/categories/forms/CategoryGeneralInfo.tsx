import { Control } from 'react-hook-form';

import InputField from '@/components/form/InputField';
import TextareaField from '@/components/form/TextareaField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateCategoryFormData } from '@/features/products/schemas/create-category';

interface CategoryGeneralInfoProps {
  control: Control<CreateCategoryFormData>;
}

const CategoryGeneralInfo = ({ control }: CategoryGeneralInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="md:text-2xl">Category Information</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <InputField
          control={control}
          name="name"
          label="Category Name"
          description="Name of the category as it will appear in the navigation"
          placeholder="Men's Clothing"
        />
        <TextareaField
          control={control}
          name="description"
          label="Category Description"
          description="Brief overview of what products belong in this category"
          placeholder="All men's apparel including shirts, pants, jackets..."
          rows={4}
        />
      </CardContent>
    </Card>
  );
};

export default CategoryGeneralInfo;
