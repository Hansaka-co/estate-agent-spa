import { addToFavourites } from './FavouritesContext';

const propertyA = { id: 'a', type: 'House', price: 500000 };
const propertyB = { id: 'b', type: 'Flat', price: 300000 };

describe('addToFavourites', () => {
  test('adds a property to an empty list', () => {
    const result = addToFavourites([], propertyA);
    expect(result).toEqual([propertyA]);
  });

  test('adds a second, different property', () => {
    const result = addToFavourites([propertyA], propertyB);
    expect(result).toEqual([propertyA, propertyB]);
  });

  test('does NOT add a duplicate property', () => {
    const result = addToFavourites([propertyA], propertyA);
    expect(result).toEqual([propertyA]); // still just one copy
  });
});