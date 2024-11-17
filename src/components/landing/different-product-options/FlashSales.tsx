import Image from 'next/image';

import { ProductProps } from '@/server/products/getSalesProducts';

type Props = {
  data: ProductProps[];
};

const FlashSales = ({ data }: Props) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 px-6 py-4">
      <p className="mb-3 text-lg font-semibold text-gray-900">Flash Sales</p>
      <div className="flex flex-col flex-wrap gap-4">
        {data.map(product => (
          <div key={product.id} className="flex w-full items-start space-x-3 rounded-md sm:w-64">
            <div className="relative h-16 w-16 flex-shrink-0">
              {product?.images?.product_images?.[0]?.url ? (
                <Image
                  src={product.images.product_images[0].url}
                  alt={product.name}
                  fill
                  className="rounded-md object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-md bg-gray-100">
                  <span className="text-xs text-gray-400">No image</span>
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-medium text-gray-900">{product.name}</h3>
              <p className="mt-1 text-sm font-bold text-red-600">${product.retail_price}</p>
              {product.discounted_until && (
                <p className="mt-1 text-xs text-gray-500">
                  Until {new Date(product.discounted_until).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSales;
