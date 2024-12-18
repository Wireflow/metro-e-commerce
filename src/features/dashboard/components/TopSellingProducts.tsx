import { useState } from 'react';

import QuickSelect, { SelectOptions } from '@/components/quick/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useTopSellingProducts } from '../hooks/useTopSellingProducts';
import { TopSellingProduct } from '../schemas/top-selling-product';
import TopProductsList from './TopProductsList';

interface TopSellingProductsProps {
  topSellingProducts: TopSellingProduct[];
}

const TopSellingProducts = ({ topSellingProducts }: TopSellingProductsProps) => {
  const [limit, setLimit] = useState('25');
  const { data: topSellingProductsData } = useTopSellingProducts(
    parseInt(limit),
    topSellingProducts
  );

  const oneToFifty = Array.from({ length: 50 }, (_, i) => i + 1).map(value => ({
    value: value.toString(),
    label: value.toString(),
  }));

  return (
    <Card className="h-full shadow-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="md:text-xl">Top Selling Products</CardTitle>
        <div className="w-[75px] space-y-2">
          <QuickSelect
            className="h-8"
            options={oneToFifty as SelectOptions[]}
            value={limit}
            onValueChange={v => v && setLimit(v)}
          />
        </div>
      </CardHeader>
      <CardContent className="flex max-h-[1000px] flex-col gap-4 overflow-auto custom-scrollbar">
        <TopProductsList topSellingProducts={topSellingProductsData ?? []} />
      </CardContent>
    </Card>
  );
};

export default TopSellingProducts;
