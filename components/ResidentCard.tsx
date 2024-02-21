// components/ResidentCard.tsx
import React from 'react';
import { Resident } from '../lib/api';

interface ResidentCardProps {
  resident: Resident;
}

const ResidentCard: React.FC<ResidentCardProps> = ({ resident }) => {
  return (
    <div className="p-2">
      <img src={resident.image} alt={resident.name} className="w-16 h-16 rounded-full" />
      <div className="absolute bottom-full left-0 w-40 bg-white border border-gray-200 p-2 rounded-lg shadow-lg">
        <p className="font-semibold">{resident.name}</p>
        <p>Status: {resident.status}</p>
      </div>
    </div>
  );
};

export default ResidentCard;
