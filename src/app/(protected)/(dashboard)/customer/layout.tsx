import Container from '@/components/layout/Container';
import CustomerAccountMobileSideBar from '@/features/customers/components/CustomerAccountMobileSidebar';
import CustomerAccountSideBar from '@/features/customers/components/CustomerAccountSideBar';
import CustomerProfileBreadCrumb from '@/features/customers/components/CustomerProfileBreadCrumb';

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="h-fit">
      <CustomerProfileBreadCrumb />
      <Container className="flex w-full flex-col md:flex-row md:gap-14">
        <div className="hidden md:block">
          <CustomerAccountSideBar />
        </div>
        <div className="flex w-full justify-end md:hidden">
          <CustomerAccountMobileSideBar />
        </div>
        <div className="flex-1 py-10 no-scrollbar md:max-h-[700px] md:overflow-auto">
          {children}
        </div>
      </Container>
    </div>
  );
};

export default layout;
