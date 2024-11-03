'use client';

import AnalyticCard from '@/components/AnalyticCard';
import AnimatedDiv from '@/components/animation/AnimatedDiv';
import PageHeader from '@/components/layout/PageHeader';
import { formatCurrency } from '@/utils/utils';

import UpdateProductForm from '../../components/products/forms/UpdateProductForm';
import { Product } from '../../schemas/products';
import { ProductSales } from '../../server/products/getProductSalesById';

type Props = {
  product: Product;
  sales: ProductSales;
};

const ProductDetailsPage = ({ product, sales }: Props) => {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Products', href: '/admin/products/all' },
    { label: product.name, href: `/admin/products/${product.id}` },
  ];

  return (
    <AnimatedDiv>
      <PageHeader
        title={'Product Details'}
        description="View & edit product details"
        breadcrumbs={breadcrumbs}
      />

      <div className="mb-4 grid w-full gap-4 md:grid-cols-2">
        <AnalyticCard title="Total Sales" value={sales?.sales ?? 0} />
        <AnalyticCard
          value={formatCurrency(sales?.total_sales_value ?? 0)}
          title="Total Sales Value"
        />
      </div>

      <UpdateProductForm product={product} />
    </AnimatedDiv>
  );
};

export default ProductDetailsPage;
