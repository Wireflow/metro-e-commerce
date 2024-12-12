import { PopoverClose } from '@radix-ui/react-popover';
import { ArrowRight, ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import List from '@/components/List';
import { buttonVariants } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import WithAuth from '@/features/auth/components/WithAuth';
import ProductCard from '@/features/products/components/ProductCard';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils/utils';

import { useCart } from '../hooks/queries/useCart';
import { useCartSummary } from '../hooks/queries/useCartSummary';
import { CartItem } from '../store/useCartStore';

const CartPopover = () => {
  const { data: cart } = useCart();
  const { data: cartSummary } = useCartSummary();

  const router = useRouter();

  const cartSlice = cart?.slice(0, 2) ?? [];

  const renderItem = (item: CartItem) => {
    return (
      <ProductCard
        key={item?.id}
        className="flex max-h-[110px] cursor-pointer items-center gap-4"
        onClick={() => router.push(`/products/${item?.product?.id}`)}
      >
        <ProductCard.Image
          product={item?.product}
          className="h-[70px] w-[70px]"
          disableSaleBadge
          disableHoverEffect
        />
        <div className="flex flex-col gap-1">
          <ProductCard.Title
            product={item?.product}
            className="max-w-[160px] overflow-hidden truncate text-sm"
          />
          <ProductCard.Price product={item?.product} />
        </div>
        <ProductCard.RemoveFromCartButton
          product={item?.product}
          size={'icon'}
          className="w-fit px-2"
          variant={'ghost'}
        >
          <X className="h-4 w-4" />
        </ProductCard.RemoveFromCartButton>
      </ProductCard>
    );
  };

  return (
    <Popover>
      <PopoverTrigger>
        <WithAuth
          loadingPlaceholder={
            <Link href={'/customers/sign-in'}>
              <ShoppingCart className="h-6 w-6 text-white md:h-7 md:w-7" />
            </Link>
          }
          fallback={
            <Link href={'/customers/sign-in'}>
              <ShoppingCart className="h-6 w-6 text-white md:h-7 md:w-7" />
            </Link>
          }
        >
          <div className="relative">
            {cart && cart?.length > 0 && (
              <p className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-theme-accent text-sm text-black">
                {cart?.length}
              </p>
            )}
            <ShoppingCart className="h-6 w-6 text-white md:h-7 md:w-7" />
          </div>
        </WithAuth>
      </PopoverTrigger>
      <PopoverContent align="end" className="mt-3 w-screen p-0 md:w-auto md:min-w-[350px]">
        <div className="border-b border-b-gray-300 px-4 py-3">
          Shopping Cart{' '}
          {cart?.length ? <span className="text-gray-500">{`(${cart?.length})`}</span> : null}
        </div>
        <div className="p-4">
          <List<CartItem>
            renderItem={renderItem}
            data={cartSlice ?? []}
            ListEmptyComponent={
              <p className="grid h-[100px] place-items-center text-sm text-gray-500">Cart Empty</p>
            }
          />
        </div>
        <div className="border-t border-t-gray-300 px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Subtotal</p>
            <p>{formatCurrency(cartSummary?.subtotal ?? 0)}</p>
          </div>
          <Link href={'/customer/cart'}>
            <PopoverClose className={cn('mt-2 w-full', buttonVariants({ size: 'lg' }))}>
              CHECKOUT NOW <ArrowRight className="h-4 w-4" />
            </PopoverClose>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CartPopover;
