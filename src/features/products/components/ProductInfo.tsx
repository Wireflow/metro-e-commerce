import { ISOStringFormat } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import SupportedPayments from '@/features/cart/components/SupportedPayments';
import { useUpdateCartItem } from '@/features/cart/hooks/mutations/useUpdateCartItem';
import { useCartItemById } from '@/features/cart/hooks/queries/useCartItemById';
import { useUser } from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils/utils';

import { Product } from '../schemas/products';
import { isDiscountValid } from '../utils/validateDiscount';
import MultiImageViewer from './MultiImageViewer';
import ProductCard, { PriceSection } from './ProductCard';
import QuantityControl from './QuantityControl';

type Props = {
  product: Product;
};

const ProductInfo = ({ product }: Props) => {
  const { metadata } = useUser();
  const { data: cartItem } = useCartItemById({ product_id: product.id });
  const { mutate: updatedCartItem, isPending: isUpdating } = useUpdateCartItem();
  const imagesUrls = product.images.map(image => image.url);
  const isValidDiscount = isDiscountValid(
    product?.discount,
    product?.discounted_until as ISOStringFormat
  );

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="w-fll md:w-1/2">
        <MultiImageViewer imagesUrls={imagesUrls} />
      </div>
      <div className="flex w-1/2 flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-wrap text-2xl font-medium">
            {product.name} | {product.manufacturer} | {product.unit}
          </p>
          <p className="text-sm text-gray-500">{product.description}</p>
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
            price={product?.retail_price}
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
        <SupportedPayments />
      </div>
    </div>
  );
};

export default ProductInfo;
