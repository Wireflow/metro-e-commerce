import PublishProductPage from '@/features/products/pages/products/PublishProductPage';
import { getProductById } from '@/features/products/server/products/getProductById';

type Props = {
  params: {
    id: string;
  };
};

const PublishProduct = async ({ params: { id } }: Props) => {
  const product = await getProductById(id);

  return <PublishProductPage product={product} />;
};

export default PublishProduct;
