'use client';

import Link from 'next/link';

import { useState } from 'react';

import { quickLinks } from '@/data/constants';

type Props = {};

const FooterQuickLinks = (props: Props) => {
  const [activeLink, setActiveLink] = useState<string | null>('');

  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-semibold text-white">Quick Links</p>
      {quickLinks.map(links => {
        return (
          <div key={links.title} className="flex items-center gap-2">
            {activeLink === links.title && (
              <div className="h-0.5 w-7 rounded-full bg-yellow-400 transition-all duration-200 ease-in-out" />
            )}
            <Link
              className={`${activeLink === links.title ? 'font-semibold text-gray-100' : 'text-gray-300'}`}
              onClick={() => setActiveLink(links.title)}
              href={links.href}
            >
              {links.title}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default FooterQuickLinks;
