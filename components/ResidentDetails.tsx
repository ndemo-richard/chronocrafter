// components/ResidentDetails.tsx
import React from 'react';
import { Resident } from '../lib/api';

interface ResidentDetailsProps {
  resident: Resident;
}

const ResidentDetails: React.FC<ResidentDetailsProps> = ({ resident }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:h-full md:w-48" src={resident.image} alt={resident.name} />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{resident.species}</div>
          <p className="mt-2 text-gray-500">Status: {resident.status}</p>
        </div>
      </div>
    </div>
  );
};

export default ResidentDetails;
