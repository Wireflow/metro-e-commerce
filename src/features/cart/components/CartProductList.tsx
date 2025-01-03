'use client';

import { X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { DynamicTable, useTableFields } from '@/components/ui/dynamic-table';
import ProductCard from '@/features/products/components/ProductCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUser } from '@/hooks/useUser';
import { formatCurrency } from '@/utils/utils';

import { useUpdateCartItem } from '../hooks/mutations/useUpdateCartItem';
import { useCartSummary } from '../hooks/queries/useCartSummary';
import { CartItem, useCartStore } from '../store/useCartStore';

type Props = {
  cartItems: CartItem[];
};

const CartProductList = ({ cartItems }: Props) => {
  const { getCartItemTotals } = useCartStore();
  const { metadata } = useUser();
  const { mutate: updatedCartItem, isPending: isUpdating } = useUpdateCartItem();
  const { data: summary } = useCartSummary();

  const isMobile = useIsMobile();

  const fields = useTableFields<CartItem>([
    {
      key: item => (
        <div className="flex items-center gap-2">
          <ProductCard.RemoveFromCartButton
            product={item?.product}
            className="group h-[30px] w-[30px] rounded-full hover:border-red-500 hover:text-red-500"
            size={'icon'}
            variant={'outline'}
          >
            <X className="h-4 w-4 text-gray-500 group-hover:text-red-500" />
          </ProductCard.RemoveFromCartButton>
          <ProductCard.Image
            disableHoverEffect
            disableSaleBadge
            product={item?.product}
            className="h-[70px] w-[70px]"
            object="cover"
          />
          <div className="flex flex-col items-start gap-1">
            <p>
              {item?.product?.name}{' '}
              {item?.product?.is_taxed && (
                <Badge variant="warning" className="ml-1 h-4 px-1 text-[11px]">
                  Taxable
                </Badge>
              )}
            </p>
          </div>
        </div>
      ),
      className: 'pl-4',
      label: 'Product',
    },

    {
      key: item => <ProductCard.Price product={item?.product} className="flex-1" />,
      label: 'Price',
    },
    {
      key: item => (
        <div className="max-w-[120px]">
          <ProductCard.AddToCartButton product={item.product} />
        </div>
      ),

      label: 'Quantity',
      className: 'min-w-[120px]',
    },
    {
      key: item => {
        const { subtotal } = getCartItemTotals(item?.id, metadata?.customer_type);
        const cartItem = summary?.cart_items.find(curr => curr?.product_id === item?.product_id);

        return (
          <div>
            {formatCurrency(cartItem ? cartItem?.line_total - cartItem?.discount_amount : subtotal)}
          </div>
        );
      },
      label: 'Subtotal',
      className: 'min-w-[120px]',
    },
  ]);

  if (isMobile) {
    return (
      <div>
        {cartItems.map(item => (
          <div
            key={item.id}
            className="border border-x-0 border-b-0 border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start space-x-4">
              <ProductCard.Image
                disableHoverEffect
                disableSaleBadge
                product={item.product}
                className="h-[90px] w-[100px] rounded-md"
                object="contain"
              />
              <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                  <h3 className="font-medium">
                    {item.product.name}{' '}
                    {item.product.is_taxed && (
                      <Badge variant="warning" className="ml-1 h-4 px-1 text-[11px]">
                        Taxable
                      </Badge>
                    )}
                  </h3>
                  <ProductCard.RemoveFromCartButton
                    product={item.product}
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                  >
                    <span className="sr-only">Remove</span>
                  </ProductCard.RemoveFromCartButton>
                </div>
                <ProductCard.Price product={item.product} className="text-sm font-semibold" />
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-gray-500">Quantity</span>
                  <div className="max-w-[120px]">
                    <ProductCard.AddToCartButton product={item.product} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {cartItems.length === 0 && (
          <div className="py-8 text-center text-gray-500">No products in cart</div>
        )}
      </div>
    );
  }

  return (
    <DynamicTable
      fields={fields}
      data={cartItems ?? []}
      variant="minimal"
      headerClassname="bg-gray-200 text-white"
      emptyMessage="No products in cart"
    />
  );
};

export default CartProductList;
