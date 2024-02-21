// pages/resident/[id].tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchResidentById, Resident } from '../../lib/api';

const ResidentDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [resident, setResident] = useState<Resident | null>(null);
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof id === 'string') {
          const residentData = await fetchResidentById(id);
          setResident(residentData);
          const savedNotes = localStorage.getItem(`resident_notes_${id}`);
          if (savedNotes) {
            setNotes(savedNotes);
          }
        }
      } catch (error) {
        console.error('Error fetching resident details:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleSaveNotes = () => {
    if (typeof id === 'string') {
      localStorage.setItem(`resident_notes_${id}`, notes);
    }
  };

  if (!resident) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold">{resident.name}</h1>
      <p>Status: {resident.status}</p>
      <p>Species: {resident.species}</p>
      <img src={resident.image} alt={resident.name} className="my-4" />
      <textarea
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="Add notes about the character..."
        className="p-2 border border-gray-300 rounded-lg w-full h-32"
      />
      <button onClick={handleSaveNotes} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
        Save Notes
      </button>
    </div>
  );
};

export default ResidentDetailsPage;
