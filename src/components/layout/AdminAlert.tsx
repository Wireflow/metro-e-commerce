import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import WithAuth from '@/features/auth/components/WithAuth';
import { useIsEditMode } from '@/features/promotions/hooks/useIsEditMode';

import { Button } from '../ui/button';
import Container from './Container';

const AdminAlert = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const isEditMode = useIsEditMode();

  const handleAddEditMode = () => {
    const newParams = new URLSearchParams(params);
    newParams.append('edit', 'true');
    router.replace(`${pathname}?${newParams.toString()}`);
  };

  if (isEditMode) {
    return null;
  }

  return (
    <WithAuth rules={{ requiredRole: 'admin' }}>
      <div className="bg-theme-sky-blue text-white">
        <Container>
          <div className="flex items-center justify-center gap-2 md:justify-between">
            <p className="hidden rounded-md bg-white px-4 py-1 text-sm font-medium text-black md:block">
              You are signed in as an admin
            </p>
            <div className="flex items-center gap-2">
              <Link href={'/admin'}>
                <Button variant={'secondary'}>
                  Admin Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button onClick={handleAddEditMode}>Edit Mode</Button>
            </div>
          </div>
        </Container>
      </div>
    </WithAuth>
  );
};

export default AdminAlert;
