'use client';

import { ArrowLeft, HomeIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen w-full bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Image Container */}
        <div className="relative w-full">
          <div className="relative mx-auto aspect-square w-full sm:w-4/5 md:w-3/4 lg:w-2/3">
            <Image src="/404Error.png" alt="404 Error" fill className="object-contain" priority />
          </div>
        </div>

        {/* Content Container */}
        <div className="mt-8 flex flex-col items-center space-y-6 text-center">
          <div className="mx-auto max-w-md space-y-3 px-4">
            <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">Oops! Page Not Found</h2>
            <p className="text-sm text-gray-600 sm:text-base">
              The page you&apos;re trying to reach doesn&apos;t exist. Let&apos;s get you back on
              track.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <Button
              onClick={handleGoBack}
              className="w-full px-4 py-2 text-xs font-semibold sm:w-auto sm:px-6 sm:text-sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              GO BACK
            </Button>
            <Button
              onClick={handleGoHome}
              className="w-full px-4 py-2 text-xs font-semibold sm:w-auto sm:px-6 sm:text-sm"
              variant="outline"
            >
              <HomeIcon className="mr-2 h-4 w-4" />
              GO TO HOME
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
