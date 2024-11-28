import Container from '@/components/layout/Container';
import CustomerAccountSideBar from '@/features/customers/components/CustomerAccountSideBar';
import CustomerProfileBreadCrumb from '@/features/customers/components/CustomerProfileBreadCrumb';

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div>
      <CustomerProfileBreadCrumb />
      <Container className="flex gap-20">
        <CustomerAccountSideBar />
        <div className="flex-1">{children}</div>
      </Container>
    </div>
  );
};

export default layout;
