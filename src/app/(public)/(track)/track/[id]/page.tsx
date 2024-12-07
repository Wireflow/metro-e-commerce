import TrackedOrderDetailsPage from '@/components/pages/TrackedOrderDetailsPage';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  return <TrackedOrderDetailsPage id={id} />;
};

export default page;
