'use client';

import { XCircle } from 'lucide-react';
import { useEffect } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <Alert variant="destructive">
          <XCircle className="h-5 w-5" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Something went wrong while loading customer.
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-2 rounded bg-red-50 p-2 font-mono text-sm">{error.message}</div>
            )}
          </AlertDescription>
        </Alert>

        <div className="flex justify-center">
          <Button onClick={() => reset()} variant="black" className="px-8">
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
