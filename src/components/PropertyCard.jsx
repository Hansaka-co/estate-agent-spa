// src/components/PropertyCard.jsx
import { Link } from 'react-router-dom';
import { useFavourites } from '../context/FavouritesContext';
import { BASE_URL } from '../utils/baseUrl';

function shortDescription(text, maxLength = 120) {
  const plain = text.replace(/<br\s*\/?>/gi, ' ');
  if (plain.length <= maxLength) return plain;
  return plain.slice(0, maxLength).replace(/\s+\S*$/, '') + '…';
}

function PropertyCard({ property }) {
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();
  const saved = isFavourite(property.id);

  const toggleFavourite = (event) => {
    event.preventDefault(); // stop the click also triggering the card's link
    if (saved) {
      removeFavourite(property.id);
    } else {
      addFavourite(property);
    }
  };

  return (
    <li
      className="property-card"
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData('application/json', JSON.stringify(property));
      }}
    >
      <img
        className="property-card__image"
        src={`${BASE_URL}${property.picture}`}
        alt={`${property.type} at ${property.location}`}
        draggable={false}
      />

      <button
        className={saved ? 'favourite-btn favourite-btn--active' : 'favourite-btn'}
        onClick={toggleFavourite}
        aria-label={saved ? 'Remove from favourites' : 'Add to favourites'}
      >
        {saved ? '★' : '☆'}
      </button>

      <div className="property-card__body">
        <h3 className="property-card__price">£{property.price.toLocaleString()}</h3>
        <p className="property-card__meta">{property.bedrooms} bed {property.type} · {property.location}</p>
        <p className="property-card__desc">{shortDescription(property.description)}</p>
        <Link className="property-card__link" to={`/properties/${property.id}`}>View property →</Link>
      </div>
    </li>
  );
}

export default PropertyCard;