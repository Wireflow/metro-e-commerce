import { circle, icon, map, marker, tileLayer } from 'leaflet';
import { useEffect } from 'react';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  center: [number, number];
  radiusMiles: number;
};

const milesToMeters = (miles: number) => miles * 1609.34;

const Map = ({ center, radiusMiles }: MapProps) => {
  useEffect(() => {
    // Set up the default icon configuration
    const defaultIcon = icon({
      iconUrl: '/marker-icon.png',
      iconRetinaUrl: '/marker-icon.png',
      iconSize: [41, 41],
      iconAnchor: [5, 41],
      popupAnchor: [1, -34],
    });

    // Initialize the map
    const radiusMap = map('radiusMap').setView(center, 13);

    // Add the tile layer
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(radiusMap);

    // Add marker with custom icon
    marker(center, { icon: defaultIcon }).addTo(radiusMap);

    // Add radius circle
    const mapCircle = circle(center, {
      radius: milesToMeters(radiusMiles),
      color: '#4F46E5',
      fillColor: '#4F46E5',
      fillOpacity: 0.1,
    }).addTo(radiusMap);

    // Fit bounds to show the entire circle
    radiusMap.fitBounds(mapCircle.getBounds());

    // Cleanup
    return () => {
      radiusMap.remove();
    };
  }, [center, radiusMiles]);

  return <div id="radiusMap" style={{ height: '100%', width: '100%' }} />;
};

export default Map;
