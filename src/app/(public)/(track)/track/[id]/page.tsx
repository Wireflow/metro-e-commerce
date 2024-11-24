import TrackedOrderDetailsPage from '@/components/pages/TrackedOrderDetailsPage';

type Props = {
  params: Promise<{
    id: number;
  }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  return <TrackedOrderDetailsPage id={id} />;
};

export default page;
