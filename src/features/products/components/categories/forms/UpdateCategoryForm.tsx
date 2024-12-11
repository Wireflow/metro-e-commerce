'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Category } from '@/features/products/schemas/category';
import {
  CreateCategoryFormData,
  CreateCategorySchema,
} from '@/features/products/schemas/create-category';
import { updateCategory } from '@/features/products/server/categories/updateCategory';

import CategoryForm from './CategoryForm';

type Props = {
  category: Category;
};

const UpdateCategoryForm = ({ category }: Props) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['update-category'],
    mutationFn: async (data: CreateCategoryFormData) => {
      const formData = new FormData();

      if (selectedImage) {
        formData.append(`image`, selectedImage);
      }

      return updateCategory(data, formData);
    },
    onSuccess: data => {
      if (data.success) {
        toast.success('Category changes saved!');
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
      id: category.id,
      name: category.name,
      description: category?.description ?? undefined,
      is_featured: category.is_featured,
      published: category.published,
      parent_category_id: category.parent_category_id ?? undefined,
    },
  });

  useEffect(() => {
    if (category) {
      form.reset({
        id: category.id,
        name: category.name,
        description: category?.description ?? undefined,
        is_featured: category.is_featured,
        published: category.published,
        parent_category_id: category.parent_category_id ? category.parent_category_id : undefined,
      });
    }
  }, [category, form]);

  const onSubmit = (data: CreateCategoryFormData) => {
    if (!category.image_url && !selectedImage) {
      toast.warning('Please upload a category image');
      return;
    }

    mutate(data);
  };

  const handleCancel = () => {
    form.reset();
    setSelectedImage(null);
    router.push('/admin/categories/all');
  };

  return (
    <CategoryForm
      form={form}
      onSubmit={onSubmit}
      onCancel={handleCancel}
      isMutating={isPending}
      mode="update"
      selectedImage={selectedImage}
      setSelectedImage={setSelectedImage}
      subCategories={category?.sub_categories ?? []}
      isDirty={form.formState.isDirty || !!selectedImage}
      previewUrl={category?.image_url ?? undefined}
    />
  );
};

export default UpdateCategoryForm;
