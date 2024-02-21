// lib/api.ts
import axios from 'axios';

export interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
  url: string;
}

export interface Resident {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
}

export const fetchLocations = async (name?: string): Promise<Location[]> => {
  const response = await axios.get('https://rickandmortyapi.com/api/location', {
    params: { name },
  });
  return response.data.results;
};

export const fetchResidentsByLocation = async (locations: Location[]): Promise<{ [key: string]: Resident[] }> => {
  const residentsByLocation: { [key: string]: Resident[] } = {};
  await Promise.all(
    locations.map(async location => {
      const response = await axios.get(location.url);
      residentsByLocation[location.id] = response.data.residents.map((resident: any) => ({
        id: resident.id,
        name: resident.name,
        status: resident.status,
        species: resident.species,
        image: resident.image,
      }));
    })
  );
  return residentsByLocation;
};

export const fetchResidentById = async (id: string): Promise<Resident> => {
  const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
  return response.data;
};
