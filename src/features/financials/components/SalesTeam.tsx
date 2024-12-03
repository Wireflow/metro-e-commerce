import Link from 'next/link';

import { DollarSign, Package } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils/utils';

import { FinancialsData } from '../hooks/useFinancialData';

type Props = {
  salesTeam: FinancialsData['salesTeam'];
  salesPersonOrders: FinancialsData['salesPersonOrders'];
};

const SalesTeam = ({ salesTeam, salesPersonOrders }: Props) => {
  return (
    <Card className="h-full min-h-0 flex-1 overflow-auto">
      <CardHeader className="border-b py-6">
        <CardTitle className="font-medium">Sales Team</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="flex flex-col gap-4">
          {salesTeam.map(user => {
            const userSales = salesPersonOrders
              .filter(order => order.salesperson_id === user.id)
              .reduce((acc, order) => acc + order.total_amount, 0);

            return (
              <div key={user.id} className="rounded-lg border bg-white p-3 hover:bg-gray-50">
                {/* Top Row - Avatar and Name */}
                <div className="mb-3 flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-black text-white">
                      {user.first_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <p className="block truncate font-medium text-gray-900">
                    {user.first_name + ' ' + user.last_name}
                  </p>
                </div>

                {/* Stats Row */}
                <div className="mb-3 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-gray-500">Sales</p>
                      <p className="font-medium">{formatCurrency(userSales)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-gray-500">Orders</p>
                      <p className="font-medium">{salesPersonOrders.length}</p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Link href={`/admin/users/${user.id}`} className="block">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    View Details
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesTeam;
