import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import WithAuth from '@/features/auth/components/WithAuth';

import { Button } from '../ui/button';
import Container from './Container';

const AdminAlert = () => {
  return (
    <WithAuth rules={{ requiredRole: 'admin', customCheck: m => m.role === 'admin' }}>
      <div className="bg-theme-sky-blue text-white">
        <Container>
          <div className="flex items-center justify-center gap-2 md:justify-between">
            <p className="hidden rounded-md bg-white px-4 py-1 text-sm font-medium text-black md:block">
              You are signed in as an admin
            </p>
            <Link href={'/admin'}>
              <Button variant={'secondary'}>
                Admin Dashboard <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </WithAuth>
  );
};

export default AdminAlert;
