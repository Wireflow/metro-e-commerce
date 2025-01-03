import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSlider } from '@/components/ui/multi-slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils/utils';

export type Range = [number, number];

const RANGES: Range[] = [
  [0, 0], // All prices
  [0, 20], // Under $20
  [25, 100], // $25 - $100
  [100, 300], // $100 - $300
  [300, 500], // $300 - $500
  [500, 1000], // $500 - $1000
  [1000, 0], // $1000 and above
];

const MAX_PRICE = 10000;

type Props = {
  onChange?: (range: Range) => void;
  defaultValue?: Range;
};

const PriceRangeFilter = ({ onChange, defaultValue = [0, 0] }: Props) => {
  const [selectedRange, setSelectedRange] = useState<Range>(defaultValue);
  const [inputValues, setInputValues] = useState<[string, string]>(['', '']);

  const handleSelect = (range: Range) => {
    const sanitizedRange = sanitizeRange(range);
    setSelectedRange(sanitizedRange);
    setInputValues([
      sanitizedRange[0] ? sanitizedRange[0].toString() : '',
      sanitizedRange[1] ? sanitizedRange[1].toString() : '',
    ]);
    onChange?.(sanitizedRange);
  };

  useEffect(() => {
    if (
      defaultValue &&
      (defaultValue[0] !== selectedRange[0] || defaultValue[1] !== selectedRange[1])
    ) {
      handleSelect(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  const handleInputChange = (value: string, index: 0 | 1) => {
    // Allow any input while typing
    const newInputValues = [...inputValues] as [string, string];
    newInputValues[index] = value.replace(/[^0-9]/g, '');
    setInputValues(newInputValues);
  };

  const handleInputBlur = (index: 0 | 1) => {
    // Only validate and update the range when input loses focus
    const newRange: Range = [parseInt(inputValues[0]) || 0, parseInt(inputValues[1]) || 0];
    handleSelect(newRange);
  };

  const renderRange = (range: Range, index: number) => {
    const rangeStr = JSON.stringify(range);
    const selectedRangeStr = JSON.stringify(selectedRange);

    return (
      <div key={index}>
        <div className="flex items-center space-x-2 py-1">
          <RadioGroupItem value={rangeStr} id={rangeStr} onClick={() => handleSelect(range)} />
          <div className="flex flex-1 items-center">
            <Label
              htmlFor={rangeStr}
              className={cn('flex-1 cursor-pointer text-sm text-gray-600', {
                'font-semibold text-primary': rangeStr === selectedRangeStr,
              })}
            >
              {formatRangeTitle(range)}
            </Label>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">PRICE RANGE</h2>
      <div className="mb-5">
        <MultiSlider
          value={selectedRange}
          onValueChange={value => handleSelect(value as Range)}
          max={MAX_PRICE}
        />
      </div>
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Min"
            value={inputValues[0]}
            onChange={e => handleInputChange(e.target.value, 0)}
            onBlur={() => handleInputBlur(0)}
            className="text-right"
          />
          <Input
            type="text"
            placeholder="Max"
            value={inputValues[1]}
            onChange={e => handleInputChange(e.target.value, 1)}
            onBlur={() => handleInputBlur(1)}
            className="text-right"
          />
        </div>
        <div>
          {parseInt(inputValues[0]) > parseInt(inputValues[1]) &&
            parseInt(inputValues[1]) !== 0 && (
              <p className="text-xs text-muted-foreground">
                Maximum price will be adjusted to be greater than minimum price
              </p>
            )}
        </div>
      </div>
      <ScrollArea className="mt-1 max-h-[300px]">
        <RadioGroup value={JSON.stringify(selectedRange)}>
          {RANGES.map((range, index) => renderRange(range, index))}
        </RadioGroup>
      </ScrollArea>
    </div>
  );
};

export default PriceRangeFilter;

const formatRangeTitle = (range: Range) => {
  const [min, max] = range;

  if (!min && !max) {
    return 'All Prices';
  }

  if (!min && max) {
    return `Under ${formatCurrency(max)}`;
  }

  if (min && !max) {
    return `${formatCurrency(min)} and Above`;
  }

  return `${formatCurrency(min)} - ${formatCurrency(max)}`;
};

const sanitizeRange = (range: Range): Range => {
  const [min, max] = range;
  const sanitizedMin = Math.max(0, Math.min(min, MAX_PRICE));
  const sanitizedMax = max === 0 ? 0 : Math.max(sanitizedMin, Math.min(max, MAX_PRICE));
  return [sanitizedMin, sanitizedMax];
};
