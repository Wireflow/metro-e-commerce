import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { getPlaceDetails, getPlacePredictions } from '@/lib/google-places';

export const useGooglePlaces = () => {
  const [service, setService] = useState<google.maps.places.AutocompleteService | null>(null);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    setService(new google.maps.places.AutocompleteService());
  }, []);

  const {
    data: predictions = [],
    isLoading: loading,
    error,
    refetch: refetchPredictions,
  } = useQuery({
    queryKey: ['placePredictions', searchInput],
    queryFn: async () => {
      if (!service || !searchInput.trim()) return [];
      return getPlacePredictions(service, searchInput);
    },
    enabled: !!service && !!searchInput.trim(),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    gcTime: 1000 * 60 * 10, // Keep in garbage collection for 10 minutes
    retry: false,
  });

  const fetchPlaceDetails = async (placeId: string) => {
    try {
      // Using fetchQuery instead of useQuery since this is a one-time fetch
      const result = await getPlaceDetails(placeId);
      return result;
    } catch (error) {
      console.error('Failed to fetch place details:', error);
      throw error;
    }
  };

  const fetchPredictions = (input: string) => {
    setSearchInput(input);
  };

  return {
    predictions,
    loading,
    error: error ? (error as Error).message : null,
    fetchPredictions,
    fetchPlaceDetails,
  };
};
