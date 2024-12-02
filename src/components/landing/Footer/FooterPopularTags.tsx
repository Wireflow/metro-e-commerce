'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ViewRow } from '@/types/supabase/table';
import { truncate } from '@/utils/utils';

type Props = {
  manufacturers: ViewRow<'category_manufacturers'>[];
};

const FooterPopularTags = ({ manufacturers }: Props) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-semibold text-white">Popular Tags</p>
      <div className="flex flex-wrap gap-3 md:w-80">
        {manufacturers.map(manufacturer => {
          return (
            <div key={manufacturer.manufacturer} className="flex flex-wrap gap-5">
              <Button
                onClick={() => setActiveTag(manufacturer.manufacturer)}
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
