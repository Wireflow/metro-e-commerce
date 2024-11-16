'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ViewRow } from '@/types/supabase/table';

type Props = {
  manufacturers: ViewRow<'category_manufacturers'>[];
};

const FooterPopularTags = ({ manufacturers }: Props) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-semibold text-white">Popular Tags</p>
      <div className="flex w-80 flex-wrap gap-3">
        {manufacturers.map(manufacturer => {
          return (
            <div key={manufacturer.category_id} className="flex flex-wrap gap-5">
              <Button
                onClick={() => setActiveTag(manufacturer.manufacturer)}
                className={` ${activeTag === manufacturer.manufacturer ? 'border-white bg-neutral-800 font-semibold text-white' : 'bg-transparent text-white'}`}
                variant={'outlineGray'}
              >
                {manufacturer.manufacturer}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FooterPopularTags;
