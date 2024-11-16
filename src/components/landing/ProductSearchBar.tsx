'use client';

import { Heart, Search, ShoppingCart, User } from 'lucide-react';

import { useBranch } from '@/hooks/queries/useMetro';

import Logo from '../branding/Logo';
import Container from '../layout/Container';
import { Input } from '../ui/input';

type Props = {};

const ProductSearchBar = (props: Props) => {
  const { branch } = useBranch();

  return (
    <div className="bg-theme-secondary">
      <Container className="flex items-center justify-between gap-4">
        <div className="hidden md:flex">
          <div className="flex flex-1 items-center gap-3">
            <Logo />
            <p className="text-xl text-white">{branch?.name}</p>
          </div>
        </div>
        <div className="flex w-full max-w-[600px]">
          <div className="relative w-full">
            <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black" />
            <Input placeholder="Search for anything..." className="bg-white py-6 pl-4" />
          </div>
        </div>
        <div className="flex gap-4 md:gap-6">
          <ShoppingCart className="h-6 w-6 text-white md:h-7 md:w-7" />
          <Heart className="h-6 w-6 text-white md:h-7 md:w-7" />
          <User className="h-6 w-6 text-white md:h-7 md:w-7" />
        </div>
      </Container>
    </div>
  );
};

export default ProductSearchBar;
