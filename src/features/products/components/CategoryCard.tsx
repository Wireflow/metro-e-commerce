import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import { PLACEHOLDER_IMG_URL } from '@/data/constants';

import { Category } from '../schemas/category';

type Props = {
  category: Category;
};

const CategoryCard = ({ category }: Props) => {
  return (
    <Card className="relative max-w-[150px] shadow-none shadow-primary transition-all hover:scale-105 hover:cursor-pointer hover:shadow-lg md:max-w-none">
      <Link href={`/shop?category=${category.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {category.name}</span>
      </Link>
      <CardContent className="flex flex-col items-center justify-center p-2 sm:p-3 md:p-4">
        <div className="xs:max-w-[140px] relative aspect-square w-full max-w-[120px] overflow-hidden rounded-lg bg-white sm:max-w-[160px] md:max-w-40 lg:max-w-44">
          <Image
            src={category.image_url || PLACEHOLDER_IMG_URL}
            alt={category.name}
            fill
            className="object-contain p-2 mix-blend-multiply sm:p-3 md:p-4"
            style={{
              maskImage: 'linear-gradient(to bottom, black, black)',
              WebkitMaskImage: 'linear-gradient(to bottom, black, black)',
            }}
            sizes="(max-width: 480px) 120px,
                 (max-width: 640px) 140px,
                 (max-width: 768px) 160px,
                 (max-width: 1024px) 160px,
                 176px"
          />
        </div>
        <span className="mt-1 w-full truncate text-center text-sm font-medium capitalize sm:mt-2 sm:text-base">
          {category.name}
        </span>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
