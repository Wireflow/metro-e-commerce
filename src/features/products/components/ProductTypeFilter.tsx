import { Checkbox } from '@/components/ui/checkbox';

type Props = {
  onChange: (tobacco: boolean | null) => void;
  value: boolean | null;
};

const ProductTypeFilter = ({ onChange, value }: Props) => {
  const handleOnSelect = (checked: boolean, type: boolean | null) => {
    if (checked) {
      onChange(type);
    }
  };

  const productTypes = [
    { id: 'all', value: null, label: 'All Products' },
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
              checked={type.value === null ? value === null : value === type.value}
              onCheckedChange={checked =>
                handleOnSelect(
                  checked as boolean,
                  type.value === null ? null : (type.value as boolean)
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
