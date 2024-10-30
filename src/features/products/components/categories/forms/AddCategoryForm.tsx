'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  CreateCategoryFormData,
  CreateCategorySchema,
} from '@/features/products/schemas/create-category';
import { createCategory } from '@/features/products/server/categories/createCategory';
import { useNavigationWarning } from '@/hooks/useNavigationWarning';

import CategoryForm from './CategoryForm';

const AddCategoryForm = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['create-category'],
    mutationFn: async (data: CreateCategoryFormData) => {
      const formData = new FormData();

      if (selectedImage) {
        formData.append(`image`, selectedImage);
      }

      return createCategory(data, formData);
    },
    onSuccess: data => {
      if (data.success) {
        toast.success('Category created!');
        router.push('/admin/categories/all');
      } else {
        toast.error(data.error);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const form = useForm<CreateCategoryFormData>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      name: undefined,
      description: undefined,
      is_featured: false,
      published: false,
    },
  });

  const onSubmit = (data: CreateCategoryFormData) => {
    if (!selectedImage) {
      toast.warning('Please upload a category image');
      return;
    }

    mutate(data);
  };

  const { navigate, NavigationWarningDialog } = useNavigationWarning({
    isDirty: form.formState.isDirty || !!selectedImage,
  });

  const handleCancel = () => {
    navigate('/admin/categories/all');
  };

  return (
    <>
      <CategoryForm
        form={form}
        onSubmit={onSubmit}
        onCancel={handleCancel}
        isMutating={isPending}
        mode="add"
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <NavigationWarningDialog />
    </>
  );
};

export default AddCategoryForm;
