import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Order } from '@/features/orders/schemas/orders';
import { formatCurrency } from '@/utils/utils';

type Props = {
  orders: Order[];
  totalSales: number;
  avgOrderValue: number;
};

const UserPerformanceMetrics = ({ orders, totalSales, avgOrderValue }: Props) => {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">Total Sales</div>
          <div className="text-2xl font-bold">{formatCurrency(totalSales)}</div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium">Orders</div>
          <div className="text-2xl font-bold">{orders?.length}</div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium">Average Order Value</div>
          <div className="text-2xl font-bold">{formatCurrency(avgOrderValue)}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPerformanceMetrics;
