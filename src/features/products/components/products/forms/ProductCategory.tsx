import { Control } from 'react-hook-form';

import { SelectField } from '@/components/form/SelectField';
import { SelectOptions } from '@/components/quick/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useCategories } from '../../../hooks/category-query-hooks';
import { CreateProductFormData } from '../../../schemas/create-product';

interface ProductCategoryProps {
  control: Control<CreateProductFormData>;
}

const ProductCategory = ({ control }: ProductCategoryProps) => {
  const { data: categories } = useCategories();

  const options: SelectOptions[] =
    categories?.map(category => ({
      label: category.name,
      value: category.id,
    })) ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="md:text-2xl">Category</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <SelectField
          options={options}
          control={control}
          name="category_id"
          label="Product Category"
          placeholder="Select category"
        />
      </CardContent>
    </Card>
  );
};

export default ProductCategory;
