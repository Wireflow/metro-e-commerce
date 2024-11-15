import ProductSearchBar from '../landing/ProductSearchBar';
import PromoBanner from '../landing/PromoBanner';
import SocialsBanner from '../landing/SocialsBanner';

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <div>
      <PromoBanner />
      <SocialsBanner />
      <ProductSearchBar />
    </div>
  );
};

export default LandingPage;
