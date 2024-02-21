// components/SearchFilter.tsx
import React, { useState } from 'react';

interface SearchFilterProps {
  onSearch: (query: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      className="p-2 border border-gray-300 rounded-lg mb-4"
      placeholder="Search locations..."
      value={query}
      onChange={handleChange}
    />
  );
};

export default SearchFilter;
