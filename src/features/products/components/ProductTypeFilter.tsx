import { Checkbox } from '@/components/ui/checkbox';

type Props = {
  onChange: (tobacco: boolean | null) => void;
  value: boolean | null;
};

const ProductTypeFilter = ({ onChange, value }: Props) => {
  const handleOnSelect = (checked: boolean, type: 'all' | boolean) => {
    if (checked) {
      onChange(type === 'all' ? null : type);
    }
  };

  const productTypes = [
    { id: 'all', value: 'all', label: 'All Product Types' },
    { id: 'tobacco', value: true, label: 'Tobacco' },
    { id: 'non-tobacco', value: false, label: 'Non-Tobacco' },
  ];

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">PRODUCT TYPES</h2>
      <div className="grid grid-cols-1 gap-2">
        {productTypes.map(type => (
          <div key={type.id} className="flex items-center gap-1.5">
            <Checkbox
              id={type.id}
              checked={type.value === 'all' ? value === null : value === type.value}
              onCheckedChange={checked =>
                handleOnSelect(
                  checked as boolean,
                  type.value === 'all' ? 'all' : (type.value as boolean)
                )
              }
            />
            <label
              htmlFor={type.id}
              className="cursor-pointer truncate text-sm text-gray-800 hover:text-gray-600"
            >
              {type.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTypeFilter;
