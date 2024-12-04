'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ImageFile } from '@/components/form/MultiImageUpload';
import { useNavigationWarning } from '@/hooks/useNavigationWarning';

import { CreateProductFormData, CreateProductSchema } from '../../../schemas/create-product';
import { createProduct } from '../../../server/products/createProduct';
import ProductForm from './ProductForm';

const AddProductForm = () => {
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['create-product'],
    mutationFn: async (data: CreateProductFormData) => {
      const formData = new FormData();

      selectedImages.forEach(img => {
        if (!img?.file) return;
        formData.append(`images`, img?.file, img.file?.name);
      });

      return createProduct(data, formData);
    },
    onSuccess: data => {
      if (data.success) {
        toast.success('Product created!');
        router.push(`/admin/products/${data?.data?.id}/publish`);
      } else {
        toast.error(data.error);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const form = useForm<CreateProductFormData>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      general_info: {
        name: undefined,
        description: undefined,
        unit: undefined,
        manufacturer: undefined,
        is_tobacco: false,
        item_number: undefined,
      },
      pricing_info: {
        max_per_order: undefined,
        cost_price: undefined,
        retail_price: undefined,
        wholesale_price: undefined,
      },
      barcodes: [],
      category_id: undefined,
    },
  });

  const onSubmit = (data: CreateProductFormData) => {
    mutate(data);
  };

  const { navigate, NavigationWarningDialog } = useNavigationWarning({
    isDirty: form.formState.isDirty || selectedImages.length > 0,
  });

  const handleCancel = () => {
    navigate('/admin/products/all');
  };

  return (
    <>
      <ProductForm
        form={form}
        onSubmit={onSubmit}
        onCancel={handleCancel}
        isMutating={isPending}
        mode="add"
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
      />
      <NavigationWarningDialog />
    </>
  );
};

export default AddProductForm;
