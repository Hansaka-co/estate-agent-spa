// src/context/FavouritesContext.jsx
import { createContext, useContext, useState } from 'react';

// Pure helper: given the current favourites and a property to add,
// returns the new list — without adding a duplicate. Exported so it
// can be tested directly, without needing to render any component.
export function addToFavourites(currentFavourites, property) {
  const alreadySaved = currentFavourites.some((p) => p.id === property.id);
  if (alreadySaved) return currentFavourites;
  return [...currentFavourites, property];
}

// The "box" that will hold shared favourites state.
const FavouritesContext = createContext(null);

// Wraps the app and provides favourites state to everything inside it.
export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState([]);

  // Add a property, but only if it isn't already saved (duplicate prevention).
  const addFavourite = (property) => {
    setFavourites((prev) => addToFavourites(prev, property));
  };

  // Remove one property by id.
  const removeFavourite = (id) => {
    setFavourites((prev) => prev.filter((p) => p.id !== id));
  };

  // Empty the whole list.
  const clearFavourites = () => setFavourites([]);

  // Quick check used to show "already saved" state on a button.
  const isFavourite = (id) => favourites.some((p) => p.id === id);

  const value = { favourites, addFavourite, removeFavourite, clearFavourites, isFavourite };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}

// A shortcut hook so components just call useFavourites() instead of
// importing useContext + FavouritesContext everywhere.
export function useFavourites() {
  return useContext(FavouritesContext);
}