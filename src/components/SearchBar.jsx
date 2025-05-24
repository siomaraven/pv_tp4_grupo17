import React, { useCallback } from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
  const handleChange = useCallback((e) => {
    setSearchTerm(e.target.value.trim());
  }, [setSearchTerm]);

  return (
    <input
      type="text"
      placeholder="Buscar por descripción o ID..."
      value={searchTerm}
      onChange={handleChange}
      style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
    />
  );
}

export default SearchBar;
