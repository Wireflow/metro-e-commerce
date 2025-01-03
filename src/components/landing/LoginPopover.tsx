'use client';

import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import SignInForm from '@/features/auth/components/forms/SignInForm';
import { useUser } from '@/hooks/useUser';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const LoginPopover = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (open === true && user) {
      router.push('/customer/dashboard');
      return;
    }

    setOpen(open);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <User className="h-6 w-6 text-white md:h-7 md:w-7" />
      </PopoverTrigger>
      <PopoverContent className="mt-2 w-screen rounded-[2px] md:w-auto" align="end">
        <SignInForm onSuccess={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
};

export default LoginPopover;
