'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import DebouncedSearchInput from '@/components/form/SearchInput';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { usePublishedProducts } from '@/features/products/hooks/product-query-hooks';
import useWindowState from '@/hooks/useWindowState';

import ProductSearchResults from './ProductSearchResults';

const ProductSearchbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen, containerRef, handleOpen, handleClear, setIsOpen } = useWindowState();

  const { data: publishedProducts } = usePublishedProducts({
    enabled: !!searchQuery,
    filters: {
      search: searchQuery,
    },
  });

  const handleSearchClear = () => {
    setSearchQuery('');
    handleClear();
  };

  return (
    <div className="relative z-[50] w-full">
      <div className="flex items-center gap-2">
        <div ref={containerRef} className="flex-1" onFocus={handleOpen}>
          <DebouncedSearchInput
            placeholder="Search for anything..."
            inputClassName="bg-white py-5 pl-4"
            onChange={setSearchQuery}
            value={searchQuery}
          />
          <AnimatePresence>
            {isOpen ? (
              <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                className="z-50"
              >
                <Card
                  className="absolute top-12 z-50 max-h-[400px] w-full overflow-auto custom-scrollbar"
                  tabIndex={0}
                >
                  <div className="flex justify-between gap-2">
                    <p className="p-2 text-xs text-gray-400">Searching for {searchQuery}</p>
                    {searchQuery.length > 0 && (
                      <Button size="sm" onClick={handleSearchClear} variant={'ghost'}>
                        Clear
                      </Button>
                    )}
                  </div>
                  <ProductSearchResults products={publishedProducts ?? []} setOpen={setIsOpen} />
                </Card>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        <Link
          href="/scanner"
          className="flex flex-col items-center rounded-[4px] px-4 text-white transition-all duration-300 hover:bg-white hover:text-black md:px-2"
        >
          <Camera className="h-6 w-6 md:h-7 md:w-7" />
          <span className="text-xs">Scan</span>
        </Link>
      </div>
    </div>
  );
};

export default ProductSearchbar;
