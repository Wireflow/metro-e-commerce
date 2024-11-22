import BreadCrumbQuickUI from '../layout/BreadCrumbQuickUI';
import Container from '../layout/Container';
import ProductsGrid from '../shop/ProductsGrid';

type Props = {};

const ShopPage = (props: Props) => {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
  ];
  return (
    <div>
      <div className="bg-gray-200">
        <Container className="flex items-center">
          <BreadCrumbQuickUI breadcrumbs={breadcrumbs} />
        </Container>
      </div>
      <Container>
        <ProductsGrid />
      </Container>
    </div>
  );
};

export default ShopPage;
