import { CheckCircle, Eye, EyeOff, Package, XCircle } from 'lucide-react';

import InfoCard from '@/components/InfoCard';

import { ProductAnalytics } from '../../server/products/getProductsAnalytics';

type Props = {
  analytics: ProductAnalytics;
};

const ProductsAnalytics = ({ analytics }: Props) => {
  return (
    <div className="mb-4 grid w-full grid-cols-2 flex-wrap gap-4 md:flex">
      <InfoCard
        title="Total Products"
        className="w-full md:w-auto"
        value={analytics?.total_products_count}
        icon={<Package className="h-4 w-4" />}
      />
      <InfoCard
        title="In Stock"
        className="w-full md:w-auto"
        value={analytics?.in_stock_count}
        variant="success"
        icon={<CheckCircle className="h-4 w-4" />}
      />
      <InfoCard
        title="Out of Stock"
        className="w-full md:w-auto"
        value={analytics?.out_of_stock_count}
        variant="error"
        icon={<XCircle className="h-4 w-4" />}
      />
      <InfoCard
        title="Published"
        className="w-full md:w-auto"
        value={analytics?.published_products_count}
        variant="info"
        icon={<Eye className="h-4 w-4" />}
      />
      <InfoCard
        title="Unpublished"
        className="w-full md:w-auto"
        value={analytics?.unpublished_products_count}
        variant="warning"
        icon={<EyeOff className="h-4 w-4" />}
      />
    </div>
  );
};

export default ProductsAnalytics;
