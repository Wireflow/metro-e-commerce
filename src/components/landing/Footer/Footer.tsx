'use client';

import Image from 'next/image';
import Link from 'next/link';

import Container from '@/components/layout/Container';
import {
  usePopularManufacturers,
  useTopCategories,
} from '@/features/products/hooks/category-query-hooks';

import FooterBrandInfo from './FooterBrandInfo';
import FooterPopularTags from './FooterPopularTags';
import FooterQuickLinks from './FooterQuickLinks';
import FooterTopCategories from './FooterTopCategories';

const Footer = () => {
  const { data: categories } = useTopCategories();
  const { data: manufacturers } = usePopularManufacturers();

  const currentYear = new Date().getFullYear();

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
      <div className="flex flex-col items-center border-t border-gray-600 py-10">
        <p className="text-center text-sm text-gray-400">
          © {currentYear} Metro Cash & Carry, Inc. All rights reserved.
        </p>

        <Link
          href="https://wireflow.us"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-center text-sm text-gray-400 hover:underline"
        >
          Powered By <span className="text-blue-400">Wireflow</span>
          <Image src={'/wireflowLogo.png'} alt="wireflow logo" width={30} height={30} />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
