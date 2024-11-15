import Link from 'next/link';

import { ShoppingCart } from 'lucide-react';

import AnalyticCard from '@/components/AnalyticCard';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DailyAnalytics } from '@/features/dashboard/schemas/daily-analytics';
import { Row } from '@/types/supabase/table';
import { formatCurrency } from '@/utils/utils';

type Props = {
  analytics: DailyAnalytics;
  salesTeam: Row<'users'>[];
  salesPersonOrders: Row<'orders'>[];
};

const RightFinancialComponents = ({ analytics, salesTeam, salesPersonOrders }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="mt-[43px]">
        <AnalyticCard
          title="Cost of goods sold (COGS)"
          value={formatCurrency(analytics?.cogs ?? 0)}
          icon={ShoppingCart}
        />
      </div>
      <div>
        <Card className="h-full min-h-0 flex-1 overflow-auto shadow-none">
          <CardHeader>
            <CardTitle className="md:text-md text-gray-500">Sales Team</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              {salesTeam.map(user => (
                <div key={user.id} className="flex items-center gap-10">
                  <div className="flex w-fit flex-col items-center gap-2">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="font-bold">{user.first_name[0]}</AvatarFallback>
                    </Avatar>
                    <p className="text-md">{user.first_name}</p>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="font-bold">Total Sales</p>
                      <p>
                        {formatCurrency(
                          salesPersonOrders
                            .filter(order => order.salesperson_id === user.id)
                            .reduce((acc, order) => acc + order.total_amount, 0)
                        )}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-bold">Orders</p>
                      <p>{salesPersonOrders.length} orders</p>
                    </div>
                    <div>
                      <Link href={`/admin/users/${user.id}`}>
                        <Button variant={'outline'}>View</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RightFinancialComponents;
