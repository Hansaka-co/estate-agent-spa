// src/components/SearchPage.jsx
import { useState } from 'react';
import 'react-widgets/styles.css';
import SearchForm from './SearchForm';
import PropertyCard from './PropertyCard';
import { searchProperties } from '../utils/searchProperties';
import propertiesData from '../data/properties.json';
import '../App.css';
import FavouritesPanel from './FavouritesPanel';

function SearchPage() {
  const allProperties = propertiesData.properties;

  // Start by showing everything; a search narrows it down.
  const [results, setResults] = useState(allProperties);

  // Called by the form. Runs the filter and stores what it returns.
  const handleSearch = (criteria) => {
    setResults(searchProperties(allProperties, criteria));
  };

  return (
    <div className="app">
      <h1>Find your property</h1>
      <SearchForm onSearch={handleSearch} />
      <h1>Find your property</h1>
        <FavouritesPanel />
        <SearchForm onSearch={handleSearch} />

      <p>{results.length} properties found</p>
      <ul className="results-grid">
        {results.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;