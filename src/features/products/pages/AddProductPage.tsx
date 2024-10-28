'use client';

import AnimatedDiv from '@/components/animation/AnimatedDiv';
import PageHeader from '@/components/layout/PageHeader';

import AddProductForm from '../components/forms/AddProductForm';

const AddProductPage = () => {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Add Product', href: '/admin/products/add' },
  ];

  return (
    <AnimatedDiv>
      <PageHeader
        title="Add Product"
        description="Fill out the form to add a new product"
        breadcrumbs={breadcrumbs}
      />
      <AddProductForm />
    </AnimatedDiv>
  );
};

export default AddProductPage;
