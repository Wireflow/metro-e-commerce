'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ImageFile } from '@/components/form/MultiImageUpload';

import { useDeleteBarcode } from '../../../hooks/barcode-mutuations-hooks';
import { useDeleteProductImage } from '../../../hooks/product-mutations-hooks';
import {
  CreateProductFormData,
  UpdateProductFormData,
  UpdateProductSchema,
} from '../../../schemas/create-product';
import { Product } from '../../../schemas/products';
import { updateProduct } from '../../../server/products/updateProduct';
import ProductForm from './ProductForm';

type Props = {
  product: Product;
};

const UpdateProductForm = ({ product }: Props) => {
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);
  const [newImages, setNewImages] = useState<ImageFile[]>([]);

  useEffect(() => {
    setSelectedImages(
      product.images?.map(img => ({
        file: new File([], img.url),
        preview: img.url,
        id: img.id,
      })) || []
    );
  }, [product]);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['create-product'],
    mutationFn: async (data: CreateProductFormData) => {
      const formData = new FormData();

      if (newImages.length > 0) {
        newImages.forEach(img => {
          if (!img?.file) return;
          formData.append(`images`, img?.file, img.file?.name);
        });
      }

      return updateProduct(data, formData);
    },
    onSuccess: data => {
      if (data.success) {
        toast.success('Product saved!');
        handleReset();
      } else {
        toast.error(data.error);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const form = useForm<UpdateProductFormData>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: {
      id: product.id,
      general_info: {
        name: product.name,
        description: product.description ?? undefined,
        unit: product.unit ?? undefined,
        manufacturer: product.manufacturer ?? undefined,
        is_tobacco: product.is_tobacco,
        is_featured: product.is_featured,
        in_stock: product.in_stock,
        published: product.published,
      },
      pricing_info: {
        cost_price: product.cost_price,
        retail_price: product.retail_price,
        wholesale_price: product.wholesale_price,
        discount: product.discount ?? 0,
        discounted_until: product.discounted_until ?? undefined,
        is_taxed: product.is_taxed ?? false,
      },
      barcodes: product.barcodes.map(b => ({
        barcode: b.barcode,
        barcode_id: b.id,
        disabled: true,
      })),
      category_id: product.category_id,
    },
  });

  useEffect(() => {
    form.setValue(
      'barcodes',
      product.barcodes.map(b => ({ barcode: b.barcode, barcode_id: b.id, disabled: true }))
    );
  }, [product.barcodes, form]);

  const onSubmit = (data: CreateProductFormData) => {
    mutate(data);
  };

  useEffect(() => {
    form.reset({
      id: product.id,
      general_info: {
        name: product.name,
        description: product.description ?? undefined,
        unit: product.unit ?? undefined,
        manufacturer: product.manufacturer ?? undefined,
        is_tobacco: product.is_tobacco,
        is_featured: product.is_featured,
        in_stock: product.in_stock,
        published: product.published,
      },
      pricing_info: {
        cost_price: product.cost_price,
        retail_price: product.retail_price,
        wholesale_price: product.wholesale_price,
        discount: product.discount ?? undefined,
        discounted_until: product.discounted_until ?? undefined,
        is_taxed: product.is_taxed ?? false,
      },
      barcodes: product.barcodes.map(b => ({
        barcode: b.barcode,
        barcode_id: b.id,
        disabled: true,
      })),
      category_id: product.category_id,
    });
  }, [product, form]);

  const handleReset = () => {
    setSelectedImages(
      product.images?.map(img => ({
        file: new File([], img.url),
        preview: img.url,
        id: img.id,
      })) || []
    );
    form.reset({
      id: product.id,
      general_info: {
        name: product.name,
        description: product.description ?? undefined,
        unit: product.unit ?? undefined,
        manufacturer: product.manufacturer ?? undefined,
        is_tobacco: product.is_tobacco,
        is_featured: product.is_featured,
        in_stock: product.in_stock,
        published: product.published,
      },
      pricing_info: {
        cost_price: product.cost_price,
        retail_price: product.retail_price,
        wholesale_price: product.wholesale_price,
        discount: product.discount ?? undefined,
        discounted_until: product.discounted_until ?? undefined,
        is_taxed: product.is_taxed ?? false,
      },
      barcodes: product.barcodes.map(b => ({
        barcode: b.barcode,
        barcode_id: b.id,
        disabled: true,
      })),
      category_id: product.category_id,
    });
    setNewImages([]);
  };

  const { mutate: deleteImage } = useDeleteProductImage(product.id);

  const handleImageSelect = (files: ImageFile[]) => {
    const newImageFiles = files.filter(
      file => !selectedImages.some(img => img.preview === file.preview)
    );
    setSelectedImages(files);
    setNewImages(prevNewImages => [...prevNewImages, ...newImageFiles]);
  };

  const handleImageRemove = (id?: string) => {
    setSelectedImages(prevImages => prevImages.filter(img => img.id !== id));

    setNewImages(prevNewImages => prevNewImages.filter(img => img.id !== id));

    const isNew = newImages.some(img => img.id === id);

    if (id && !isNew) {
      deleteImage(id);
    }
  };

  const { mutate: deleteBarcode } = useDeleteBarcode();

  const handleRemoveBarcode = (barcodeId: string) => {
    if (barcodeId) {
      deleteBarcode(barcodeId);
    }
  };

  return (
    <ProductForm
      form={form}
      onSubmit={onSubmit}
      onCancel={handleReset}
      isMutating={isPending}
      mode="update"
      selectedImages={selectedImages}
      setSelectedImages={handleImageSelect}
      handleRemoveImage={handleImageRemove}
      handleRemoveBarcode={handleRemoveBarcode}
      isDirty={form.formState.isDirty || newImages.length > 0}
    />
  );
};

export default UpdateProductForm;
