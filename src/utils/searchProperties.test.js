import { searchProperties } from './searchProperties';

// A small fake dataset, so tests don't depend on the real JSON file.
const sample = [
  { id: 'a', type: 'House', bedrooms: 3, price: 500000, location: 'Road BR1', added: { month: 'January', day: 1, year: 2022 } },
  { id: 'b', type: 'Flat',  bedrooms: 2, price: 300000, location: 'Road NW1', added: { month: 'June',    day: 1, year: 2023 } },
  { id: 'c', type: 'House', bedrooms: 5, price: 900000, location: 'Road BR1', added: { month: 'March',   day: 1, year: 2024 } },
];

// "No filters" version of the criteria. Tests override one or two fields at a time.
const blank = {
  type: 'any', minPrice: '', maxPrice: '', minBeds: '', maxBeds: '',
  dateAfter: null, dateBefore: null, postcode: '',
};

describe('searchProperties', () => {
  test('returns all properties when no criteria are set', () => {
    expect(searchProperties(sample, blank)).toHaveLength(3);
  });

  test('filters by type', () => {
    const result = searchProperties(sample, { ...blank, type: 'House' });
    expect(result.map((p) => p.id)).toEqual(['a', 'c']);
  });

  test('filters by maximum price', () => {
    const result = searchProperties(sample, { ...blank, maxPrice: 400000 });
    expect(result.map((p) => p.id)).toEqual(['b']);
  });

  test('filters by minimum bedrooms', () => {
    const result = searchProperties(sample, { ...blank, minBeds: 3 });
    expect(result.map((p) => p.id)).toEqual(['a', 'c']);
  });

  test('filters by postcode area', () => {
    const result = searchProperties(sample, { ...blank, postcode: 'BR1' });
    expect(result.map((p) => p.id)).toEqual(['a', 'c']);
  });

  test('combines several criteria at once', () => {
    const result = searchProperties(sample, { ...blank, type: 'House', postcode: 'BR1', minBeds: 4 });
    expect(result.map((p) => p.id)).toEqual(['c']);
  });
});