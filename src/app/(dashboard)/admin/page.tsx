import AnalyticCard from '@/components/AnalyticCard';
import { formatCurrency } from '@/utils/utils';

export default async function Admin() {
  return (
    <div className="flex w-full gap-4">
      <AnalyticCard title="Total Sales" value={formatCurrency(1000)} />
      <AnalyticCard title="Total Sales" value={formatCurrency(1000)} />
      <AnalyticCard title="Total Sales" value={formatCurrency(1000)} />
    </div>
  );
}
