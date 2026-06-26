// src/components/SearchForm.jsx
import { useState } from 'react';
import DropdownList from 'react-widgets/DropdownList';

function SearchForm() {
  // Every search input lives in this one object in state.
  const [criteria, setCriteria] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBeds: '',
    maxBeds: '',
    dateAfter: null,
    dateBefore: null,
    postcode: '',
  });

  // Change one field without disturbing the others.
  const update = (field, value) =>
    setCriteria((prev) => ({ ...prev, [field]: value }));

  return (
    <form className="search-form">
      <label className="field">
        <span>Property type</span>
        <DropdownList
          data={['any', 'House', 'Flat']}
          value={criteria.type}
          onChange={(value) => update('type', value)}
        />
      </label>
    </form>
  );
}

export default SearchForm;