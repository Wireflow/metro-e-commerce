import CustomerOrdersHistoryTable from '@/features/customers/components/CustomerOrdersHistoryTable';

type Props = {};

const page = (props: Props) => {
  return <CustomerOrdersHistoryTable limit={5} TableName="Order History" />;
};

export default page;
