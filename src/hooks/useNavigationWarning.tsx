import { useRouter } from 'next/navigation';

import { useCallback, useEffect, useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type UseNavigationWarningProps = {
  isDirty: boolean;
};

type NavigateOptions = {
  skipWarning?: boolean;
};

export const useNavigationWarning = ({ isDirty }: UseNavigationWarningProps) => {
  const [showWarning, setShowWarning] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const router = useRouter();

  // Handle browser back/forward/refresh
  const handleBeforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    },
    [isDirty]
  );

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [handleBeforeUnload]);

  // Navigation handlers
  const navigate = useCallback(
    (path: string, options?: NavigateOptions) => {
      if (isDirty && !options?.skipWarning) {
        setPendingNavigation(path);
        setShowWarning(true);
      } else {
        router.push(path);
      }
    },
    [isDirty, router]
  );

  const handleConfirmNavigation = useCallback(() => {
    if (pendingNavigation) {
      router.push(pendingNavigation);
    }
    setShowWarning(false);
    setPendingNavigation(null);
  }, [pendingNavigation, router]);

  const handleCancelNavigation = useCallback(() => {
    setShowWarning(false);
    setPendingNavigation(null);
  }, []);

  // Warning Dialog component
  const NavigationWarningDialog = useCallback(
    () => (
      <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to leave? All changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelNavigation}>Stay</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmNavigation}>
              Leave Without Saving
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
    [showWarning, handleCancelNavigation, handleConfirmNavigation]
  );

  return {
    navigate,
    NavigationWarningDialog,
    showWarning,
    setShowWarning,
  };
};
