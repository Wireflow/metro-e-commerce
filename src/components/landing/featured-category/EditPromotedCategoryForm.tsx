import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'sonner';

import DebouncedSearchInput from '@/components/form/SearchInput';
import QuickDialog from '@/components/quick/Dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PLACEHOLDER_IMG_URL } from '@/data/constants';
import CategoryCard from '@/features/products/components/CategoryCard';
import { useCategories } from '@/features/products/hooks/category-query-hooks';
import { useUpdateCategory } from '@/features/products/hooks/mutations/useUpdateCategory';
import { Row } from '@/types/supabase/table';

type Props = {
  trigger: React.ReactNode;
  promotedCategory?: Row<'categories'>;
};

const EditPromotedCategoryForm = ({ trigger, promotedCategory }: Props) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState<Row<'categories'> | null>(null);
  const { mutate: updateCategory, isPending } = useUpdateCategory();

  const { data: searchResults } = useCategories({
    enabled: !!searchQuery,
    filters: {
      search: searchQuery,
    },
  });

  const isDirty = promotedCategory?.id !== selected?.id;

  const handleSubmit = () => {
    if (!isDirty || !promotedCategory) return;

    if (!selected) {
      toast.error('Please select a new category to promote');
      return;
    }

    updateCategory(
      {
        id: selected?.id,
        promoted: true,
      },
      {
        onSuccess: () => {
          setOpen(false);
          setSelected(null);
          setSearchQuery('');
        },
      }
    );
  };

  if (!promotedCategory) return null;

  return (
    <QuickDialog
      open={open}
      onOpenChange={setOpen}
      trigger={trigger}
      title="Edit Promoted Category"
      description="Select a new category to promote in this spot"
      content={
        <div className="flex flex-col gap-6">
          <div className="mt-2 space-y-4">
            <div className="relative">
              <DebouncedSearchInput
                placeholder="Search for a category"
                value={searchQuery}
                onChange={setSearchQuery}
                className="w-full placeholder:text-sm"
              />
            </div>

            {!searchQuery && (
              <div>
                <p className="mb-1 text-sm text-gray-500">
                  {!!selected && isDirty ? (
                    <span className="flex items-center gap-1.5 font-bold text-destructive">
                      <Info className="h-4 w-4" /> Changing Promotion to:
                    </span>
                  ) : (
                    'Currently Promoting:'
                  )}
                </p>
                <CategoryCard
                  category={selected ?? promotedCategory}
                  disableEdit
                  className="max-w-none"
                />
              </div>
            )}

            {searchQuery && (
              <Card className="h-[265px] overflow-y-auto p-2">
                <div className="space-y-2">
                  {searchResults?.map(category => (
                    <motion.div key={category.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div
                        onClick={() => {
                          setSelected(category);
                          setSearchQuery('');
                        }}
                        className="flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-gray-100"
                      >
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded">
                          <Image
                            src={category?.image_url ?? PLACEHOLDER_IMG_URL}
                            alt={category?.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <p className="flex-1 text-sm font-medium">{category.name}</p>
                      </div>
                    </motion.div>
                  ))}
                  {searchResults?.length === 0 && (
                    <p className="py-4 text-center text-sm text-gray-500">
                      No categories found matching your search
                    </p>
                  )}
                </div>
              </Card>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setSelected(null);
                setSearchQuery('');
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!isDirty || isPending}>
              {isPending ? 'Updating...' : 'Update Promotion'}
            </Button>
          </div>
        </div>
      }
    />
  );
};

export default EditPromotedCategoryForm;
