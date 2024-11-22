import ProductPage from '@/components/pages/ProductPage';
import { getProductById } from '@/features/products/server/products/getProductById';

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  const productDetails = await getProductById(id);

  return <ProductPage product={productDetails} />;
};

export default page;
