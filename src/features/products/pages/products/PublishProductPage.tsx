'use client';

import { CheckCircle, Clock, Eye, Globe } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import AnimatedDiv from '@/components/animation/AnimatedDiv';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { usePublishProduct } from '../../hooks/product-mutations-hooks';
import { Product } from '../../schemas/products';

type Props = {
  product: Product;
};

const PublishProductPage = ({ product }: Props) => {
  const router = useRouter();
  const { mutate, isPending } = usePublishProduct(product.id);

  const handlePublish = () => {
    mutate(true, {
      onSuccess: data => {
        if (data.success) {
          router.replace('/admin/products/all');
        }
      },
    });
  };

  return (
    <AnimatedDiv>
      <div className="grid min-h-[calc(100vh-100px)] place-items-center p-4">
        <Card className="max-w-md border-none text-center shadow-none">
          <CardContent className="p-8">
            <div className="mb-6">
              <div className="relative mx-auto mb-4 h-16 w-16 rounded-full bg-green-50">
                <CheckCircle className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-green-500" />
              </div>
              <h2 className="mb-2 text-2xl font-semibold">Product Added Successfully!</h2>
              <p className="text-sm text-gray-500">Your product is ready to be published</p>
            </div>

            <div className="mb-8 overflow-hidden rounded-xl bg-gray-50 p-4">
              <div className="mb-4">
                {product.images?.[0] ? (
                  <div className="relative mx-auto aspect-square w-40 overflow-hidden rounded-lg">
                    <Image
                      src={product.images[0].url}
                      alt={product.name || 'Product image'}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="mx-auto flex aspect-square w-40 items-center justify-center rounded-lg bg-gray-200">
                    <span className="text-sm text-gray-400">No image</span>
                  </div>
                )}
              </div>
              <h3 className="mb-2 font-medium">{product.name}</h3>
              <div className="flex justify-center gap-4 text-sm text-gray-600">
                <p>Retail: ${product.retail_price}</p>
                <p>Wholesale: ${product.wholesale_price}</p>
              </div>
            </div>

            <div className="grid gap-3">
              <Button variant={'gradient'} onClick={handlePublish} disabled={isPending} size="lg">
                <Globe className="h-4 w-4" />
                {isPending ? 'Publishing...' : 'Publish Now'}
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="gap-2 border-gray-200 hover:bg-gray-50"
                  onClick={() => router.push('/admin/products/all')}
                  disabled={isPending}
                >
                  <Clock className="h-4 w-4" />
                  Save Draft
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 border-gray-200 hover:bg-gray-50"
                  onClick={() => router.push(`/admin/products/${product.id}`)}
                  disabled={isPending}
                >
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatedDiv>
  );
};

export default PublishProductPage;
