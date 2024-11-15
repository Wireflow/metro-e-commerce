import { getSalespersonCustomers } from '@/features/customers/server/getSalespersonCustomers';
import { getOrdersDetails } from '@/features/orders/server/orders/getOrdersDetails';
import UserDetailsPage from '@/features/users/pages/UserDetailsPage';
import { getUserById } from '@/features/users/server/getUserById';

export const dynamic = 'force-dynamic';
export const revalidate = 10;

type Props = {
  params: {
    id: string;
  };
};

const UserDetails = async ({ params }: Props) => {
  const { id } = await params;

  const [user, orders, customers] = await Promise.all([
    getUserById(id),
    getOrdersDetails({ salespersonId: id, include: { customer: true, payment: true } }),
    getSalespersonCustomers(id),
  ]);

  return <UserDetailsPage user={user} orders={orders ?? []} customers={customers ?? []} />;
};

export default UserDetails;
