import PublishProductPage from '@/features/products/pages/products/PublishProductPage';
import { getProductById } from '@/features/products/server/products/getProductById';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const PublishProduct = async ({ params }: Props) => {
  const { id } = await params;
  const product = await getProductById(id);

  return <PublishProductPage product={product} />;
};

export default PublishProduct;
