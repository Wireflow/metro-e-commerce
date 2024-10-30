import ProductDetailsPage from '@/features/products/pages/products/ProductDetailsPage';
import { getProductById } from '@/features/products/server/products/getProductById';
import { getProductSalesById } from '@/features/products/server/products/getProductSalesById';

type Props = {
  params: {
    id: string;
  };
};

const ProductDetails = async ({ params }: Props) => {
  const { id } = await params;
  const product = await getProductById(id);
  const sales = await getProductSalesById(id);

  return <ProductDetailsPage product={product} sales={sales} />;
};

export default ProductDetails;
