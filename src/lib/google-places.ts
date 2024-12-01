import { ParsedAddress } from '@/components/AddressAutocomplete';

export type PlacePrediction = {
  id: string;
  description: string;
  placeId: string;
  mainText: string;
  secondaryText: string;
  // Parsed components
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
};

export const getPlacePredictions = async (
  service: google.maps.places.AutocompleteService,
  input: string
): Promise<PlacePrediction[]> => {
  if (!input.trim()) return [];

  try {
    const response = await new Promise<google.maps.places.AutocompletePrediction[]>(
      (resolve, reject) => {
        service.getPlacePredictions(
          {
            input,
            componentRestrictions: { country: 'us' },
            types: ['address'],
          },
          (predictions, status) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
              reject(status);
              return;
            }
            resolve(predictions || []);
          }
        );
      }
    );

    return response.map(prediction => {
      const streetAddress = prediction.structured_formatting.main_text;
      const secondaryText = prediction.structured_formatting.secondary_text;

      // First, try to find the ZIP code anywhere in the secondary text
      const zipCodeMatch = secondaryText.match(/\b\d{5}\b/);
      const zipCode = zipCodeMatch ? zipCodeMatch[0] : undefined;

      // Remove the ZIP code from the secondary text for further parsing
      const textWithoutZip = secondaryText.replace(/\b\d{5}\b/, '');

      // Split the remaining text and clean up parts
      const parts = textWithoutZip
        .split(',')
        .map(part => part.trim())
        .filter(Boolean); // Remove empty strings

      // Initialize components
      let city: string | undefined;
      let state: string | undefined;
      let country = 'USA';

      // Process parts
      parts.forEach(part => {
        const trimmedPart = part.trim();

        // Match state abbreviation (2 uppercase letters)
        if (/^[A-Z]{2}$/.test(trimmedPart)) {
          state = trimmedPart;
        }
        // Match USA/United States
        else if (/^USA|United States$/i.test(trimmedPart)) {
          country = 'USA';
        }
        // Assume first non-state, non-country part is the city
        else if (!city) {
          city = trimmedPart;
        }
      });

      console.log('Parsed address:', {
        streetAddress,
        city,
        state,
        zipCode,
        secondaryText,
        parts,
      });

      return {
        id: prediction.place_id,
        description: prediction.description,
        placeId: prediction.place_id,
        mainText: prediction.structured_formatting.main_text,
        secondaryText: prediction.structured_formatting.secondary_text,
        streetAddress,
        city,
        state,
        zipCode,
        country,
      };
    });
  } catch (error) {
    console.error('Error fetching place predictions:', error);
    throw new Error('Failed to fetch address suggestions');
  }
};

export const getPlaceDetails = async (placeId: string): Promise<google.maps.places.PlaceResult> => {
  const mapDiv = document.createElement('div');
  const map = new google.maps.Map(mapDiv);
  const service = new google.maps.places.PlacesService(map);

  return new Promise((resolve, reject) => {
    service.getDetails(
      {
        placeId,
        fields: ['address_components', 'formatted_address', 'geometry'],
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          resolve(place);
        } else {
          reject(status);
        }
      }
    );
  });
};

export const parseAddressComponents = (
  components: google.maps.GeocoderAddressComponent[]
): Omit<ParsedAddress, 'placeId' | 'formattedAddress' | 'coordinates'> => {
  const result = {
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  };

  if (!components) return result;

  // First pass: Get street address and definite matches
  components.forEach(component => {
    if (component.types.includes('street_number')) {
      result.streetAddress = `${component.long_name} `;
    }
    if (component.types.includes('route')) {
      result.streetAddress += component.long_name;
    }
    if (component.types.includes('administrative_area_level_1')) {
      result.state = component.short_name;
    }
    if (component.types.includes('postal_code')) {
      result.zipCode = component.long_name;
    }
    if (component.types.includes('country')) {
      result.country = component.long_name;
    }
  });

  // Second pass: Try to find city using multiple potential types in priority order
  const cityComponent = components.find(
    component =>
      // Primary city indicators
      component.types.includes('sublocality') ||
      component.types.includes('sublocality_level_1') ||
      component.types.includes('locality') ||
      // Neighborhood or district level
      // Smaller cities or townships
      component.types.includes('postal_town') ||
      // Larger metropolitan areas
      component.types.includes('administrative_area_level_2') ||
      // Neighborhoods or districts
      component.types.includes('neighborhood') ||
      // Additional fallbacks
      component.types.includes('political') ||
      component.types.includes('colloquial_area')
  );

  // If we found a city component, use it
  if (cityComponent) {
    result.city = cityComponent.long_name;
  }

  // If still no city, make one final attempt with any remaining administrative areas
  if (!result.city) {
    const fallbackComponent = components.find(component =>
      component.types.some(type => type.startsWith('administrative_area_level_'))
    );
    if (fallbackComponent) {
      result.city = fallbackComponent.long_name;
    }
  }

  return result;
};
