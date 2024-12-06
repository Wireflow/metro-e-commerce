import OrderPlacedPage from '@/features/checkout/pages/OrderPlacedPage';

type Props = {
  searchParams: Promise<{ orderId: string; orderNumber: string }>;
};

const OrderPlaced = async ({ searchParams }: Props) => {
  const { orderId, orderNumber } = await searchParams;

  return <OrderPlacedPage orderNumber={orderNumber} orderId={orderId} />;
};

export default OrderPlaced;
