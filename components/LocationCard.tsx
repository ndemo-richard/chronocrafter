// components/LocationCard.tsx
import React from 'react';
import { Location } from '../lib/api';

interface LocationCardProps {
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
      <h2 className="text-xl font-semibold mb-2">{location.name}</h2>
      <p>Type: {location.type}</p>
      <p>Dimension: {location.dimension}</p>
    </div>
  );
};

export default LocationCard;
