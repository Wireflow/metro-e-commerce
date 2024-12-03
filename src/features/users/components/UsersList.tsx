'use client';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DynamicTable, useTableFields } from '@/components/ui/dynamic-table';
import { Row } from '@/types/supabase/table';
import { formatRole } from '@/utils/roleUtils';
import { formatPhoneNumber } from '@/utils/utils';

type Props = {
  users: Row<'users'>[];
};

const UsersList = ({ users }: Props) => {
  const fields = useTableFields<Row<'users'>>([
    {
      key: user => user.first_name + ' ' + user.last_name,
      label: 'Name',
      className: 'min-w-[300px] md:min-w-none',
    },
    {
      key: user => user.email,
      label: 'Email',
      className: 'min-w-[300px] md:min-w-none',
    },
    {
      key: user => formatPhoneNumber(user?.phone ?? 'N/A'),
      label: 'Phone',
      className: 'min-w-[300px] md:min-w-none',
    },
    {
      key: user => (
        <Badge
          variant={
            user.role === 'admin' ? 'gray' : user.role.includes('sales') ? 'indigo' : 'secondary'
          }
        >
          {formatRole(user.role)}
        </Badge>
      ),
      label: 'Role',
      className: 'min-w-[300px] md:min-w-none',
    },
    {
      key: user => (
        <Link href={`/admin/users/${user.id}`}>
          <Button variant={'outline'} size={'sm'}>
            View
          </Button>
        </Link>
      ),
      label: '',
    },
  ]);

  return <DynamicTable fields={fields} data={users} emptyMessage="No users found" />;
};

export default UsersList;
