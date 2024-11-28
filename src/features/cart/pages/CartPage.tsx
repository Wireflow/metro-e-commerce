'use client';

import { useRouter } from 'next/navigation';

import { ArrowLeft } from 'lucide-react';

import BreadCrumbQuickUI from '@/components/layout/BreadCrumbQuickUI';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import CartProductList from '../components/CartProductList';
import CartTotals from '../components/CartTotals';
import OrderTypeSelector from '../components/OrderTypeSelector';
import { useCart } from '../hooks/queries/useCart';
import { useCartStore } from '../store/useCartStore';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Shopping Cart', href: '/customer/cart' },
];

const CartPage = () => {
  const { data: cart } = useCart();
  const { orderType, setOrderType } = useCartStore();
  const router = useRouter();

  return (
    <div>
      <BreadCrumbQuickUI breadcrumbs={breadcrumbs} />
      <Container className="flex flex-col items-start gap-8 py-10 md:flex-row md:py-20">
        <Card className="w-full flex-1 p-0 shadow-none">
          <h1 className="p-5 text-lg font-semibold">Shopping Cart</h1>
          <CardContent className="p-0">
            <CartProductList cartItems={cart ?? []} />
            <div className="p-4">
              <Button
                variant={'soft'}
                className="w-full md:w-auto"
                onClick={() => router.push('/shop')}
              >
                <ArrowLeft className="h-4 w-4" /> Back to Shop
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="w-full md:max-w-[350px]">
          <div className="mb-4">
            <OrderTypeSelector onSelect={setOrderType} selected={orderType} />
          </div>
          <CartTotals />
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
