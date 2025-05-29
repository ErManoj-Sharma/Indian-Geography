import { createGeoJSON } from './createGeoJson';
import { removeLayer } from './removeLayer';

/**
 * Adds or removes UT capital name labels on the map.
 * @param {Object} map - Mapbox map instance (ref).
 * @param {Array} inUTCapitals - Array of UT capital coordinates and names.
 */
export const handleUTCapitals = (map, inUTCapitals) => {
  const layerId = 'ut-capital-names';
  const sourceId = 'ut-capital-labels';

  if (!map.current) return;

  if (Array.isArray(inUTCapitals)) {
    removeLayer(map, layerId, sourceId);

    const geoJson = createGeoJSON(inUTCapitals);

    map.current.addSource(sourceId, {
      type: 'geojson',
      data: geoJson,
    });

    map.current.addLayer({
      id: layerId,
      type: 'symbol',
      source: sourceId,
      layout: {
        'text-field': ['get', 'name'],
        'text-size': 14,
        'text-anchor': 'center',
        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
      },
      paint: {
        'text-color': 'brown',
        'text-halo-color': '#fff',
        'text-halo-width': 1,
      },
    });
  } else {
    removeLayer(map, layerId, sourceId);
  }
};
