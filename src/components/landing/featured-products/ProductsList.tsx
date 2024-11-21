import Container from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/skeleton';
import PublicProductList from '@/features/products/components/partials/PublicProductList';
import { Product } from '@/features/products/schemas/products';

type Props = {
  products: Product[] | undefined;
  isLoading: boolean;
};

const ProductsList = ({ products, isLoading }: Props) => {
  if (isLoading) {
    return (
      <Container className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-[300px] w-full rounded-[4px]" />
        ))}
      </Container>
    );
  }

  const productList = (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {products
          ?.slice(0, 4)
          .map(product => (
            <PublicProductList
              key={`large-${product.id}`}
              data={[product]}
              contentClassName="grid gap-4"
            />
          ))}
      </div>
    </div>
  );

  return products && products.length > 0 ? (
    productList
  ) : (
    <div className="flex h-full items-center justify-center p-8">
      <p className="text-muted-foreground">No featured products available</p>
    </div>
  );
};

export default ProductsList;
