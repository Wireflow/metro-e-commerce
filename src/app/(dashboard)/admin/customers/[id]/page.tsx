import CustomerDetailsPage from '@/features/customers/pages/CustomerDetailsPage';
import { getCustomerById } from '@/features/customers/server/getCustomerById';

type Props = {
  params: { id: string };
};

const CustomerDetails = async ({ params }: Props) => {
  const id = await params?.id;
  const customer = await getCustomerById(id);

  return <CustomerDetailsPage customer={customer} orders={[]} />;
};

export default CustomerDetails;
