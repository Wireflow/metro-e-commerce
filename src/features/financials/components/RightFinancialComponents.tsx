import { ShoppingCart } from 'lucide-react';

import AnalyticCard from '@/components/AnalyticCard';
import { DailyAnalytics } from '@/features/dashboard/schemas/daily-analytics';
import { Row } from '@/types/supabase/table';
import { formatCurrency } from '@/utils/utils';

import { Salesperson } from '../server/getSalespersons';
import SalesTeam from './SalesTeam';

type Props = {
  analytics: DailyAnalytics;
  salesTeam: Salesperson[];
  salesPersonOrders: Row<'orders'>[];
};

const RightFinancialComponents = ({ analytics, salesTeam, salesPersonOrders }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <AnalyticCard
        title="Cost of goods sold (COGS)"
        value={formatCurrency(analytics?.cogs ?? 0)}
        icon={ShoppingCart}
      />
      <SalesTeam salesTeam={salesTeam} salesPersonOrders={salesPersonOrders} />
    </div>
  );
};

export default RightFinancialComponents;
