'use client';

import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
// eslint-disable-next-line import/no-named-as-default
import DynamicTable, { useTableFields } from '@/components/ui/dynamic-table';
import { formatDateToString } from '@/utils/dateUtils';
import { formatPhoneNumber } from '@/utils/utils';

import { Customer } from '../schemas/customer';
import CustomerActions from './CustomerActions';

type Props = {
  customers: Customer[];
};

const CustomersList = ({ customers }: Props) => {
  const router = useRouter();
  const fields = useTableFields<Customer>([
    {
      key: c => (
        <div className="flex flex-col">
          <p>{c.business_name}</p>
          <p className="truncate text-xs text-gray-500">{c.street ?? 'No address on file'}</p>
        </div>
      ),
      label: 'Customer',
    },
    {
      key: c => formatPhoneNumber(c?.phone ?? ''),
      label: 'Phone',
      className: 'md:min-w-none min-w-[120px]',
    },
    {
      key: c => c.order_count,
      label: 'Orders',
    },
    {
      key: c => (
        <div className="flex gap-2">
          <Badge variant={c.blocked ? 'error' : c.approved ? 'success' : 'warning'}>
            {c.blocked ? 'Blocked' : c.approved ? 'Active' : 'Pending'}
          </Badge>
          {!c.blocked && c.approved && c.approved_tobacco ? (
            <Badge variant={c.approved_tobacco ? 'indigo' : 'error'}>
              {c.approved_tobacco ? 'Tobacco' : 'No Tobacco'}
              {c.approved_tobacco && <Check className="ml-1 h-3 w-3 text-indigo-600" />}
            </Badge>
          ) : null}
        </div>
      ),
      label: 'Status',
    },
    {
      label: 'Joined',
      key: c =>
        formatDateToString(new Date(c.created_at!), {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: undefined,
          minute: undefined,
        }),
    },
    {
      label: 'Actions',
      key: c => (
        <CustomerActions
          customerId={c.id!}
          approved={c.approved!}
          blocked={c.blocked!}
          onView={() => router.push(`/admin/customers/${c.id}`)}
        />
      ),
      className: 'text-center',
    },
  ]);

  return <DynamicTable fields={fields} data={customers} />;
};

export default CustomersList;
