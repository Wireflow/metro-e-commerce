import Image from 'next/image';

import { CheckCheck } from 'lucide-react';

import { ourFeatures } from '@/data/constants';

import ProductOptions from '../landing/different-product-options/ProductOptions';
import SubscribeToNewsLetter from '../landing/subscribe/SubscribeToNewsLetter';
import BreadCrumbQuickUI from '../layout/BreadCrumbQuickUI';
import Container from '../layout/Container';

const AboutUsPage = () => {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
  ];

  return (
    <div>
      <BreadCrumbQuickUI breadcrumbs={breadcrumbs} />

      <Container className="flex flex-col pt-20">
        <h1 className="w-fit border-b border-primary text-3xl font-semibold">About Us</h1>
        <div className="flex flex-col-reverse gap-10 xl:flex-row xl:items-center">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-4">
              <div className="w-fit bg-theme-sky-blue px-5 py-2 text-white">
                <p className="text-sm">WHO WE ARE</p>
              </div>
              <h1 className="text-2xl font-semibold md:text-4xl">METRO CASH & CARRY</h1>
            </div>
            <p className="max-w-screen-sm text-sm text-neutral-600">
              Metro Cash & Carry Michigan is your trusted wholesale retailer, dedicated to providing
              a diverse selection of high-quality products at competitive prices. We serve
              businesses of all sizes, from small shops to large restaurants, offering fresh
              produce, groceries, and non-food items sourced from reliable suppliers. With a
              commitment to exceptional customer service and strong client relationships, we make it
              easy for you to find everything you need to thrive in Michigan&apos;s vibrant
              marketplace. Experience the Metro difference today!
            </p>
            <div className="flex flex-col gap-3">
              {ourFeatures.map((feature, index) => {
                return (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCheck className="h-6 w-6 text-green-400" />
                    <p className="text-[14px] text-neutral-800">{feature.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <Image
            src="/WholesaleImage.jpg"
            alt="Wholesale Image"
            width={500}
            height={500}
            priority
            className="w-full rounded-md"
          />
        </div>
      </Container>

      <div className="py-10 md:py-20">
        <ProductOptions />
      </div>
      <SubscribeToNewsLetter />
    </div>
  );
};

export default AboutUsPage;
