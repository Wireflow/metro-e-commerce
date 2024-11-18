'use client';

import Link from 'next/link';

import { Heart } from 'lucide-react';

import SignOutButton from '@/features/auth/components/SignOutButton';
import CartPopover from '@/features/cart/components/CartPopover';
import { useBranch } from '@/hooks/queries/useMetro';

import Logo from '../branding/Logo';
import Container from '../layout/Container';
import LoginPopover from './LoginPopover';
import ProductSearchbar from './ProductSearch/ProductSearchbar';

const AppNavigation = () => {
  const { branch } = useBranch();

  return (
    <div className="bg-theme-secondary">
      <Container>
        <div className="hidden w-full justify-between gap-4 md:flex">
          <div className="flex items-center justify-center gap-3">
            <Logo />
            <p className="text-xl text-white">{branch?.name}</p>
          </div>

          <div className="flex flex-1 justify-center">
            <div className="w-full max-w-[600px]">
              <ProductSearchbar />
            </div>
          </div>

          <div className="flex items-center justify-center gap-6">
            <CartPopover />
            <Link href="/customer/wishlist">
              <Heart className="h-7 w-7 text-white" />
            </Link>
            <LoginPopover />
            <SignOutButton />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:hidden">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Logo />
              <p className="text-sm text-white">{branch?.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <CartPopover />
              <Link href="/customer/wishlist">
                <Heart className="h-6 w-6 text-white" />
              </Link>
              <LoginPopover />
            </div>
          </div>
          <div className="w-full pb-2">
            <ProductSearchbar />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AppNavigation;
