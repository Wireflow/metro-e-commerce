import { useQuery } from '@tanstack/react-query';

import { useCurrentCustomer } from '@/features/auth/hooks/useCurrentCustomer';
import { useBranchSettings } from '@/features/store/hooks/queries/useBranchSettings';
import { useCurrentBranch } from '@/hooks/queries/useCurrentBranch';

export const useDeliveryPossible = () => {
  const { data: customer } = useCurrentCustomer();
  const { branch } = useCurrentBranch();
  const { data: settings } = useBranchSettings();

  const allowedRadius = settings?.delivery_miles_radius;
  const customerAddress = customer?.street;
  const storeAddress = branch?.address;

  const {
    data: isPossible,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['delivery-possible', customerAddress, allowedRadius, storeAddress],
    queryFn: async () => {
      // Return early if we don't have required data
      if (!customerAddress || !allowedRadius || !storeAddress) {
        return false;
      }

      try {
        // Create Distance Matrix Service
        const service = new google.maps.DistanceMatrixService();

        // Get distance between addresses
        const response = await service.getDistanceMatrix({
          origins: [storeAddress],
          destinations: [customerAddress],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL,
        });

        // Check if we got a valid response
        if (!response.rows[0]?.elements[0]?.distance?.value) {
          console.error('Invalid response from Distance Matrix API:', response);
          return false;
        }

        // Convert meters to miles (API returns meters)
        const distanceInMiles = response.rows[0].elements[0].distance.value / 1609.34;

        // Check if distance is within allowed radius
        const isWithinRadius = distanceInMiles <= allowedRadius;
        return isWithinRadius;
      } catch (error) {
        console.error('Error calculating distance:', error);
        return false;
      }
    },
    // Only run query if we have all required data
    enabled: Boolean(customerAddress && allowedRadius && storeAddress),
  });

  return {
    isPossible: isPossible ?? false,
    isLoading,
    error,
  };
};
