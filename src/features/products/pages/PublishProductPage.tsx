'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { CheckCircle } from 'lucide-react';

import AnimatedDiv from '@/components/animation/AnimatedDiv';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

import { usePublishProduct } from '../hooks/product-mutations-hooks';
import { Product } from '../schemas/products';

type Props = {
  product: Product;
};

const PublishProductPage = ({ product }: Props) => {
  const router = useRouter();

  const { mutate, isPending } = usePublishProduct(product.id);

  return (
    <AnimatedDiv>
      <div className="grid h-[calc(100vh-100px)] place-items-center py-8">
        <Card className="border-none text-center shadow-none">
          <CardContent className="space-y-4 pt-6">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="text-2xl font-semibold">Product Added Successfully!</h2>

            {/* Product Preview */}
            <div className="space-y-4 pt-4">
              {product.images?.[0] ? (
                <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-lg">
                  <Image
                    src={product.images[0].url}
                    alt={product.name || 'Product image'}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="mx-auto flex aspect-square w-48 items-center justify-center rounded-lg bg-muted">
                  <span className="text-sm text-muted-foreground">No image</span>
                </div>
              )}

              <div className="space-y-2">
                <p className="font-medium">{product.name}</p>
                <div className="flex justify-center gap-4 text-sm">
                  <p>Retail: ${product.retail_price}</p>
                  <p>Wholesale: ${product.wholesale_price}</p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            <Button
              className="w-full"
              onClick={() =>
                mutate(true, {
                  onSuccess: data => {
                    if (data.success) {
                      router.replace('/admin/products/all');
                    }
                  },
                })
              }
              disabled={isPending}
              variant={'gradient'}
              size={'lg'}
            >
              Publish Now
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push('/admin/products/all')}
              disabled={isPending}
            >
              Skip for Now
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AnimatedDiv>
  );
};

export default PublishProductPage;
