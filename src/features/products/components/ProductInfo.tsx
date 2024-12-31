import { Heart } from 'lucide-react';
import React from 'react';

import { Animate } from '@/components/animation/Animate';
import { Badge } from '@/components/ui/badge';
import { PLACEHOLDER_IMG_URL } from '@/data/constants';
import WithAuth from '@/features/auth/components/WithAuth';
import SupportedPayments from '@/features/cart/components/SupportedPayments';
import { useUpdateCartItem } from '@/features/cart/hooks/mutations/useUpdateCartItem';
import { useCartItemById } from '@/features/cart/hooks/queries/useCartItemById';
import { useWishlistStore } from '@/features/wishlist/store/useWishlistStore';
import { useUser } from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import { formatCurrency, truncate } from '@/utils/utils';

import { Product } from '../schemas/products';
import { validateProductDiscount } from '../utils/validateDiscount';
import MultiImageViewer from './MultiImageViewer';
import ProductCard, { PriceSection } from './ProductCard';
import QuantityControl from './QuantityControl';
import TobaccoBadge from './TobaccoBadge';

type Props = {
  product?: Product;
  border?: boolean;
  shortenText?: boolean;
};

const ProductInfo: React.FC<Props> = ({ product, border = false, shortenText = false }) => {
  const { metadata } = useUser();
  const { data: cartItem } = useCartItemById({
    product_id: product?.id ?? '',
  });
  const { mutate: updatedCartItem, isPending: isUpdating } = useUpdateCartItem();
  const getWishlistItemById = useWishlistStore(state => state?.getWishlistItemById ?? (() => null));

  if (!product) {
    return null;
  }

  // Safely handle images
  const imagesUrls = product?.images?.filter(image => image?.url).map(image => image.url) ?? [];

  const isValidDiscount = validateProductDiscount(product);

  const wishlistItem = product?.id ? getWishlistItemById(product.id) : null;

  // Handle customer type and pricing safely
  const customerType = metadata?.customer_type ?? 'retail';

  const handleQuantityUpdate = (newQuantity: number) => {
    if (!cartItem?.id || !product?.id) return;

    updatedCartItem({
      product_id: product.id,
      quantity: newQuantity,
      id: cartItem.id,
    });
  };

  return (
    <Animate type="fade">
      <div
        className={cn(
          'flex w-full flex-col gap-4 md:flex-row',
          border && 'border-b-2 border-b-border pb-5'
        )}
      >
        <div className="w-full md:w-1/2">
          <MultiImageViewer
            imagesUrls={imagesUrls?.length > 0 ? imagesUrls : [PLACEHOLDER_IMG_URL]}
          />
        </div>
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              <TobaccoBadge isTobacco={product?.is_tobacco ?? false} />
              <WithAuth
                rules={{ customCheck: m => !m?.approved_tobacco && (product?.is_tobacco ?? false) }}
              >
                <Badge variant={'info'} className="rounded-sm text-[10px] font-medium">
                  Requires Approval
                </Badge>
              </WithAuth>
            </div>
            <p className="text-wrap text-2xl font-medium">
              {product?.name ?? 'N/A'} | {product?.manufacturer ?? 'N/A'} | {product?.unit ?? 'N/A'}{' '}
            </p>
            {shortenText && product?.description && (
              <p className="text-sm text-gray-500">{truncate(product.description)}</p>
            )}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="flex gap-1 text-sm">
              <p className="font-light">Availability: </p>
              <span
                className={cn('font-semibold', {
                  'text-green-500': product?.in_stock,
                  'text-red-500': !product?.in_stock,
                })}
              >
                {product?.in_stock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <p>
              Brand: <span className="font-semibold">{product?.manufacturer ?? 'N/A'}</span>
            </p>

            <p>
              Category: <span className="font-semibold">N/A</span>
            </p>
            <p>
              Item Number: <span className="font-semibold">{product?.item_number ?? 'N/A'}</span>
            </p>
            <p>
              Unit: <span className="font-semibold">{product?.unit ?? 'N/A'}</span>
            </p>
            <p>
              Case Count: <span className="font-semibold">{product?.case_count ?? 'N/A'}</span>
            </p>

            <div className="flex gap-1">
              <p>Skus:</p>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">{product?.barcodes[0]?.barcode ?? 'N/A'}</p>
              </div>
            </div>
            <p>
              Max Per Order:{' '}
              <span className="font-semibold">{product?.max_per_order ?? 'No Limit'}</span>
            </p>
          </div>
          <div className="mb-4 border-b-[1px] border-b-border py-4">
            <PriceSection
              product={product}
              label={customerType === 'wholesale' ? 'Wholesale' : 'Retail'}
              customRender={({ preDiscount, afterDiscount, discount }) => (
                <div className="flex items-center gap-2">
                  <p className="text-lg text-theme-sky-blue md:text-2xl">
                    {formatCurrency(afterDiscount ?? 0)}
                  </p>
                  {isValidDiscount && (
                    <>
                      <p className="text-sm text-gray-500 line-through md:text-base">
                        {formatCurrency(preDiscount ?? 0)}
                      </p>
                      <Badge variant={'warning'} className="rounded-none">
                        -{formatCurrency(discount ?? 0)}
                      </Badge>
                    </>
                  )}
                </div>
              )}
            />
          </div>
          <div className="flex items-center gap-2">
            {cartItem && (cartItem?.quantity ?? 0) > 0 && (
              <QuantityControl
                quantity={cartItem?.quantity ?? 0}
                onIncrease={() => handleQuantityUpdate((cartItem?.quantity ?? 0) + 1)}
                onDecrease={() => handleQuantityUpdate((cartItem?.quantity ?? 0) - 1)}
                disabled={!product?.in_stock || isUpdating}
              />
            )}
            <ProductCard.AdminEditButton size={'lg'} product={product} className="w-full" />
            <ProductCard.AddToCartButton
              product={product}
              className="w-full"
              size={'lg'}
              disabled={!!cartItem}
            />
          </div>
          <div className="flex items-center gap-1">
            <ProductCard.WishlistButton
              className="shadow-none"
              size={'default'}
              product={product}
              variant={'outline'}
            >
              <Heart className={cn('h-5 w-5', { 'fill-red-500 text-red-500': !!wishlistItem })} />
              <p>{wishlistItem ? 'Remove from Wishlist' : 'Add to Wishlist'}</p>
            </ProductCard.WishlistButton>
          </div>
          <SupportedPayments />
        </div>
      </div>
    </Animate>
  );
};

export default ProductInfo;
