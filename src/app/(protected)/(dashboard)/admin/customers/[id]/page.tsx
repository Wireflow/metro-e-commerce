import CustomerDetailsPage from '@/features/customers/pages/CustomerDetailsPage';
import { getCustomerById } from '@/features/customers/server/getCustomerById';
import { getCustomerOrders } from '@/features/customers/server/getCustomerOrders';

type Props = {
  params: { id: string };
};

const CustomerDetails = async ({ params }: Props) => {
  const id = await params?.id;
  const customer = await getCustomerById(id);
  const orders = await getCustomerOrders(id);

  return <CustomerDetailsPage customer={customer} orders={orders} />;
};

export default CustomerDetails;