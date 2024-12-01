import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useGooglePlaces } from '@/hooks/useGooglePlaces';
import { parseAddressComponents } from '@/lib/google-places';
import { cn } from '@/lib/utils';

export type ParsedAddress = {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  placeId: string;
  formattedAddress: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
};

type AddressAutocompleteProps = {
  onAddressSelect?: (address: ParsedAddress) => void;
  className?: string;
};

const AddressAutocomplete = ({ onAddressSelect, className }: AddressAutocompleteProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { predictions = [], loading, fetchPredictions, fetchPlaceDetails } = useGooglePlaces();

  const debouncedFetch = useDebouncedCallback((value: string) => {
    if (value.trim()) {
      fetchPredictions(value);
    }
  }, 300);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    debouncedFetch(newValue);
  };

  const handleAddressSelect = async (placeId: string, description: string) => {
    try {
      const details = await fetchPlaceDetails(placeId);

      if (!details.address_components) {
        throw new Error('No address components found');
      }

      const parsedAddress = parseAddressComponents(details.address_components);

      onAddressSelect?.({
        ...parsedAddress,
        placeId,
        formattedAddress: description,
        coordinates: details.geometry?.location
          ? {
              lat: details.geometry.location.lat(),
              lng: details.geometry.location.lng(),
            }
          : undefined,
      });

      setValue(description);
      setOpen(false);
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  return (
    <div className="relative w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn('h-11 w-full justify-between', className)}
          >
            {value || 'Search address...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
          sideOffset={4}
        >
          <Command shouldFilter={false} className="w-full">
            <CommandInput
              value={inputValue}
              onValueChange={handleInputChange}
              placeholder="Type an address..."
            />
            <CommandList>
              {loading && (
                <div className="flex items-center justify-center pt-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              )}
              <CommandEmpty>No address found.</CommandEmpty>
              <CommandGroup>
                {predictions.map(prediction => (
                  <CommandItem
                    key={prediction.placeId}
                    value={prediction.description}
                    onSelect={() => handleAddressSelect(prediction.placeId, prediction.description)}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === prediction.description ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    <div className="flex w-full flex-col gap-0.5">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{prediction.streetAddress}</span>
                        {prediction.zipCode && (
                          <span className="text-sm text-muted-foreground">
                            {prediction.zipCode}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {[prediction.city, prediction.state].filter(Boolean).join(', ')}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AddressAutocomplete;
