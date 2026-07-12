import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PropertyCard from './PropertyCard';
import { FavouritesProvider } from '../context/FavouritesContext';

// A fake property to test with — doesn't touch the real JSON data.
const sampleProperty = {
  id: 'test1',
  type: 'House',
  bedrooms: 3,
  price: 450000,
  location: 'Test Street, London BR1',
  description: 'A lovely test property with a garden.',
  picture: 'images/test.jpg',
};

// PropertyCard uses <Link> (needs a Router) and useFavourites() (needs the
// Provider) — so we wrap it in both, exactly like the real app does.
function renderCard(property) {
  render(
    <BrowserRouter>
      <FavouritesProvider>
        <PropertyCard property={property} />
      </FavouritesProvider>
    </BrowserRouter>
  );
}

describe('PropertyCard', () => {
  test('displays the property price', () => {
    renderCard(sampleProperty);
    expect(screen.getByText('£450,000')).toBeInTheDocument();
  });

  test('displays bedrooms, type, and location', () => {
    renderCard(sampleProperty);
    expect(screen.getByText(/3 bed House/)).toBeInTheDocument();
  });

  test('the favourite button starts unselected', () => {
    renderCard(sampleProperty);
    const button = screen.getByRole('button', { name: /add to favourites/i });
    expect(button).toBeInTheDocument();
  });
});