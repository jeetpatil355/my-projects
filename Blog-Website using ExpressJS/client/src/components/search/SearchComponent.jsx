import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent = ({ setSearchResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/search?q=${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter search query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchComponent;
