'use client';

import ProductInfo from '@/features/products/components/ProductInfo';
import { useCategoryById } from '@/features/products/hooks/product-query-hooks';
import { Product } from '@/features/products/schemas/products';

import ProductOptions from '../landing/different-product-options/ProductOptions';
import BreadCrumbQuickUI from '../layout/BreadCrumbQuickUI';
import Container from '../layout/Container';
import ProductAdditonalInfo from '../product-details/ProductAdditonalInfo';

type Props = {
  product: Product;
};

const ProductPage = ({ product }: Props) => {
  const { data: category } = useCategoryById(product.category_id);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: `${product.name}`, href: `/products/${product.id}` },
  ];

  return (
    <div>
      <BreadCrumbQuickUI breadcrumbs={breadcrumbs} />

      <Container className="">
        <div className="flex flex-col gap-10">
          <ProductInfo border product={product} />
          <ProductAdditonalInfo product={product} category={category} />
        </div>
      </Container>
      <div className="py-10">
        <ProductOptions />
      </div>
    </div>
  );
};

export default ProductPage;
