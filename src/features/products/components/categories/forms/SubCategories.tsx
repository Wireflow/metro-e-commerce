import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PLACEHOLDER_IMG_URL } from '@/data/constants';
import { Row } from '@/types/supabase/table';

type Props = {
  subCategories: Pick<Row<'categories'>, 'id' | 'name' | 'image_url'>[];
  parentCategoryName?: string; // Add this prop to show context
};

const SubCategories = ({ subCategories, parentCategoryName }: Props) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="md:text-2xl">
          {parentCategoryName ? (
            <>
              Categories in <span className="text-primary">{parentCategoryName}</span>
            </>
          ) : (
            'Category Listing'
          )}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {subCategories.length} {subCategories.length === 1 ? 'category' : 'categories'} available
        </p>
      </CardHeader>

      <CardContent>
        {subCategories.length === 0 ? (
          <div className="flex min-h-[200px] items-center justify-center text-muted-foreground">
            No categories found
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {subCategories.map(category => (
              <Link href={`/admin/categories/${category.id}`} key={category.id} className="block">
                <Card className="group h-full cursor-pointer transition-all duration-300 hover:scale-105 hover:border-primary">
                  <CardContent className="p-3">
                    <div className="relative aspect-square w-full">
                      <Image
                        src={category.image_url ?? PLACEHOLDER_IMG_URL}
                        alt={category.name}
                        fill
                        className="object-contain p-2 mix-blend-multiply"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        style={{
                          maskImage: 'linear-gradient(to bottom, black, black)',
                          WebkitMaskImage: 'linear-gradient(to bottom, black, black)',
                        }}
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <p className="line-clamp-2 text-sm font-medium">{category.name}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubCategories;
