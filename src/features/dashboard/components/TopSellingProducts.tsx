import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { TopSellingProduct } from '../schemas/top-selling-product';
import TopProductsList from './TopProductsList';

interface TopSellingProductsProps {
  topSellingProducts: TopSellingProduct[];
}

const TopSellingProducts = ({ topSellingProducts }: TopSellingProductsProps) => {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="md:text-xl">Top Selling Products</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TopProductsList topSellingProducts={topSellingProducts} />
      </CardContent>
    </Card>
  );
};

export default TopSellingProducts;
