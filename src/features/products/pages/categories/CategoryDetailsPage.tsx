'use client';

import AnalyticCard from '@/components/AnalyticCard';
import AnimatedDiv from '@/components/animation/AnimatedDiv';
import PageHeader from '@/components/layout/PageHeader';

import UpdateCategoryForm from '../../components/categories/forms/UpdateCategoryForm';
import { Category } from '../../schemas/category';

type Props = {
  category: Category;
};

const CategoryDetailsPage = ({ category }: Props) => {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Categories', href: '/admin/categories/all' },
    { label: category.name, href: `/admin/categories/${category.id}` },
  ];

  return (
    <AnimatedDiv>
      <PageHeader
        title={'Category Details'}
        description="View & edit category details"
        breadcrumbs={breadcrumbs}
      />

      <div className="mb-4 grid gap-4 md:flex">
        <AnalyticCard title="Total Sales" value={category.sales} variant="minimal" />
        <AnalyticCard value={category.product_count} title="Total Products" variant="minimal" />
      </div>

      <UpdateCategoryForm category={category} />
    </AnimatedDiv>
  );
};

export default CategoryDetailsPage;
