'use client';

import { redirect } from 'next/navigation';

import TrackedOrder from '@/features/track/components/TrackedOrder';
import { useOrderTracking } from '@/features/track/hooks/queries/track-query-hooks';

import AnimtedLoadingSpinner from '../animation/AnimtedLoader';
import BreadCrumbQuickUI from '../layout/BreadCrumbQuickUI';
import Container from '../layout/Container';

type Props = {
  id: number;
  Breadcrumb: boolean;
};

const TrackedOrderDetailsPage = ({ id, Breadcrumb = true }: Props) => {
  const { data: order, isLoading } = useOrderTracking({ orderNumber: id, enabled: !!id });
  const breadcrumbs = [
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
      {Breadcrumb && <BreadCrumbQuickUI breadcrumbs={breadcrumbs} />}
      <Container>
        <TrackedOrder order={order} />
      </Container>
    </div>
  );
};

export default TrackedOrderDetailsPage;
