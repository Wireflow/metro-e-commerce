'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Heart } from 'lucide-react';

import { logo } from '@/data/constants';
import WithAuth from '@/features/auth/components/WithAuth';
import CartPopover from '@/features/cart/components/CartPopover';
import { useBranch } from '@/hooks/queries/useMetro';
import { useUser } from '@/hooks/useUser';

import Container from '../layout/Container';
import LoginPopover from './LoginPopover';
import ProductSearchbar from './ProductSearch/ProductSearchbar';

const AppNavigation = () => {
  const { branch } = useBranch();
  const { metadata } = useUser();
  const role = metadata.role;

  return (
    <div className="bg-theme-secondary">
      <Container>
        <div className="hidden w-full justify-between gap-4 md:flex">
          <div className="flex items-center justify-center gap-3">
            <Image src={logo} alt="logo" width={50} height={50} />
            <p className="text-xl text-white">{branch?.name}</p>
          </div>

          <div className="flex flex-1 justify-center">
            <div className="w-full max-w-[600px]">
              <ProductSearchbar />
            </div>
          </div>

          <div className="flex items-center justify-center gap-6">
            {role !== 'admin' && (
              <>
                <CartPopover />

                <WithAuth
                  fallback={
                    <Link href="/customers/sign-in">
                      <Heart className="h-7 w-7 text-white" />
                    </Link>
                  }
                >
                  <Link href="/customer/wishlist">
                    <Heart className="h-7 w-7 text-white" />
                  </Link>
                </WithAuth>
                <LoginPopover />
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 md:hidden">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Image src={logo} alt="logo" width={50} height={50} />
              <p className="text-sm text-white">{branch?.name}</p>
            </div>
            <div className="flex items-center gap-4">
              {role !== 'admin' && (
                <>
                  <CartPopover />

                  <WithAuth
                    fallback={
                      <Link href="/customers/sign-in">
                        <Heart className="h-7 w-7 text-white" />
                      </Link>
                    }
                  >
                    <Link href="/customer/wishlist">
                      <Heart className="h-7 w-7 text-white" />
                    </Link>
                  </WithAuth>
                  <LoginPopover />
                </>
              )}
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
