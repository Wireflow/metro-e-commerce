'use client';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ViewRow } from '@/types/supabase/table';
import { truncate } from '@/utils/utils';

type Props = {
  manufacturers: Partial<ViewRow<'manufacturer_sales_analytics'>>[];
};

const FooterPopularTags = ({ manufacturers }: Props) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const router = useRouter();

  const handleSelectManufacturer = (manufacturer: string) => {
    setActiveTag(manufacturer);
    router.push('/shop?manufacturers=' + manufacturer);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-semibold text-white">Popular Tags</p>
      <div className="flex flex-wrap gap-3 md:w-80">
        {manufacturers.map(manufacturer => {
          return (
            <div key={manufacturer.manufacturer} className="flex flex-wrap gap-5">
              <Button
                onClick={() => handleSelectManufacturer(manufacturer.manufacturer as string)}
                className={`truncate ${activeTag === manufacturer.manufacturer ? 'border-white bg-neutral-800 font-semibold text-white' : 'bg-transparent text-white'}`}
                variant={'outlineGray'}
              >
                {truncate(manufacturer.manufacturer as string, 20)}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FooterPopularTags;
