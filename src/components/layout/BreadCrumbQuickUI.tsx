import Link from 'next/link';

import { HomeIcon } from 'lucide-react';
import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface PageHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
}
const BreadCrumbQuickUI = ({ breadcrumbs }: PageHeaderProps) => {
  return (
    <div>
      {' '}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">
                  <HomeIcon className="h-4 w-4" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.href}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
    </div>
  );
};

export default BreadCrumbQuickUI;
