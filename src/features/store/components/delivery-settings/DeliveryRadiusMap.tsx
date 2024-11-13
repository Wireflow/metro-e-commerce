import dynamic from 'next/dynamic';

import { Circle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

// Create a separate map component to load dynamically
const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] w-full items-center justify-center rounded-md border bg-muted">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  ),
});

type Props = {
  initialAddress?: string;
  radiusMiles: number;
};

const RadiusMapDisplay = ({ initialAddress = '', radiusMiles }: Props) => {
  const [address, setAddress] = useState(initialAddress);
  const [center, setCenter] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const geocodeAddress = async (searchAddress: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchAddress)}`
      );
      const data = await response.json();

      if (data && data[0]) {
        setCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      } else {
        setError('Address not found. Please try again.');
      }
    } catch (err) {
      setError('Failed to locate address. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialAddress) {
      geocodeAddress(initialAddress);
    }
  }, [initialAddress]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      geocodeAddress(address);
    }
  };

  return (
    <div className="space-y-4">
      {error && <div className="text-sm text-red-500">{error}</div>}

      <div className="h-[400px] w-full overflow-hidden rounded-md border">
        {center ? (
          <Map center={center} radiusMiles={radiusMiles} />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted">
            <span className="text-sm text-muted-foreground">
              Enter an address to see the delivery radius
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Circle className="h-4 w-4" />
        <span>
          Showing {radiusMiles} {radiusMiles === 1 ? 'mile' : 'miles'} radius
        </span>
      </div>
    </div>
  );
};

export default RadiusMapDisplay;
