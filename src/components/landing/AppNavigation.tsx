'use client';

import { Heart, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import SignOutButton from '@/features/auth/components/SignOutButton';
import WithAuth from '@/features/auth/components/WithAuth';
import { signOut } from '@/features/auth/server/signOut';
import CartPopover from '@/features/cart/components/CartPopover';
import { useBranch } from '@/hooks/queries/useMetro';
import { useUser } from '@/hooks/useUser';

import Logo from '../branding/Logo';
import Container from '../layout/Container';
import { Button } from '../ui/button';
import LoginPopover from './LoginPopover';
import ProductSearchbar from './ProductSearch/ProductSearchbar';

const AppNavigation = () => {
  const { branch } = useBranch();
  const { metadata } = useUser();
  const router = useRouter();

  const role = metadata.role;

  const handleSignOut = async () => {
    try {
      await signOut();
      router.refresh();
      window.location.href = window.location.pathname;
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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
            {role !== 'admin' && (
              <>
                <CartPopover />

                <WithAuth
                  loadingPlaceholder={
                    <Link href="/customer/wishlist">
                      <Heart className="h-7 w-7 text-white" />
                    </Link>
                  }
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
                <WithAuth loadingPlaceholder={<LoginPopover />} fallback={<LoginPopover />}>
                  {metadata && !metadata.approved && !metadata.tax_id_image_url ? (
                    <SignOutButton variant={'minimal'} className="bg-white text-black">
                      Sign out <LogOut className="h-5 w-5" />
                    </SignOutButton>
                  ) : (
                    <LoginPopover />
                  )}
                </WithAuth>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 md:hidden">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Logo />
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
                  {!metadata.approved && metadata.id ? (
                    <Button onClick={handleSignOut}>Sign out</Button>
                  ) : (
                    <LoginPopover />
                  )}
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
