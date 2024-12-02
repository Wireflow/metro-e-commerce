'use client';

import { redirect } from 'next/navigation';

import TrackedOrder from '@/features/track/components/TrackedOrder';
import { useOrderTracking } from '@/features/track/hooks/queries/track-query-hooks';

import BreadCrumbQuickUI from '../layout/BreadCrumbQuickUI';
import Container from '../layout/Container';
import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

type Props = {
  id: number;
  breadcrumbs?: boolean;
};

const TrackedOrderDetailsPage = ({ id, breadcrumbs = true }: Props) => {
  const { data: order, isLoading } = useOrderTracking({ orderNumber: id, enabled: !!id });

  const pageBreadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Track Order', href: '/track' },
    { label: 'Details', href: `/track/${id}` },
  ];

  if (isLoading) {
    return (
      <Container>
        <Skeleton className="h-[400px] w-full" />
      </Container>
    );
  }

  if (!order) {
    return redirect('/track');
  }

  return (
    <>
      {breadcrumbs && <BreadCrumbQuickUI breadcrumbs={pageBreadcrumbs} />}
      {breadcrumbs ? (
        <Container>
          <Card className="p-4 shadow-none md:my-10">
            <TrackedOrder order={order} />
          </Card>
        </Container>
      ) : (
        <TrackedOrder order={order} />
      )}
    </>
  );
};

export default TrackedOrderDetailsPage;
