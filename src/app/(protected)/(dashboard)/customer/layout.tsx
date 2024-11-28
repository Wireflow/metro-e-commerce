import Container from '@/components/layout/Container';
import CustomerAccountSideBar from '@/features/customers/components/CustomerAccountSideBar';
import CustomerProfileBreadCrumb from '@/features/customers/components/CustomerProfileBreadCrumb';

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="h-fit">
      <CustomerProfileBreadCrumb />
      <Container className="flex flex-col md:flex-row md:gap-14">
        <CustomerAccountSideBar />
        <div className="flex-1 py-10 no-scrollbar md:max-h-[1200px] md:overflow-auto">
          {children}
        </div>
      </Container>
    </div>
  );
};

export default layout;
