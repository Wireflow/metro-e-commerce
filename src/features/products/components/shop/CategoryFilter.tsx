import { useEffect, useState } from 'react';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

import { Category } from '../../schemas/category';

type CategoryFilterProps = {
  categories: Category[];
  onSelect: (category: Category) => void;
  value?: string;
};

const CategoryFilter = ({ categories, onSelect, value }: CategoryFilterProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(value || '');

  const allCategories = [{ id: '', name: 'All Categories' }, ...categories];

  const handleSelect = (category: Category) => {
    setSelectedCategory(category.id);
    onSelect(category);
  };

  useEffect(() => {
    setSelectedCategory(value || '');
  }, [value]);

  const renderCategory = (category: Category, isSubcategory = false) => {
    return (
      <div key={category.id} className={`${isSubcategory ? 'ml-6' : ''}`}>
        <div className="flex items-center space-x-2 py-1">
          <RadioGroupItem
            value={category.id}
            id={category.id}
            onClick={() => handleSelect(category)}
          />
          <div className="flex flex-1 items-center">
            <Label
              htmlFor={category.id}
              className={cn('flex-1 cursor-pointer text-sm text-gray-600', {
                'font-semibold text-primary': selectedCategory === category.id,
              })}
            >
              {category.name}
            </Label>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">CATEGORY</h2>
      <ScrollArea>
        <RadioGroup value={selectedCategory}>
          {allCategories.map(category => renderCategory(category as Category))}
        </RadioGroup>
      </ScrollArea>
    </div>
  );
};

export default CategoryFilter;
