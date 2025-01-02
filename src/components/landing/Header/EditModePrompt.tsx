'use client';

import { XCircle } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import WithAuth from '@/features/auth/components/WithAuth';
import { useGlobalDialog } from '@/hooks/useGlobalDialog';

const EditModePrompt = () => {
  const params = useSearchParams();
  const { open } = useGlobalDialog();
  const pathname = usePathname();
  const router = useRouter();
  const isInEditMode = params.get('edit') === 'true';
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isInEditMode || !!open) return null;

  const handleExitEditMode = () => {
    const newParams = new URLSearchParams(params);
    newParams.delete('edit');
    router.replace(`${pathname}?${newParams.toString()}`);
  };

  return (
    <WithAuth rules={{ requiredRole: 'admin' }}>
      <Alert
        className={`left-0 right-0 top-0 z-[200] border-none bg-primary text-white animate-in fade-in slide-in-from-top-2 ${isScrolled ? 'fixed rounded-t-none shadow-md' : 'relative rounded-none'}`}
        variant="default"
      >
        <AlertDescription className="flex flex-col items-start justify-between gap-3 p-2 text-sm sm:flex-row sm:items-center sm:gap-4">
          <span className="line-clamp-2 flex-1 text-xs sm:text-sm">
            You&apos;re in edit mode. Any changes you make will be saved automatically.
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExitEditMode}
            className="w-full whitespace-nowrap bg-white text-xs text-theme-primary hover:bg-white/90 hover:text-theme-primary sm:w-auto sm:text-sm"
          >
            <XCircle className="h-4 w-4" />
            <span className="ml-2">Exit Edit Mode</span>
          </Button>
        </AlertDescription>
      </Alert>
    </WithAuth>
  );
};

export default EditModePrompt;
