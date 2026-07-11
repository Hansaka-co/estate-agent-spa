// src/components/FavouritesPanel.jsx
import { useFavourites } from '../context/FavouritesContext';

function FavouritesPanel() {
  const { favourites, removeFavourite, clearFavourites, addFavourite } = useFavourites();

  // Called when the browser allows something to be dropped here.
  // Without this, onDrop never fires — the browser blocks drops by default.
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Called when a dragged property is actually released over this panel.
  const handleDrop = (event) => {
    event.preventDefault();
    const propertyId = event.dataTransfer.getData('text/plain');
    // We only have the id from the drag data, so find the full property
    // from wherever it was dragged from — but simplest: favourites just
    // needs the property object, which we'll pass via JSON in the drag data.
    const propertyJson = event.dataTransfer.getData('application/json');
    if (propertyJson) {
      addFavourite(JSON.parse(propertyJson));
    }
  };

  return (
    <aside
      className="favourites-panel"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="favourites-panel__header">
        <h2>Favourites ({favourites.length})</h2>
        {favourites.length > 0 && (
          <button className="clear-btn" onClick={clearFavourites}>
            Clear all
          </button>
        )}
      </div>

      {favourites.length === 0 ? (
        <p className="favourites-panel__empty">
          Drag a property here, or use the ★ button, to save it.
        </p>
      ) : (
        <ul className="favourites-panel__list">
          {favourites.map((property) => (
            <li
              key={property.id}
              className="favourites-panel__item"
              draggable
              onDragStart={(event) => {
                event.dataTransfer.setData('application/json', JSON.stringify(property));
              }}
            >
              <span>{property.type} — £{property.price.toLocaleString()}</span>
              <button
                className="remove-btn"
                onClick={() => removeFavourite(property.id)}
                aria-label={`Remove ${property.location} from favourites`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default FavouritesPanel;