import { Metadata, ResolvingMetadata } from 'next';

import ProductPage from '@/components/pages/ProductPage';
import { config } from '@/config';
import { PLACEHOLDER_IMG_URL } from '@/data/constants';
import { getProductById } from '@/features/products/server/products/getProductById';

type Props = {
  params: Promise<{ id: string }>;
};

// Generate metadata for the page
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Resolve the ID
  const { id } = await params;

  // Fetch product data
  const product = await getProductById(id);

  // Get the base URL for absolute URLs
  const baseUrl = config.baseUrl || 'http://localhost:3000';

  // Construct absolute image URL
  const imageUrl =
    product?.images && product.images.length > 0
      ? product.images[0].url.startsWith('http')
        ? product.images[0].url
        : `${product.images[0].url}`
      : `${baseUrl}/${PLACEHOLDER_IMG_URL}`;

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${product?.name || 'Product'} | Metro Cash & Carry`,
    description: product?.description || 'Product description',
    openGraph: {
      title: `${product?.name || 'Product'} | Metro Cash & Carry`,
      description: product?.description || 'Product description',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product?.name || 'Product image',
        },
        ...previousImages,
      ],
      siteName: 'Metro Cash & Carry',
      type: 'website', // Changed from 'product' to 'website'
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product?.name || 'Product'} | Metro Cash & Carry`,
      description: product?.description?.slice(0, 200) || 'Product description',
      images: [imageUrl],
    },
  };
}

const ProductDetails = async ({ params }: Props) => {
  const { id } = await params;
  const productDetails = await getProductById(id);

  return <ProductPage product={productDetails} />;
};

export default ProductDetails;
