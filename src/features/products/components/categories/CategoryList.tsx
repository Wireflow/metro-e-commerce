'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

// eslint-disable-next-line import/no-named-as-default
import DynamicTable, { useTableFields } from '@/components/ui/dynamic-table';
import { PLACEHOLDER_IMG_URL } from '@/data/constants';
import { formatDateToString } from '@/utils/dateUtils';

import { Category } from '../../schemas/category';
import CategoryActions from './actions/CategoryActions';

type Props = {
  categories: Category[];
};

const CategoryList = ({ categories }: Props) => {
  const router = useRouter();
  const fields = useTableFields<Category>([
    {
      key: c => (
        <div className="relative h-12 w-12 overflow-hidden rounded-md border">
          <Image
            src={c?.image_url ?? PLACEHOLDER_IMG_URL}
            alt={c.name}
            fill
            sizes="48px"
            className="object-cover"
            style={{ objectFit: 'cover' }}
            placeholder="blur"
            blurDataURL={PLACEHOLDER_IMG_URL}
          />
        </div>
      ),
      label: 'Image',
      className: 'w-[68px]',
    },
    {
      label: 'Category',
      key: c => (
        <div>
          <p className="max-w-[300px] truncate font-semibold">{c.name}</p>
          <p className="max-w-[300px] truncate text-xs text-gray-500 md:text-sm">{c.description}</p>
        </div>
      ),
      className: 'min-w-[300px] md:min-w-none',
    },
    {
      label: 'Sales',
      key: c => c.sales,
    },
    {
      label: 'Products',
      key: c => c.product_count,
    },
    {
      label: 'Added',
      key: c =>
        formatDateToString(new Date(c.created_at), {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: undefined,
          minute: undefined,
        }),
    },
    {
      label: 'Actions',
      key: c => (
        <CategoryActions
          categoryId={c.id}
          published={c.published}
          onEdit={() => router.push(`/admin/categories/${c.id}`)}
        />
      ),
      className: 'text-center md:max-w-[50px]',
    },
  ]);

  return <DynamicTable fields={fields} data={categories} />;
};

export default CategoryList;
