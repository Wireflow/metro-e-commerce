import { useEffect, useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { ViewRow } from '@/types/supabase/table';

type ManufacturersFilterProps = {
  manufacturers: ViewRow<'category_manufacturers'>[];
  onSelect: (manufacturers: string[]) => void;
  value?: string[];
};

const ManufacturersFilter = ({ manufacturers, onSelect, value }: ManufacturersFilterProps) => {
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>(value || []);

  // Sync with external value
  useEffect(() => {
    if (value) {
      setSelectedManufacturers(value);
    }
  }, [value]);

  const handleOnSelect = (selected: boolean, manufacturer: string) => {
    const updatedManufacturers = selected
      ? [...selectedManufacturers, manufacturer]
      : selectedManufacturers.filter(m => m !== manufacturer);

    setSelectedManufacturers(updatedManufacturers);
    onSelect(updatedManufacturers);
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">POPULAR BRANDS</h2>
      <div className="grid grid-cols-2 gap-2">
        {manufacturers.map(m => {
          const manufacturerId = m.manufacturer ?? '';

          return (
            <div key={manufacturerId} className="flex items-center gap-1.5">
              <Checkbox
                id={manufacturerId}
                checked={selectedManufacturers.includes(manufacturerId)}
                onCheckedChange={checked => handleOnSelect(Boolean(checked), manufacturerId)}
              />
              <label
                htmlFor={manufacturerId}
                className="cursor-pointer truncate text-sm text-gray-800 hover:text-gray-600"
              >
                {m.manufacturer}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManufacturersFilter;
