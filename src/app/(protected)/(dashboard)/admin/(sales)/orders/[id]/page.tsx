import OrderDetailsPage from '@/features/orders/pages/OrderDetailsPage';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  return <OrderDetailsPage id={id} />;
};

export default page;
