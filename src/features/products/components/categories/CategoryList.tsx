'use client';

import { useRouter } from 'next/navigation';

// eslint-disable-next-line import/no-named-as-default
import DynamicTable, { useTableFields } from '@/components/ui/dynamic-table';
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
      label: 'Category',
      key: c => (
        <div>
          <p className="font-semibold">{c.name}</p>
          <p className="text-xs text-gray-500 md:text-sm">{c.description}</p>
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
    },
  ]);

  return <DynamicTable fields={fields} data={categories} />;
};

export default CategoryList;
