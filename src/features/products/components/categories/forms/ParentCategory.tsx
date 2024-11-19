import { Control, useController } from 'react-hook-form';

import { SelectField } from '@/components/form/SelectField';
import { SelectOptions } from '@/components/quick/Select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateCategoryFormData } from '@/features/products/schemas/create-category';

import { useCategories } from '../../../hooks/category-query-hooks';

interface ParentCategoryProps {
  control: Control<CreateCategoryFormData>;
}

const ParentCategory = ({ control }: ParentCategoryProps) => {
  const { data: categories } = useCategories();
  const { field } = useController({
    name: 'parent_category_id',
    control,
  });

  const options: SelectOptions[] =
    categories?.map(category => ({
      label: category.name,
      value: category.id,
    })) ?? [];

  const handleUnassign = () => {
    field.onChange(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="md:text-2xl">Parent Category</CardTitle>
        <Button variant={'outline'} onClick={handleUnassign} type="button">
          Unassign
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <SelectField
          options={options}
          control={control}
          name="parent_category_id"
          label="Category"
          placeholder="Select category"
        />
      </CardContent>
    </Card>
  );
};

export default ParentCategory;
