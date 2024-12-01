'use client';
import Container from '@/components/layout/Container';
import { useManufacturers, useTopCategories } from '@/features/products/hooks/category-query-hooks';

import FooterBrandInfo from './FooterBrandInfo';
import FooterPopularTags from './FooterPopularTags';
import FooterQuickLinks from './FooterQuickLinks';
import FooterTopCategories from './FooterTopCategories';

type Props = {};

const Footer = (props: Props) => {
  const { data: categories } = useTopCategories();
  const { data: manufacturers } = useManufacturers();

  return (
    // eslint-disable-next-line prettier/prettier
    <div className="flex flex-col gap-10 border-t border-gray-600 bg-theme-secondary pt-10">
      <Container className="flex w-full flex-col gap-10 lg:flex-row lg:justify-between">
        <div className="flex flex-col items-start gap-10 sm:flex-row md:gap-14">
          <FooterBrandInfo />
          <div className="flex flex-col gap-10 sm:flex-row">
            <FooterTopCategories categories={categories ?? []} />
            <FooterQuickLinks />
          </div>
        </div>
        <div className="">
          <FooterPopularTags manufacturers={manufacturers ?? []} />
        </div>
      </Container>
      <div className="border-t border-gray-600 py-10">
        <p className="text-center text-sm text-gray-400">
          © 2024 Metro Cash & Carry, Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
