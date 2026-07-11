import { Link } from 'react-router-dom';
import.meta.env.BASE_URL


function shortDescription(text, maxLength = 120) {
  const plain = text.replace(/<br\s*\/?>/gi, ' '); 
  if (plain.length <= maxLength) return plain;
  return plain.slice(0, maxLength).replace(/\s+\S*$/, '') + '…';
}

function PropertyCard({ property }) {
  return (
    <li className="property-card">
      <img
        className="property-card__image"
        src={`${import.meta.env.BASE_URL}${property.picture}`}
        alt={`${property.type} at ${property.location}`}
      />
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