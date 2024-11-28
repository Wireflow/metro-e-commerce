import CustomerOrderDetailsPage from '@/features/customers/pages/CustomerOrderDetailsPage';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  return <CustomerOrderDetailsPage id={id} />;
};

export default page;
