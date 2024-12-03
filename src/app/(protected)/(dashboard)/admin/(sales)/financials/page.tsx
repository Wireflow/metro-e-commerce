import { Suspense } from 'react';

import FinancialsPage from '@/features/financials/components/FinancialsPage';
import { fetchFinancialsData } from '@/features/financials/server/fetchFinancialData';

type PageProps = {
  searchParams: Promise<{
    from?: string;
    to?: string;
  }>;
};

const Financials = async ({ searchParams }: PageProps) => {
  const params = await searchParams;

  const initialData = await fetchFinancialsData(params?.from, params?.to);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FinancialsPage initialData={initialData} />
    </Suspense>
  );
};

export default Financials;
