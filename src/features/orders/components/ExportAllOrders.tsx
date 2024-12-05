'use client';

import { Download, Loader2 } from 'lucide-react';
import { ReactNode, useState } from 'react';

import { Button } from '@/components/ui/button';
import { formatDateForCSV } from '@/utils/dateUtils';
import { formatCurrency, formatPhoneNumber } from '@/utils/utils';

import { usePaginatedOrders } from '../hooks/orders-query-hook';

type Props = {
  children: ReactNode;
};

const ExportAllOrders = ({ children }: Props) => {
  const [isExporting, setIsExporting] = useState(false);

  const { data, isLoading } = usePaginatedOrders(
    { sortBy: 'created_at', sortOrder: 'desc' },
    { page: 1, pageSize: 1000 }
  );

  const orders = data?.data ?? [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatCSVField = (value: any): string => {
    if (value === null || value === undefined) {
      return '""';
    }
    const stringValue = String(value);
    // If the value contains quotes, commas, or newlines, wrap it in quotes and escape internal quotes
    if (stringValue.includes('"') || stringValue.includes(',') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);

      // Wait for data to be loaded before proceeding
      while (!data && isLoading) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      if (!data) {
        console.error('Failed to load orders');
        return;
      }

      // Define headers with consistent formatting
      const headerFields = [
        'Order Number',
        'Order Type',
        'Current Status',
        'Total',
        'Quantity',
        'Customer Name',
        'Customer Email',
        'Customer Phone',
        'Payment Method',
        'Created At',
      ];

      const headers = headerFields.map(formatCSVField).join(',');

      const rows = orders.map(order => {
        const rowFields = [
          order?.order_number ?? '',
          order?.type ?? '',
          order?.status ?? '',
          formatCurrency(order?.total_amount ?? 0),
          order?.total_quantity ?? '',
          order?.customer?.business_name ?? '',
          order?.customer?.email ?? '',
          formatPhoneNumber(order?.customer?.phone ?? ''),
          order?.payment?.payment_type ?? 'N/A',
          formatDateForCSV(new Date(order?.created_at ?? new Date())),
        ];

        return rowFields.map(formatCSVField).join(',');
      });

      // Combine headers and rows with Windows-style line endings for better compatibility
      const csv = [headers, ...rows].join('\r\n');

      // Create and download file
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute('download', `orders-export-${new Date().toISOString().split('T')[0]}.csv`);
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
      disabled={isExporting}
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

export default ExportAllOrders;
