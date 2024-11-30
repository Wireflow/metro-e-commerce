'use client';

import { redirect } from 'next/navigation';

import TrackedOrder from '@/features/track/components/TrackedOrder';
import { useOrderTracking } from '@/features/track/hooks/queries/track-query-hooks';

import AnimtedLoadingSpinner from '../animation/AnimtedLoader';
import BreadCrumbQuickUI from '../layout/BreadCrumbQuickUI';
import Container from '../layout/Container';

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
    return <AnimtedLoadingSpinner className="mt-10" />;
  }
  if (!order) {
    return redirect('/track');
  }

  return (
    <div>
      {breadcrumbs && <BreadCrumbQuickUI breadcrumbs={pageBreadcrumbs} />}
      <Container>
        <TrackedOrder order={order} />
      </Container>
    </div>
  );
};

export default TrackedOrderDetailsPage;
