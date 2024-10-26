import Image from 'next/image';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import AdminSignInForm from '../components/admins/AdminSignInForm';

const AdminSignInPage = () => {
  return (
    <div className="min-h-screen">
      <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
        />
      </div>
      <div className="container relative hidden min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/examples/authentication"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 md:right-8 md:top-8'
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 lg:flex">
          <div className="0 absolute inset-0 bg-gray-300" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image src="/logo.png" width={75} height={75} alt="logo" className="mr-2 h-6 w-6" />
            Metro Cash & Carry
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                This library has saved me countless hours of work and helped me deliver stunning
                designs to my clients faster than ever before.
              </p>
            </blockquote>
          </div>
        </div>
        <div className="flex items-center justify-center lg:p-8">
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
