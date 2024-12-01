import { ISOStringFormat } from 'date-fns';

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
import { isDiscountValid } from '../utils/validateDiscount';
import MultiImageViewer from './MultiImageViewer';
import ProductCard, { PriceSection } from './ProductCard';
import QuantityControl from './QuantityControl';
import TobaccoBadge from './TobaccoBadge';

type Props = {
  product: Product;
  border?: boolean;
  shortenText?: boolean;
};

const ProductInfo = ({ product, border, shortenText }: Props) => {
  const { metadata } = useUser();
  const { data: cartItem } = useCartItemById({ product_id: product.id });
  const { mutate: updatedCartItem, isPending: isUpdating } = useUpdateCartItem();
  const imagesUrls = product.images.map(image => image.url);
  const isValidDiscount = isDiscountValid(
    product?.discount,
    product?.discounted_until as ISOStringFormat
  );

  const getWishlistItemById = useWishlistStore(state => state.getWishlistItemById);
  const wishlistItem = getWishlistItemById(product.id);

  return (
    <div
      className={`${border ? 'border-b-2 border-b-border pb-5' : ''} flex w-full flex-col gap-4 md:flex-row`}
    >
      <div className="w-full md:w-1/2">
        <MultiImageViewer imagesUrls={imagesUrls.length > 0 ? imagesUrls : [PLACEHOLDER_IMG_URL]} />
      </div>
      <div className="flex w-full flex-col gap-4 md:w-1/2">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <TobaccoBadge isTobacco={product.is_tobacco} />
            <WithAuth rules={{ customCheck: m => !m.approved_tobacco && product.is_tobacco }}>
              <Badge variant={'info'} className="rounded-sm text-[10px] font-medium">
                Requires Approval
              </Badge>
            </WithAuth>
          </div>
          <p className="text-wrap text-2xl font-medium">
            {product.name} | {product.manufacturer} | {product.unit}
          </p>
          {shortenText && (
            <p className="text-sm text-gray-500">{truncate(product.description as string)}</p>
          )}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="flex gap-1 text-sm">
            <p className="font-light">Availability: </p>
            <span
              className={cn('font-semibold', {
                'text-green-500': product.in_stock,
                'text-red-500': !product.in_stock,
              })}
            >
              {product.in_stock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          <p>
            Brand: <span className="font-semibold">{product.manufacturer}</span>
          </p>
          <div>
            <p>Skus:</p>
            <div className="flex flex-col gap-1">
              {product?.barcodes?.map(b => (
                <p key={b.id} className="font-semibold">
                  {b.barcode}
                </p>
              ))}
            </div>
          </div>
          <p>
            Category: <span className="font-semibold">N/A</span>
          </p>
        </div>
        <div className="mb-4 border-b-[1px] border-b-border py-4">
          <PriceSection
            isValidDiscount={isValidDiscount}
            discount={product?.discount}
            type={metadata?.customer_type}
            price={
              metadata?.customer_type === 'wholesale'
                ? product.wholesale_price
                : product.retail_price
            }
            label={metadata?.customer_type === 'wholesale' ? 'Wholesale' : 'Retail'}
            customRender={({ preDiscount, afterDiscount, discount }) => (
              <div className="flex items-center gap-2">
                <p className="text-lg text-theme-sky-blue md:text-2xl">
                  {formatCurrency(afterDiscount)}
                </p>
                {isValidDiscount && (
                  <>
                    <p className="text-sm text-gray-500 line-through md:text-base">
                      {formatCurrency(preDiscount)}
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
          {cartItem && cartItem?.quantity > 0 && (
            <QuantityControl
              quantity={cartItem?.quantity ?? 0}
              onIncrease={() => {
                updatedCartItem({
                  product_id: product.id,
                  quantity: (cartItem?.quantity ?? 0) + 1,
                  id: cartItem?.id ?? '',
                });
              }}
              onDecrease={() => {
                updatedCartItem({
                  product_id: product.id,
                  quantity: (cartItem?.quantity ?? 0) - 1,
                  id: cartItem?.id ?? '',
                });
              }}
              disabled={!product.in_stock || isUpdating}
            />
          )}
          <ProductCard.AddToCartButton
            product={product}
            className="w-full"
            size={'lg'}
            disabled={!!cartItem}
          />
        </div>
        <div className="flex items-center gap-1">
          <ProductCard.WishlistButton className="border-none bg-white" product={product}>
            <p>{wishlistItem ? 'Remove from Wishlist' : 'Add to Wishlist'}</p>
          </ProductCard.WishlistButton>
        </div>
        <SupportedPayments />
      </div>
    </div>
  );
};

export default ProductInfo;
