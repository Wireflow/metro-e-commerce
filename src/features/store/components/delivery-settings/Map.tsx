import L from 'leaflet';
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
    const defaultIcon = L.icon({
      iconUrl: '/marker-icon.png',
      iconRetinaUrl: '/marker-icon.png',
      iconSize: [41, 41],
      iconAnchor: [5, 41],
      popupAnchor: [1, -34],
    });

    // Initialize the map
    const map = L.map('map').setView(center, 13);

    // Add the tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add marker with custom icon
    L.marker(center, { icon: defaultIcon }).addTo(map);

    // Add radius circle
    const circle = L.circle(center, {
      radius: milesToMeters(radiusMiles),
      color: '#4F46E5',
      fillColor: '#4F46E5',
      fillOpacity: 0.1,
    }).addTo(map);

    // Fit bounds to show the entire circle
    map.fitBounds(circle.getBounds());

    // Cleanup
    return () => {
      map.remove();
    };
  }, [center, radiusMiles]);

  return <div id="map" style={{ height: '100%', width: '100%' }} />;
};

export default Map;
