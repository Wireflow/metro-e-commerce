'use client';
import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/components/branding/Logo';
import { buttonVariants } from '@/components/ui/button';
import { MacBookMockup } from '@/data/constants';
import { cn } from '@/lib/utils';

import AdminSignInForm from '../components/admins/AdminSignInForm';

const AdminSignInPage = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-neutral-800 p-5">
        <div className="flex items-center justify-between">
          <div className="sm;text-xl relative z-20 flex items-center gap-2 font-medium text-white">
            <Logo />
            Metro Cash & Carry
          </div>
          <Link
            href="/customers/sign-in"
            className={cn(buttonVariants({ variant: 'ghost' }), 'text-white')}
          >
            Customer Login
          </Link>
        </div>
      </div>
      <div className="relative flex min-h-screen flex-col md:grid lg:max-w-none lg:px-0 xl:grid-cols-2">
        <div className="relative hidden h-full justify-center gap-28 bg-gray-200 p-6 md:p-10 xl:flex xl:flex-col">
          <Image
            src={MacBookMockup}
            width={900}
            height={900}
            alt="Mac Mockup"
            className="h-auto w-auto max-w-full object-contain"
          />
        </div>

        {/* Right Panel */}
        <div className="flex h-screen items-center justify-center p-6 lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Admin Sign In</h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to access the admin panel
              </p>
            </div>
            <AdminSignInForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignInPage;
