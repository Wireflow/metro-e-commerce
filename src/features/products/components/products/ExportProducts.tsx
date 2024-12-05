'use client';

import { Download, Loader2 } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { formatDateForCSV } from '@/utils/dateUtils';
import { formatCurrency } from '@/utils/utils';

import { usePaginatedProducts } from '../../hooks/product-paginated-query';

type Props = {
  children: ReactNode;
};

const ExportProducts = ({ children }: Props) => {
  const [isExporting, setIsExporting] = useState(false);

  const { data, isLoading } = usePaginatedProducts(
    {
      sortBy: 'created_at',
      sortOrder: 'desc',
    },
    {
      page: 1,
      pageSize: 1000,
    }
  );

  const products = data?.data ?? [];

  // Helper function to escape and format CSV fields
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatCSVField = (value: any): string => {
    if (value === null || value === undefined) {
      return '""';
    }
    const stringValue = String(value);
    if (stringValue.includes('"') || stringValue.includes(',') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  // Helper function to format boolean values
  const formatBoolean = (value: boolean | undefined): string => {
    return value ? 'Yes' : 'No';
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);

      // Wait for data to be loaded before proceeding
      while (!data && isLoading) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      if (!data) {
        toast.error('Failed to load products');
        return;
      }

      // Define headers with consistent formatting
      const headerFields = [
        'Name',
        'Description',
        'Item Number',
        'Cost Price',
        'Retail Price',
        'Wholesale Price',
        'Retail Discount',
        'Wholesale Discount',
        'Discounted Until',
        'In Stock',
        'Is Featured',
        'Is Tobacco',
        'Is Taxed',
        'Is Published',
        'Brand',
        'Unit',
        'Image URL',
        'Created At',
        'Updated At',
      ];

      const headers = headerFields.map(formatCSVField).join(',');

      const rows = products.map(product => {
        const rowFields = [
          product.name ?? '',
          product.description ?? '',
          product.item_number ?? '',
          formatCurrency(product.cost_price) ?? '',
          formatCurrency(product.retail_price) ?? '',
          formatCurrency(product.wholesale_price) ?? '',
          formatCurrency(product?.retail_discount ?? 0) ?? '',
          formatCurrency(product?.wholesale_discount ?? 0) ?? '',
          product.discounted_until ? formatDateForCSV(new Date(product.discounted_until)) : '',
          formatBoolean(product.in_stock),
          formatBoolean(product.is_featured),
          formatBoolean(product.is_tobacco),
          formatBoolean(product.is_taxed),
          formatBoolean(product.published),
          product.manufacturer ?? '',
          product.unit ?? '',
          product.images && product.images.length > 0 ? product.images[0].url : '',
          formatDateForCSV(new Date(product.created_at ?? new Date())),
          formatDateForCSV(new Date(product.updated_at ?? new Date())),
        ];

        return rowFields.map(formatCSVField).join(',');
      });

      // Combine headers and rows with Windows-style line endings
      const csv = [headers, ...rows].join('\r\n');

      // Create and download file
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute(
        'download',
        `products-export-${new Date().toISOString().split('T')[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      variant="outline"
      disabled={isLoading || isExporting}
      className="flex items-center gap-2"
    >
      {isLoading || isExporting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading...
          <Download className="h-4 w-4" />
        </>
      ) : (
        <>
          {children}
          <Download className="h-4 w-4" />
        </>
      )}
    </Button>
  );
};

export default ExportProducts;
