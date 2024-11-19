import { CategoryWithProducts } from '@/features/products/schemas/category';

type Props = {
  activeTabs: string | null;
  category: CategoryWithProducts;
};

const SubCategoryProducts = ({ activeTabs, category }: Props) => {
  return <div>SubCategoryProducts</div>;
};

export default SubCategoryProducts;
