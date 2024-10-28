import { Eye, Package, Star } from 'lucide-react';
import { Control, Controller } from 'react-hook-form';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

import { CreateProductFormData } from '../../schemas/create-product';

interface ProductSettingsProps {
  control: Control<CreateProductFormData>;
}

const ProductSettings = ({ control }: ProductSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="md:text-2xl">Visibility & Availability</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col divide-y divide-gray-100">
        <div className="flex items-start py-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <Package className="h-6 w-6 text-gray-600" />
          </div>
          <div className="ml-4 flex flex-1 flex-col">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-medium">Available for Purchase</h3>
                <p className="text-sm text-gray-500">
                  When enabled, customers can buy this product
                </p>
              </div>
              <Controller
                name="general_info.in_stock"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-green-600"
                  />
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex items-start py-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <Eye className="h-6 w-6 text-gray-600" />
          </div>
          <div className="ml-4 flex flex-1 flex-col">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-medium">Show in Store</h3>
                <p className="text-sm text-gray-500">
                  When enabled, customers can see this product in your store
                </p>
              </div>
              <Controller
                name="general_info.published"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-blue-600"
                  />
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex items-start py-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <Star className="h-6 w-6 text-gray-600" />
          </div>
          <div className="ml-4 flex flex-1 flex-col">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-medium">Highlight on Homepage</h3>
                <p className="text-sm text-gray-500">
                  Showcase this product on your store&apos;s homepage
                </p>
              </div>
              <Controller
                name="general_info.is_featured"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-purple-600"
                  />
                )}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSettings;
