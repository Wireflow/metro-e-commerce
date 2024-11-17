import { getSalesProducts } from '@/server/products/getSalesProducts';

import FlashSales from './FlashSales';

type Props = {};

const ProductOptions = async (props: Props) => {
  const products = await getSalesProducts();
  return (
    <div>
      <FlashSales data={products} />
    </div>
  );
};

export default ProductOptions;
