'use client';

import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error:', error);

    // Optional: Send error to a tracking service
    // trackError(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-2xl">
        <AlertTriangle className="mx-auto mb-6 text-red-500" size={64} />
        <h2 className="mb-4 text-2xl font-bold text-red-800">Oops! Something Went Wrong</h2>

        <p className="mb-6 text-gray-600">
          We encountered an unexpected error. Don&apos;t worry, we&apos;re here to help.
        </p>

        {error.digest && (
          <div className="mb-6 rounded-md bg-gray-100 p-3 text-sm text-gray-700">
            <span className="font-semibold">Error ID:</span> {error.digest}
          </div>
        )}

        <div className="flex justify-center space-x-4">
          <Button onClick={() => reset()}>Try Again</Button>

          <Button variant="secondary" onClick={() => (window.location.href = '/')}>
            Go Home
          </Button>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left text-sm text-gray-600">
            <summary>Error Details</summary>
            <pre className="mt-2 overflow-x-auto rounded-md bg-gray-100 p-3">{error.message}</pre>
          </details>
        )}
      </div>
    </div>
  );
}
