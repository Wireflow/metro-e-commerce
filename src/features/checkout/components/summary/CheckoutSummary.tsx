'use client';

import { ArrowRight, Minus, Plus } from 'lucide-react';
import { useState } from 'react';

import { Animate } from '@/components/animation/Animate';
import Conditional from '@/components/Conditional';
import QuickAlert from '@/components/quick/QuickAlert';
import SummaryRow from '@/components/SummaryRow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CartSummary, SummaryItem } from '@/features/cart/hooks/queries/useCartSummary';
import { useDeliveryPossible } from '@/features/cart/hooks/queries/useDeliveryPossible';
import { CartItem } from '@/features/cart/store/useCartStore';
import ProductCard from '@/features/products/components/ProductCard';
import { Enum } from '@/types/supabase/enum';
import { formatCurrency } from '@/utils/utils';

import { useCreateOrder } from '../../hooks/mutations/useCreateOrder';

type CheckoutSummaryProps = {
  orderType?: Enum<'order_type'>;
  isOrderingAllowed: boolean;
  notes?: string;

  cart: CartItem[];
  summary: CartSummary;
  loading?: boolean;
};

const CheckoutSummary = ({
  orderType,
  isOrderingAllowed,
  cart,
  summary,
  loading,
  notes,
}: CheckoutSummaryProps) => {
  const [showAll, setShowAll] = useState(false);
  const { mutate: createOrder, isPending: isCreatingOrder } = useCreateOrder();
  const { isPossible: isDeliveryPossible } = useDeliveryPossible();

  if (loading) {
    return <Skeleton className="h-[350px] w-[350px] rounded-[2px] shadow-none" />;
  }

  const getTotal = () => {
    if (orderType === 'delivery') {
      return summary?.cart_total_with_delivery ?? 0;
    }

    return summary?.cart_total ?? 0;
  };

  const firstTwoItems = summary?.cart_items.slice(0, 2) as SummaryItem[];
  const moreItems = summary?.cart_items.slice(2) as SummaryItem[];

  const itemsToShow = showAll ? summary?.cart_items : firstTwoItems;

  return (
    <Card className="w-full shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Order Summary</CardTitle>
      </CardHeader>
      <Animate type="fade" className="px-4" show={orderType === 'delivery'}>
        <QuickAlert
          variant={isDeliveryPossible ? 'success' : 'destructive'}
          title={isDeliveryPossible ? 'Want it delivered?' : 'Sorry for the inconvenience'}
          description={
            isDeliveryPossible
              ? 'Your delivery address is within our delivery radius! 🚚'
              : 'We are sorry, but your delivery address is not within our delivery radius. 😔'
          }
        />
      </Animate>

      <div className="mb-4 grid gap-2 overflow-hidden border-b px-6 pb-2">
        <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
          {itemsToShow?.map((item, index) => {
            const product = cart.find(i => i.product_id === item.product_id)?.product;

            return (
              <Animate
                key={item.product_id}
                type="slide"
                direction="left"
                delay={0.1 * index}
                className="flex items-center gap-2"
              >
                {product && (
                  <ProductCard.Image
                    product={product}
                    disableHoverEffect
                    disableSaleBadge
                    className="h-[80px] w-[80px]"
                  />
                )}
                <div>
                  <p className="truncate text-sm">{item.product_name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} x {formatCurrency(item.unit_price)}
                  </p>
                </div>
              </Animate>
            );
          })}
        </div>
        <Animate type="bounce" className="w-full" show={moreItems.length > 0}>
          <Button variant={'ghost'} onClick={() => setShowAll(!showAll)} className="w-full">
            <p className="text-sm text-gray-500">{moreItems.length} more items</p>
            {showAll ? (
              <Minus className="h-4 w-4 text-gray-500" />
            ) : (
              <Plus className="h-4 w-4 text-gray-500" />
            )}
          </Button>
        </Animate>
      </div>
      <CardContent className="flex flex-col gap-2">
        <SummaryRow label="Subtotal" value={formatCurrency(summary?.subtotal ?? 0)} />
        <SummaryRow label="Discount" value={formatCurrency(summary?.total_discount ?? 0)} />
        <SummaryRow label="Shipping" value={formatCurrency(0)} />

        <SummaryRow label="Tax" value={formatCurrency(summary?.total_tax ?? 0)} />
        <Conditional condition={orderType === 'delivery'}>
          <SummaryRow
            label="Delivery Fee"
            value={formatCurrency(summary?.expected_delivery_fee ?? 0)}
          />
        </Conditional>
      </CardContent>

      <CardFooter className="flex w-full flex-col items-start gap-4 border-t border-gray-200 p-6">
        <div className="w-full space-y-1.5">
          <SummaryRow
            label="Quantity"
            value={String(summary?.total_quantity ?? 0)}
            labelClassName="font-semibold text-black"
            valueClassName="font-semibold text-black"
          />
          <SummaryRow
            label="Total"
            value={formatCurrency(getTotal() ?? 0)}
            labelClassName="font-semibold text-black"
            valueClassName="font-semibold text-black"
          />
        </div>
        <div className="w-full space-y-2">
          <Button
            size="xl"
            className="w-full text-sm"
            onClick={() => createOrder({ orderType: orderType as Enum<'order_type'>, notes })}
            disabled={
              !summary ||
              !orderType ||
              !isOrderingAllowed ||
              isCreatingOrder ||
              (!isDeliveryPossible && orderType === 'delivery')
            }
          >
            <p>
              Place <span className="capitalize">{orderType}</span> Order
            </p>
            <Animate type="slide" direction="left">
              <ArrowRight className="h-4 w-4" />
            </Animate>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CheckoutSummary;
