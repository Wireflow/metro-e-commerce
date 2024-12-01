import OrderPlacedPage from '@/features/checkout/pages/OrderPlacedPage';

type Props = {
  params: Promise<{ orderId: string }>;
};

const OrderPlaced = async ({ params }: Props) => {
  const { orderId } = await params;

  return <OrderPlacedPage orderNumber={orderId} />;
};

export default OrderPlaced;
