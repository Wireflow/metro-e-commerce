'use client';

import { useCart } from '@/features/cart/hooks/queries/useCart';
import ProductInfo from '@/features/products/components/ProductInfo';
import { useCategoryById } from '@/features/products/hooks/product-query-hooks';
import { Product } from '@/features/products/schemas/products';
import { useWishList } from '@/features/wishlist/hooks/queries/wishlist-query-hooks';

import { Animate } from '../animation/Animate';
import ProductOptions from '../landing/different-product-options/ProductOptions';
import BreadCrumbQuickUI from '../layout/BreadCrumbQuickUI';
import Container from '../layout/Container';
import ProductAdditonalInfo from '../product-details/ProductAdditonalInfo';

type Props = {
  product: Product;
};

const ProductPage = ({ product }: Props) => {
  const { data: category } = useCategoryById(product.category_id);

  useCart();
  useWishList();

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: `${product.name}`, href: `/products/${product.id}` },
  ];

  return (
    <div>
      <BreadCrumbQuickUI breadcrumbs={breadcrumbs} />

      <Container className="">
        <Animate type="bounce">
          <div className="flex flex-col gap-10">
            <ProductInfo border product={product} />
            <ProductAdditonalInfo product={product} category={category} />
          </div>
        </Animate>
      </Container>
      <div className="py-10">
        <ProductOptions />
      </div>
    </div>
  );
};

export default ProductPage;
