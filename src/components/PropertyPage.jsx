
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import propertiesData from '../data/properties.json';


function buildImageList(property) {
  const images = [];
  for (let i = 1; i <= 8; i += 1) {
    images.push(`${import.meta.env.BASE_URL}images/${property.id}-${i}.jpg`);
  }
  return images;
}

function PropertyPage() {
  const { id } = useParams();
  const property = propertiesData.properties.find((p) => p.id === id);

  // All images we'll ATTEMPT to show; ones that fail to load get removed from `validImages`.
  const [validImages, setValidImages] = useState(() => buildImageList(property));
  const [activeIndex, setActiveIndex] = useState(0);

  // If a thumbnail/main image 404s (doesn't exist), quietly drop it from the list.
  const handleImageError = (index) => {
    setValidImages((prev) => prev.filter((_, i) => i !== index));
    if (activeIndex >= index) setActiveIndex(0);
  };

  if (!property) {
    return (
      <div className="property-page">
        <p>Sorry, we couldn't find that property.</p>
        <Link to="/">← Back to search</Link>
      </div>
    );
  }

  return (
    <div className="property-page">
      <Link to="/" className="back-link">← Back to search</Link>
      <h1>{property.type} in {property.location}</h1>
      <p className="property-page__summary">
        £{property.price.toLocaleString()} · {property.bedrooms} bedrooms · {property.tenure}
      </p>

      {/* --- Gallery: large image + thumbnails --- */}
      <div className="gallery">
        <img
          className="gallery__main"
          src={validImages[activeIndex]}
          alt={`${property.type} in ${property.location}, image ${activeIndex + 1}`}
          onError={() => handleImageError(activeIndex)}
        />
        <div className="gallery__thumbs">
          {validImages.map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`Thumbnail ${index + 1}`}
              className={index === activeIndex ? 'gallery__thumb gallery__thumb--active' : 'gallery__thumb'}
              onClick={() => setActiveIndex(index)}
              onError={() => handleImageError(index)}
            />
          ))}
        </div>
      </div>

      {/* --- Tabs: description / floor plan / map --- */}
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <p>{property.description}</p>
        </TabPanel>

        <TabPanel>
          <img
            className="floorplan-image"
            src={`${import.meta.env.BASE_URL}images/${property.id}-floorplan.jpg`}
            alt={`Floor plan for ${property.location}`}
          />
        </TabPanel>

        <TabPanel>
          <iframe
            title="Property location map"
            className="map-frame"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
            loading="lazy"
          />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default PropertyPage;