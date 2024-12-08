import { Category } from '@/features/products/schemas/category';
import { Product } from '@/features/products/schemas/products';

import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

type Props = {
  product: Product;
  category: Category | undefined;
};

const ProductAdditonalInfo = ({ product, category }: Props) => {
  const additionalInfo = [
    { label: 'Manufacturer', value: product?.manufacturer },
    { label: 'Unit', value: product?.unit },
    { label: 'Barcode', value: product?.barcodes?.[0]?.barcode },
    { label: 'Category', value: category?.name },
    { label: 'Tobacco Product', value: product?.is_tobacco ? 'Yes' : 'No' },
    { label: 'Item Number', value: product?.item_number ?? 'N/A' },
  ];

  return (
    <Tabs defaultValue="description" className="flex w-full flex-col items-start gap-5">
      <TabsList>
        <TabsTrigger
          className="text-md rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:ring-0 md:text-lg"
          value="description"
        >
          Description
        </TabsTrigger>
        <TabsTrigger
          className="text-md rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:ring-0 md:text-lg"
          value="Additional Information"
        >
          Additional Information
        </TabsTrigger>
      </TabsList>
      <div className="w-full">
        <TabsContent value="description">
          <Card className="shadow-none">
            <CardContent className="pt-6">
              <p className="max-w-prose leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Additional Information">
          <Card className="shadow-none">
            <CardContent className="pt-6">
              <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                {additionalInfo.map(({ label, value }) => (
                  <div
                    key={label}
                    className="border-b border-border pb-4 last:border-0 md:last:border-b"
                  >
                    <dt className="mb-1 text-sm font-medium text-muted-foreground">{label}</dt>
                    <dd className="text-base text-foreground">{value || 'N/A'}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ProductAdditonalInfo;
