import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import useDebounce from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';

import { Input, InputProps } from '../ui/input';
import { Label } from '../ui/label';

type Props = Omit<InputProps, 'value' | 'onChange'> & {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  description?: string;
  inputClassName?: string;
  onFocus?: () => void;
  onBlur?: () => void;
};

const DebouncedSearchInput = ({
  value,
  onChange,
  placeholder,
  description,
  inputClassName,
  label,
  onFocus,
  onBlur,
  ...props
}: Props) => {
  const [query, setQuery] = useState(value);
  const debounced = useDebounce(query, 500);

  // Sync internal state with external value
  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    onChange(debounced);
  }, [debounced, onChange]);

  return (
    <div className={cn('w-full space-y-1', props.className)} onFocus={onFocus} onBlur={onBlur}>
      {label && <Label>{label}</Label>}
      <div className="relative w-full">
        <Search
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 transform text-black"
          size={20}
        />
        <Input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={placeholder ?? 'Search...'}
          className={cn('w-full pr-4', inputClassName)}
          style={{ width: '100%' }}
          {...props}
        />
      </div>
      {description && <p className="text-xs text-gray-600">{description}</p>}
    </div>
  );
};

export default DebouncedSearchInput;
