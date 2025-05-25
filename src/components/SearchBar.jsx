import React, { useCallback } from 'react';
import '../css/style.css';
function SearchBar({ searchTerm, setSearchTerm }) {
  const handleChange = useCallback((e) => {
    setSearchTerm(e.target.value.trim());
  }, [setSearchTerm]);

  return (
    <input
      className="input-search"
      type="text"
      placeholder="Buscar por descripción o ID..."
      value={searchTerm}
      onChange={handleChange}
    />
  );
}

export default SearchBar;
