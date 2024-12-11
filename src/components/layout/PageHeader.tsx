import { HomeIcon } from '@radix-ui/react-icons';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  onBack?: () => void;
  className?: string;
  actions?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

const PageHeader = ({
  title,
  description,
  children,
  onBack,
  className,
  actions,
  breadcrumbs,
}: PageHeaderProps) => {
  return (
    <div className={cn('space-y-4 pb-4', className)}>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          {/* Breadcrumbs */}
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

          {/* Back button and title container */}
          <div className="flex items-center gap-2">
            {onBack && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 md:h-9 md:w-9"
                onClick={onBack}
              >
                <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">Go back</span>
              </Button>
            )}
            <div className="flex-1 space-y-1">
              {title && <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>}
              {description && (
                <p className="line-clamp-2 text-sm text-muted-foreground md:text-base">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Actions container */}
        {actions && (
          <div className="flex flex-col-reverse items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
            {actions}
          </div>
        )}
      </div>

      {/* Optional additional content */}
      {children && <div className="pt-2">{children}</div>}
    </div>
  );
};

export default PageHeader;
