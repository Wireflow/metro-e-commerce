import Image from 'next/image';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import AdminSignInForm from '../components/admins/AdminSignInForm';

const AdminSignInPage = () => {
  return (
    <div className="min-h-screen">
      <div className="relative flex min-h-screen flex-col md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/customers/sign-in"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 md:right-8 md:top-8'
          )}
        >
          Customer Login
        </Link>

        {/* Left Panel - Now visible on mobile */}
        <div className="relative hidden h-full bg-muted p-6 md:p-10 lg:block">
          <div className="absolute inset-0 bg-gray-300" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image src="/logo.png" width={75} height={75} alt="logo" className="mr-2 h-6 w-6" />
            Metro Cash & Carry
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                Your premier wholesale partner delivering quality products and exceptional service
                to businesses across the region.
              </p>
            </blockquote>
          </div>
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
