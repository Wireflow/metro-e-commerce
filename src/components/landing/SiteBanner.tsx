'use client';

import { PartyPopper, Rocket, X } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { createClient } from '@/utils/supabase/client';

import Container from '../layout/Container';
import { Button } from '../ui/button';

const SiteBanner = () => {
  const [open, setOpen] = useState(true);
  const supabase = createClient();

  return (
    <div
      className={cn(
        'relative transform bg-gradient-to-r from-primary/90 to-primary transition-all duration-500 ease-in-out',
        {
          'translate-y-0 opacity-100': open,
          '-translate-y-full opacity-0': !open,
        }
      )}
    >
      <Container>
        <div className="flex w-full items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <PartyPopper className="h-5 w-5 animate-bounce text-white" />
            <p className="text-sm font-medium text-white">Launch Week Special Offer</p>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Rocket className="h-5 w-5 animate-pulse text-white" />
            <p className="text-lg font-bold tracking-wide text-white">
              FREE EXPRESS DELIVERY ON ALL ORDERS
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              className="bg-white font-semibold text-primary transition-colors hover:bg-white/90"
              size="sm"
            >
              Shop Now
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-white hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Container>
      <Button onClick={() => supabase.auth.signOut()}>Sign Out</Button>
    </div>
  );
};

export default SiteBanner;
