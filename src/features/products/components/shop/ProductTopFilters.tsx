import DebouncedSearchInput from '@/components/form/SearchInput';
import QuickSelect, { SelectOptions } from '@/components/quick/Select';

type ProductTopFiltersProps = {
  setSearchQuery: (query: string) => void;
  searchQuery: string;
  setSortBy: (sortBy: string) => void;
  sortBy: string;
  sortOptions: SelectOptions[];
};

const ProductTopFilters = ({
  setSearchQuery,
  searchQuery,
  setSortBy,
  sortBy,
  sortOptions,
}: ProductTopFiltersProps) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="max-w-[400px] flex-1">
        <DebouncedSearchInput value={searchQuery} onChange={setSearchQuery} />
      </div>
      <div className="w-full max-w-[200px]">
        <QuickSelect
          options={sortOptions}
          onValueChange={option => setSortBy(option ?? '')}
          value={sortBy}
        />
      </div>
    </div>
  );
};

export default ProductTopFilters;
