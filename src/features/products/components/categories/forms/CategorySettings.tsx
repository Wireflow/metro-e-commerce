import { Eye, Star } from 'lucide-react';
import { Control, Controller } from 'react-hook-form';

import FeatureToggle from '@/components/FeatureToggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateCategoryFormData } from '@/features/products/schemas/create-category';

interface CategorySettingsProps {
  control: Control<CreateCategoryFormData>;
}

const CategorySettings = ({ control }: CategorySettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="md:text-2xl">Visibility & Availability</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col divide-y divide-gray-100">
        <Controller
          name="published"
          control={control}
          render={({ field }) => (
            <FeatureToggle
              title="Show in Store"
              description="When enabled, customers can see this product in your store"
              icon={Eye}
              switchClassName="data-[state=checked]:bg-blue-600"
              checked={field.value ?? false}
              onCheckedChange={field.onChange}
            />
          )}
        />

        <Controller
          name="is_featured"
          control={control}
          render={({ field }) => (
            <FeatureToggle
              title="Highlight on Homepage"
              description="Showcase this product on your store's homepage"
              icon={Star}
              switchClassName="data-[state=checked]:bg-purple-600"
              checked={field.value ?? false}
              onCheckedChange={field.onChange}
            />
          )}
        />
      </CardContent>
    </Card>
  );
};

export default CategorySettings;
