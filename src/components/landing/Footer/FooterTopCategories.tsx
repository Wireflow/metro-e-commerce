'use client';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

import { ViewRow } from '@/types/supabase/table';

type props = {
  categories: ViewRow<'categories_sales_and_products_count'>[];
};

const FooterTopCategories = ({ categories }: props) => {
  const [activeCategory, setActiveCategory] = useState<string | null>();
  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-semibold text-white">Top Categories</p>
      {categories.map(category => {
        return (
          <div key={category.id} className="flex items-center gap-2">
            {activeCategory === category.id && (
              <div className="h-0.5 w-7 rounded-full bg-yellow-400 transition-all duration-200 ease-in-out" />
            )}
            <Link
              className={`${activeCategory === category.id ? 'font-semibold text-gray-100' : 'text-gray-300'}`}
              onClick={() => setActiveCategory(category.id)}
              href={`/categories/${category.id}`}
            >
              {category.name}
            </Link>
          </div>
        );
      })}
      <Link href={'/products'} className="flex items-center gap-2 text-yellow-300">
        Browse All Products <ArrowRight className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default FooterTopCategories;
