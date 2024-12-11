'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BarcodeScanner } from 'react-barcode-scanner';

import AnimtedLoadingSpinner from '@/components/animation/AnimtedLoader';
import Container from '@/components/layout/Container';
import { Card } from '@/components/ui/card';
import ProductCard from '@/features/products/components/ProductCard';
import { useProductByBarcode } from '@/features/products/hooks/queries/useProductByBarcode';
import { useQuickViewStore } from '@/features/products/store/useQuickViewStore';

import 'react-barcode-scanner/polyfill';

const formats = ['qr_code', 'ean_13', 'ean_8', 'code_128', 'code_39'];

const ScannerPage = () => {
  const [barcode, setBarcode] = useState<string | null>(null);
  const setProductAndOpen = useQuickViewStore(state => state.setProductAndOpen);
  const { data: product, isLoading } = useProductByBarcode(barcode);

  const router = useRouter();

  const handleScan = (barcode: string) => {
    setBarcode(barcode);
  };

  useEffect(() => {
    if (product) {
      setProductAndOpen(product);
    }
  }, [product, setProductAndOpen]);

  return (
    <Container className="mx-auto max-w-[500px] space-y-4 py-16 sm:max-w-[500px] md:max-w-[500px] lg:max-w-[500px]">
      <div className="text-center">
        <p className="text-lg font-bold">Scan Products</p>
        {!!barcode && (
          <p className="text-sm text-gray-500">
            Scanning for: <span className="font-bold">{barcode}</span>
          </p>
        )}
      </div>
      <Card className="mx-auto overflow-hidden rounded-2xl">
        <BarcodeScanner
          className="max-h-[250px] max-w-[500px]"
          onCapture={barcodes => {
            handleScan(barcodes[0].rawValue);
          }}
          options={{
            formats,
          }}
        />
      </Card>
      {product ? (
        <ProductCard
          key={product?.id}
          onClick={() => router.push(`/products/${product?.id}`)}
          className="flex cursor-pointer items-center gap-4 overflow-hidden p-0"
        >
          <div className="relative h-32 w-28 flex-shrink-0 overflow-hidden">
            <ProductCard.Image
              className="absolute inset-0 h-full w-full object-cover"
              product={product}
              disableHoverEffect
              disableSaleBadge
            />
          </div>
          <div className="flex flex-col gap-1">
            <ProductCard.Title size="sm" product={product} className="max-w-[250px] text-wrap" />
            <ProductCard.Price product={product} className="w-fit" />
            <ProductCard.AdminEditButton product={product} className="w-fi4 mr-2" size={'sm'}>
              Edit Product
            </ProductCard.AdminEditButton>
          </div>
        </ProductCard>
      ) : isLoading ? (
        <div className="space-y-2">
          <p className="text-center text-sm text-gray-500">Looking up product...</p>
          <AnimtedLoadingSpinner />
        </div>
      ) : (
        <div>
          <p className="text-center text-sm text-gray-500">
            Begin scanning a product to see pricing or add it to your cart
          </p>
          <p className="mt-1 text-center text-xs font-bold text-gray-500">
            (Better experienced on mobile devices)
          </p>
        </div>
      )}
    </Container>
  );
};

export default ScannerPage;
