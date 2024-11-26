import CategoryDetailsPage from '@/features/products/pages/categories/CategoryDetailsPage';
import { getCategoryById } from '@/features/products/server/categories/getCategoryById';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const ProductDetails = async ({ params }: Props) => {
  const { id } = await params;
  const category = await getCategoryById(id);

  return <CategoryDetailsPage category={category} />;
};

export default ProductDetails;
