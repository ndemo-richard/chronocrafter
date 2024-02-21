// pages/index.tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { fetchLocations, Location } from '../lib/api';
import SearchFilter from '../components/SearchFilter';
import Error from '../components/Error';

const IndexPage = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLocationsData = async () => {
      try {
        const locationsData = await fetchLocations(filter);
        if (locationsData.length === 0) {
          setError('Location not found or you typed the wrong location.');
          setLocations([]);
        } else {
          setError('');
          setLocations(locationsData);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
        setError('Location not found.');
      }
    };

    fetchLocationsData();
  }, [filter]);

  const handleSearch = (query: string) => {
    setFilter(query);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Rick & Morty Explorer</title>
      </Head>
      <h1 className="text-3xl font-semibold mb-4">Rick & Morty Explorer</h1>
      <SearchFilter onSearch={handleSearch} />
      {error && <Error message={error} />}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${error ? 'blur' : ''}`}>
        {locations.map(location => (
          <Link href={`/location/${location.id}`} key={location.id}>
            <div className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
              <h2 className="text-xl font-semibold mb-2">{location.name}</h2>
              <p>Type: {location.type}</p>
              {location.dimension && <p>Dimension: {location.dimension}</p>}
            </div>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .blur {
          filter: blur(4px);
        }
      `}</style>
    </div>
  );
};

export default IndexPage;
