import OrderDetailsPage from '@/features/orders/pages/OrderDetailsPage';

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params }: Props) => {
  const { id } = params;
  return <OrderDetailsPage id={id} />;
};

export default page;
