import { BadgeDollarSign, Logs, Package, Users } from 'lucide-react';

import AnalyticCard from '@/components/AnalyticCard';
import { DailyAnalytics } from '@/features/dashboard/schemas/daily-analytics';
import { formatCurrency } from '@/utils/utils';

type Props = {
  analytics: DailyAnalytics;
  ordersCount: number | null;
};

const FinancialsAnalytics = ({ analytics, ordersCount }: Props) => {
  return (
    <div className="grid flex-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <AnalyticCard
        title="Revenue"
        value={formatCurrency(analytics?.revenue ?? 0)}
        variant="dark"
        textColor="text-white"
        icon={BadgeDollarSign}
      />
      <AnalyticCard
        title="Products Sold"
        value={analytics?.total_products_sold ?? 0}
        variant="outlined"
        icon={Logs}
      />
      <AnalyticCard
        title="New Customers"
        value={analytics?.new_customers ?? 0}
        variant="outlined"
        icon={Users}
      />
      <AnalyticCard
        title="Total Orders"
        value={ordersCount ?? 0}
        variant="outlined"
        icon={Package}
      />
    </div>
  );
};

export default FinancialsAnalytics;
