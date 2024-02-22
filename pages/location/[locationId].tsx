import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';

interface Location {
  name: string;
  type: string;
  dimension: string;
}

interface Resident {
  id: number;
  name: string;
  image: string;
  status: string;
}

const LocationDetailPage = () => {
  const router = useRouter();
  const { locationId } = router.query;
  const [location, setLocation] = useState<Location | null>(null);
  const [residents, setResidents] = useState<Resident[]>([]);

  useEffect(() => {
    if (!locationId) return;
    const fetchLocation = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/location/${locationId}`);
        setLocation(response.data);
        const residentResponses = await Promise.all(
          response.data.residents.map((url: string) => axios.get(url))
        );
        setResidents(residentResponses.map((res: any) => res.data));
      } catch (error) {
        console.error('Failed to fetch location details:', error);
      }
    };

    fetchLocation();
  }, [locationId]);

  return (
    <div className=" container mx-auto p-4 text-white">
      <Head>
        <title>Location Details</title>
      </Head>
      {location && (
        <>
          <h1 className="text-2xl font-bold mb-4">{location.name}</h1>
          <p>Type: {location.type}</p>
          <p>Dimension: {location.dimension}</p>
          <h2 className="text-xl font-semibold mt-4 mb-2">Residents:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {residents.map((resident: Resident) => (
              <Link key={resident.id} href={`/character/${resident.id}`} passHref>
                <div className="p-4 border rounded-lg cursor-pointer hover:bg-lime-950">
                  <img src={resident.image} alt={resident.name} className="mb-2" />
                  <p>{resident.name}</p>
                  <p className="text-sm">{resident.status}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/">
            <div className="mt-4 inline-block bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Back to Home</div>
          </Link>
        </>
      )}
    </div>
  );
};

export default LocationDetailPage;
