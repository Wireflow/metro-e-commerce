import { useRouter, useSearchParams } from 'next/navigation';

import List, { ListProps } from '@/components/List';
import { getEditModePath } from '@/lib/editRouting';

import { Product } from '../../schemas/products';
import ProductCard from '../ProductCard';

type Props = Omit<ListProps<Product>, 'renderItem'> & {
  renderItem?: (item: Product, index: number) => React.ReactNode;
};

const PublicProductList = ({ renderItem, ...props }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleProductClick = (productId: string) => {
    const url = getEditModePath(`/products/${productId}`, searchParams);
    router.push(url);
  };
  const defaultRenderItem = (item: Product) => (
    <ProductCard
      key={item.id}
      className="group flex cursor-pointer flex-col gap-4 p-4 transition-all hover:shadow-lg"
      onClick={() => handleProductClick(item.id)}
    >
      <ProductCard.Image product={item} className="aspect-square w-full object-contain" />
      <div className="flex flex-col gap-1">
        <ProductCard.Title product={item} size="sm" className="truncate" />
        <ProductCard.Price product={item} />
        <ProductCard.AdminEditButton product={item} />
      </div>
    </ProductCard>
  );

  return (
    <List<Product>
      renderItem={renderItem ?? defaultRenderItem}
      {...props}
      ListEmptyComponent={props.ListEmptyComponent ?? <p>No Products Found</p>}
    />
  );
};

export default PublicProductList;
