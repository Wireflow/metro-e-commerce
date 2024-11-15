'use client';

import Link from 'next/link';

import { ArrowRight, PartyPopper, Rocket, X } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import Container from '../layout/Container';
import { Button } from '../ui/button';

const PromoBanner = () => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={cn('relative bg-theme-secondary', {
        'block translate-y-0': open,
        'hidden -translate-y-full': !open,
      })}
    >
      <Container>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <PartyPopper className="h-5 w-5 text-white" />
            <p className="text-sm font-medium text-white">Best Wholesale Prices</p>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Rocket className="h-5 w-5 animate-pulse text-white" />
            <p className="text-lg font-bold tracking-wide text-white">
              FREE EXPRESS DELIVERY ON ALL LOCAL ORDERS
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link href={'/shop/all'}>
              <Button size="sm">
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="sm"
              variant={'ghost'}
              className="h-8 p-0 text-white hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PromoBanner;
