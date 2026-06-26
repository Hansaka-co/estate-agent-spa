// src/components/SearchForm.jsx
import { useState } from 'react';
import DropdownList from 'react-widgets/DropdownList';
import NumberPicker from 'react-widgets/NumberPicker';
import DatePicker from 'react-widgets/DatePicker';
import Combobox from 'react-widgets/Combobox';

// The postcode areas in our data, offered as type-ahead suggestions.
const POSTCODE_AREAS = ['BR1', 'BR2', 'BR3', 'BR5', 'BR6', 'NW1', 'SE9'];

// `onSearch` is passed in by the parent (App). We call it when the user searches.
function SearchForm({ onSearch }) {
  const [criteria, setCriteria] = useState({
    type: 'any', minPrice: '', maxPrice: '', minBeds: '', maxBeds: '',
    dateAfter: null, dateBefore: null, postcode: '',
  });

  const update = (field, value) =>
    setCriteria((prev) => ({ ...prev, [field]: value }));

  // On submit: stop the page reloading, then hand the criteria up to App.
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(criteria);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label className="field">
        <span>Property type</span>
        <DropdownList
          data={['any', 'House', 'Flat']}
          value={criteria.type}
          onChange={(value) => update('type', value)}
        />
      </label>

      <label className="field">
        <span>Min price (£)</span>
        <NumberPicker min={0} step={25000} placeholder="No min"
          value={criteria.minPrice === '' ? null : criteria.minPrice}
          onChange={(value) => update('minPrice', value ?? '')}
        />
      </label>

      <label className="field">
        <span>Max price (£)</span>
        <NumberPicker min={0} step={25000} placeholder="No max"
          value={criteria.maxPrice === '' ? null : criteria.maxPrice}
          onChange={(value) => update('maxPrice', value ?? '')}
        />
      </label>

      <label className="field">
        <span>Min bedrooms</span>
        <NumberPicker min={0} placeholder="Any"
          value={criteria.minBeds === '' ? null : criteria.minBeds}
          onChange={(value) => update('minBeds', value ?? '')}
        />
      </label>

      <label className="field">
        <span>Max bedrooms</span>
        <NumberPicker min={0} placeholder="Any"
          value={criteria.maxBeds === '' ? null : criteria.maxBeds}
          onChange={(value) => update('maxBeds', value ?? '')}
        />
      </label>

      <label className="field">
        <span>Added after</span>
        <DatePicker
          value={criteria.dateAfter}
          onChange={(value) => update('dateAfter', value)}
        />
      </label>

      <label className="field">
        <span>Added before</span>
        <DatePicker
          value={criteria.dateBefore}
          onChange={(value) => update('dateBefore', value)}
        />
      </label>

      <label className="field">
        <span>Postcode area</span>
        <Combobox
          data={POSTCODE_AREAS}
          value={criteria.postcode}
          onChange={(value) => update('postcode', value)}
          placeholder="e.g. BR1"
        />
      </label>

      <button type="submit" className="search-button">Search</button>
    </form>
  );
}

export default SearchForm;