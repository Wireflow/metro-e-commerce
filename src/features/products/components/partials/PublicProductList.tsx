import { useRouter } from 'next/navigation';

import List, { ListProps } from '@/components/List';

import { Product } from '../../schemas/products';
import ProductCard from '../ProductCard';

type Props = Omit<ListProps<Product>, 'renderItem'> & {
  renderItem?: (item: Product, index: number) => React.ReactNode;
};

const PublicProductList = ({ renderItem, ...props }: Props) => {
  const router = useRouter();

  const defaultRenderItem = (item: Product) => (
    <ProductCard
      key={item.id}
      className="group flex cursor-pointer flex-col gap-4 p-4 transition-all hover:shadow-lg"
      onClick={() => router.push(`/products/${item.id}`)}
    >
      <ProductCard.Image product={item} className="aspect-square w-full object-contain" />
      <div className="flex flex-col gap-1">
        <ProductCard.Title product={item} size="sm" className="truncate" />
        <ProductCard.Price product={item} />
      </div>
    </ProductCard>
  );

  return <List<Product> renderItem={renderItem ?? defaultRenderItem} {...props} />;
};

export default PublicProductList;
