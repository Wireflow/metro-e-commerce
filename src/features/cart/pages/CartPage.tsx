'use client';

import { formatDistanceToNow } from 'date-fns';

import BreadCrumbQuickUI from '@/components/layout/BreadCrumbQuickUI';
import Container from '@/components/layout/Container';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import DynamicTable, { useTableFields } from '@/components/ui/dynamic-table';
import ProductCard from '@/features/products/components/ProductCard';
import QuantityControl from '@/features/products/components/QuantityControl';

import { useUpdateCartItem } from '../hooks/mutations/useUpdateCartItem';
import { useCart } from '../hooks/queries/useCart';
import { CartItem } from '../store/useCartStore';

type Props = {};

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Shopping Cart', href: '/customer/cart' },
];

const CartPage = (props: Props) => {
  const { data: cart } = useCart();
  const { mutate: updatedCartItem, isPending: isUpdating } = useUpdateCartItem();

  const fields = useTableFields<CartItem>([
    {
      key: item => (
        <ProductCard.Image
          disableHoverEffect
          disableSaleBadge
          product={item.product}
          className="p-0"
          object="cover"
        />
      ),
      label: 'Image',
      className: 'w-[68px] pl-4',
    },
    {
      key: item => (
        <div className="flex flex-col items-start gap-1">
          {item?.product?.discounted_until &&
            new Date(item?.product?.discounted_until) > new Date() && (
              <Badge variant={'warning'} className="-ml-1 h-5 shadow-none">
                Sale ends{' '}
                {formatDistanceToNow(new Date(item?.product?.discounted_until), {
                  addSuffix: true,
                })}
              </Badge>
            )}
          <p>{item.product.name}</p>
        </div>
      ),
      className: 'min-w-[300px] md:min-w-none',
      label: 'Name',
    },
    {
      key: item => (
        <div>
          <ProductCard.Price product={item.product} className="flex-1" />
        </div>
      ),
      label: 'Price',
    },
    {
      key: item =>
        item &&
        item?.quantity > 0 && (
          <QuantityControl
            quantity={item?.quantity ?? 0}
            onIncrease={() => {
              updatedCartItem({
                product_id: item.product.id,
                quantity: (item?.quantity ?? 0) + 1,
                id: item?.id ?? '',
              });
            }}
            onDecrease={() => {
              updatedCartItem({
                product_id: item.product.id,
                quantity: (item?.quantity ?? 0) - 1,
                id: item?.id ?? '',
              });
            }}
            disabled={!item.product.in_stock || isUpdating}
          />
        ),
      label: 'Quantity',
      className: 'min-w-[120px]',
    },
    {
      key: item => (
        <ProductCard.RemoveFromCartButton product={item.product} className="min-w-[100px]">
          Remove
        </ProductCard.RemoveFromCartButton>
      ),
      className: 'text-center w-fit',
      label: 'Actions',
    },
  ]);

  return (
    <div>
      <BreadCrumbQuickUI breadcrumbs={breadcrumbs} />
      <Container>
        <Card className="p-0 shadow-none">
          <h1 className="p-5 text-lg font-semibold">Shopping Cart</h1>
          <CardContent className="p-0">
            <DynamicTable
              fields={fields}
              data={cart ?? []}
              variant="minimal"
              headerClassname="bg-gray-200 text-white"
              emptyMessage="No products in cart"
            />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default CartPage;
