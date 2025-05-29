import { createGeoJSON } from './createGeoJson';
import { removeLayer } from './removeLayer';

/**
 * Adds or removes state capital labels on the map.
 * @param {Object} map - Mapbox map instance (ref).
 * @param {Array} inStCapital - Array of state capital coordinates and names.
 */
export const handleStateCapitals = (map, inStCapital) => {
  const layerId = 'state-capital-names';
  const sourceId = 'states-capital-labels';

  if (!map.current) return;

  if (Array.isArray(inStCapital)) {
    removeLayer(map, layerId, sourceId);

    const geoJson = createGeoJSON(inStCapital);

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
