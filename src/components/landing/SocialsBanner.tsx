'use client';

import { Facebook, Instagram, Twitter } from 'lucide-react';

import { useBranch } from '@/hooks/queries/useMetro';

import Container from '../layout/Container';

const SocialsBanner = () => {
  const { branch } = useBranch();

  const socials = [
    {
      icon: <Facebook className="h-5 w-5" />,
      link: branch?.facebookUrl,
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      link: branch?.twitterUrl,
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      link: branch?.instagramUrl,
    },
  ];

  return (
    <div className="border-b-[0.5px] border-b-white bg-theme-secondary">
      <Container>
        <div className="flex justify-between">
          <div>
            <p className="hidden text-sm text-white md:block">
              Welcome to <span className="font-semibold uppercase">{branch?.name}</span> online
              eCommerce store.
            </p>
            <p className="block text-white md:hidden">{branch?.name}</p>
          </div>
          <div className="flex gap-4">
            {socials.map(({ icon, link }) => (
              <a
                key={link}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-theme-primary"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SocialsBanner;
