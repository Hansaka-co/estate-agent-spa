// src/utils/searchProperties.js

// Month names → a number (0 = January) so we can build real dates to compare.
const MONTHS = {
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
};

// Turn a property's "added" object into a JavaScript Date we can compare.
function addedToDate(added) {
  return new Date(added.year, MONTHS[added.month], added.day);
}

/**
 * Returns only the properties that match the search criteria.
 * A property is kept ONLY if it passes every gate the user filled in.
 * Blank / "any" criteria are skipped, so unused filters exclude nothing.
 *
 * @param {Array}  properties - the list of all properties
 * @param {Object} criteria   - the user's search inputs
 * @returns {Array} the matching properties
 */
export function searchProperties(properties, criteria) {
  return properties.filter((property) => {
    // Gate 1: type (skip if "any" or empty)
    if (criteria.type && criteria.type !== "any" && property.type !== criteria.type) {
      return false;
    }
    // Gate 2: minimum price
    if (criteria.minPrice !== "" && property.price < Number(criteria.minPrice)) {
      return false;
    }
    // Gate 3: maximum price
    if (criteria.maxPrice !== "" && property.price > Number(criteria.maxPrice)) {
      return false;
    }
    // Gate 4: minimum bedrooms
    if (criteria.minBeds !== "" && property.bedrooms < Number(criteria.minBeds)) {
      return false;
    }
    // Gate 5: maximum bedrooms
    if (criteria.maxBeds !== "" && property.bedrooms > Number(criteria.maxBeds)) {
      return false;
    }
    // Gate 6: added AFTER a chosen date
    if (criteria.dateAfter && addedToDate(property.added) < criteria.dateAfter) {
      return false;
    }
    // Gate 7: added BEFORE a chosen date
    if (criteria.dateBefore && addedToDate(property.added) > criteria.dateBefore) {
      return false;
    }
    // Gate 8: postcode area, e.g. "BR1" (case-insensitive match in the location)
    if (criteria.postcode && !property.location.toUpperCase().includes(criteria.postcode.toUpperCase())) {
      return false;
    }
    // Passed every active gate → keep this property.
    return true;
  });
}