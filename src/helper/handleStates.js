import { createGeoJSON } from './createGeoJson';
import { removeLayer } from './removeLayer';

/**
 * Adds or removes state name labels on the map.
 * @param {Object} map - Mapbox map instance (ref).
 * @param {Array} inStates - Array of state name coordinates and names.
 */
export const handleStates = (map, inStates) => {
  const layerId = 'state-names';
  const sourceId = 'states-labels';

  if (!map.current) return;

  if (Array.isArray(inStates)) {
    removeLayer(map, layerId, sourceId);

    const geoJson = createGeoJSON(inStates);

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
        'text-color': 'blue',
        'text-halo-color': '#fff',
        'text-halo-width': 1,
      },
    });
  } else {
    removeLayer(map, layerId, sourceId);
  }
};
