import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import React, { useState } from 'react';

import DebouncedSearchInput from '@/components/form/SearchInput';
import QuickDialog from '@/components/quick/Dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ProductCard from '@/features/products/components/ProductCard';
import { usePublishedProducts } from '@/features/products/hooks/product-query-hooks';
import { Product } from '@/features/products/schemas/products';
import { PromotedProduct } from '@/features/promotions/hooks/queries/usePromotedProducts';
import { cn } from '@/lib/utils';

import { useUpdatePromo } from '../../hooks/mutations/useUpdatePromo';

type Props = {
  trigger: React.ReactNode;
  promotedProduct?: PromotedProduct;
};

const EditPromoForm = ({ trigger, promotedProduct }: Props) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [label, setLabel] = useState(promotedProduct?.label ?? '');
  const { mutate: updatePromo, isPending } = useUpdatePromo();

  const { data: searchResults } = usePublishedProducts({
    enabled: !!searchQuery,
    filters: {
      search: searchQuery,
    },
  });

  const isDirty = label !== promotedProduct?.label || !!selectedProduct;

  const handleUpdatePromo = () => {
    if (!isDirty || !promotedProduct) return;

    updatePromo(
      {
        id: promotedProduct.id,
        ...(selectedProduct && { product_id: selectedProduct.id }),
        ...(label && { label }),
      },
      {
        onSuccess: () => {
          setOpen(false);
          setSelectedProduct(null);
          setSearchQuery('');
        },
      }
    );
  };

  if (!promotedProduct) return null;

  return (
    <QuickDialog
      open={open}
      onOpenChange={setOpen}
      trigger={trigger}
      title="Edit Promoted Product"
      description="Select a new product to promote in this spot"
      content={
        <div className="flex flex-col gap-6">
          {/* Current Product Section */}
          <div className="mt-4">
            <Label>Promotion Label</Label>
            <Input
              placeholder="label here..."
              value={label}
              onChange={e => setLabel(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Currently Promoted</h3>
            <ProductCard key={promotedProduct?.product.id} className="flex gap-4 bg-gray-50">
              <ProductCard.Image product={promotedProduct?.product} className="h-[70px] w-[70px]" />
              <div className="flex flex-col gap-1">
                <ProductCard.Title product={promotedProduct?.product} />
                <ProductCard.Price product={promotedProduct?.product} />
              </div>
            </ProductCard>
          </div>

          {/* Search Section */}
          <div className="space-y-4">
            <div className="relative">
              <DebouncedSearchInput
                placeholder="Search for a product to promote..."
                value={searchQuery}
                onChange={setSearchQuery}
                className="w-full"
              />
            </div>

            {/* Search Results */}
            {searchQuery && (
              <Card className="max-h-[300px] overflow-y-auto p-2">
                <div className="space-y-2">
                  {searchResults?.map(product => (
                    <motion.div key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <ProductCard
                        className={`flex cursor-pointer gap-4 transition-colors ${
                          selectedProduct?.id === product.id
                            ? 'bg-primary/5 ring-2 ring-primary'
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedProduct(product)}
                      >
                        <ProductCard.Image product={product} className="h-[70px] w-[70px]" />
                        <div className="flex flex-1 flex-col gap-1">
                          <ProductCard.Title product={product} />
                          <ProductCard.Price product={product} />
                        </div>
                        <div
                          className={cn('flex items-center', {
                            'opacity-0': selectedProduct?.id !== product.id,
                          })}
                        >
                          <ArrowRight className="h-5 w-5 text-primary" />
                        </div>
                      </ProductCard>
                    </motion.div>
                  ))}
                  {searchResults?.length === 0 && (
                    <p className="py-4 text-center text-sm text-gray-500">
                      No products found matching your search
                    </p>
                  )}
                </div>
              </Card>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setSelectedProduct(null);
                setSearchQuery('');
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdatePromo} disabled={!isDirty || isPending}>
              {isPending ? 'Updating...' : 'Update Promotion'}
            </Button>
          </div>
        </div>
      }
    />
  );
};

export default EditPromoForm;
