'use client';

import { useState } from 'react';

import Animate from '@/components/animation/Animate';
import Pagination from '@/components/Pagination';
import { usePaginatedOrders } from '@/features/orders/hooks/orders-query-hook';
import { useUser } from '@/hooks/useUser';

import CustomerOrdersHistoryTable from '../components/CustomerOrdersHistoryTable';

const OrderHistoryPage = () => {
  const { user } = useUser();
  const [pagination, setPagination] = useState({ page: 1, pageSize: 5 });

  const { data: ordersData } = usePaginatedOrders(
    { customerId: user?.id, sortOrder: 'desc', sortBy: 'created_at' },
    {
      page: pagination.page,
      pageSize: pagination.pageSize,
    }
  );

  const handlePageChange = (newPage: number) => {
    setPagination({ page: newPage, pageSize: pagination.pageSize });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Animate className="space-y-6" type="bounce">
        {' '}
        <CustomerOrdersHistoryTable TableName="Order History" orders={ordersData?.data ?? []} />
        <Pagination
          currentPage={pagination.page}
          totalPages={ordersData?.metadata.totalPages ?? 1}
          onPageChange={handlePageChange}
          variant="round"
        />
      </Animate>
    </div>
  );
};

export default OrderHistoryPage;
