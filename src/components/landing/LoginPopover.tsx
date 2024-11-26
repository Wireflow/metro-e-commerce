'use client';

import { useRouter } from 'next/navigation';

import { User } from 'lucide-react';
import { useState } from 'react';

import SignInForm from '@/features/auth/components/forms/SignInForm';
import { useUser } from '@/hooks/useUser';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

type Props = {};

const LoginPopover = (props: Props) => {
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
      <PopoverContent className="mt-2 w-full rounded-[2px]" align="end">
        <SignInForm onSuccess={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
};

export default LoginPopover;
