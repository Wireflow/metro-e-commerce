'use client';

import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { formatDateForCSV } from '@/utils/dateUtils';

import { Product } from '../../schemas/products';

type Props = {
  products: Product[];
  children: ReactNode;
};

const ExportProducts = ({ products, children }: Props) => {
  const handleExport = () => {
    // Define headers
    const headers = [
      'Name',
      'Description',
      'Cost Price',
      'Retail Price',
      'Wholesale Price',
      'Discount',
      'Discounted Until',
      'In Stock',
      'Is Featured',
      'Is Tobacco',
      'Manufacturer',
      'Published',
      'Unit',
      'Created At',
      'Updated At',
    ].join(',');

    // Convert products to CSV rows
    const rows = products.map(({ ...product }) =>
      [
        `"${product.name}"`,
        `"${product.description || ''}"`,
        product.cost_price,
        product.retail_price,
        product.wholesale_price,
        product.discount || '',
        product.discounted_until ? `"${new Date(product.discounted_until).toLocaleString()}"` : '',
        product.in_stock ? 'Yes' : 'No',
        product.is_featured ? 'Yes' : 'No',
        product.is_tobacco ? 'Yes' : 'No',
        `"${product.manufacturer || ''}"`,
        product.published ? 'Yes' : 'No',
        `"${product.unit || ''}"`,
        `"${formatDateForCSV(new Date(product.created_at))}"`,
        `"${formatDateForCSV(new Date(product.updated_at))}"`,
      ].join(',')
    );

    // Combine headers and rows
    const csv = [headers, ...rows].join('\n');

    // Create and download file
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `products-export-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleExport} variant={'outline'} asChild>
      {children}
    </Button>
  );
};

export default ExportProducts;
