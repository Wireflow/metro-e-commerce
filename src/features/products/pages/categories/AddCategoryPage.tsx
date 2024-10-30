'use client';

import AnimatedDiv from '@/components/animation/AnimatedDiv';
import PageHeader from '@/components/layout/PageHeader';

import AddCategoryForm from '../../components/categories/forms/AddCategoryForm';

const AddCategoryPage = () => {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Add Category', href: '/admin/categories/add' },
  ];

  return (
    <AnimatedDiv>
      <PageHeader
        title="Add Category"
        description="Fill out the form to add a new category"
        breadcrumbs={breadcrumbs}
      />
      <AddCategoryForm />
    </AnimatedDiv>
  );
};

export default AddCategoryPage;
