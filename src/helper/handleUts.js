import { createGeoJSON } from './createGeoJson';
import { removeLayer } from './removeLayer';

/**
 * Adds or removes UT name labels on the map.
 * @param {Object} map - Mapbox map instance (ref).
 * @param {Array} inUTs - Array of UT coordinates and names.
 */
export const handleUTs = (map, inUTs) => {
  const layerId = 'ut-names';
  const sourceId = 'ut-labels';

  if (!map.current) return;

  if (Array.isArray(inUTs)) {
    removeLayer(map, layerId, sourceId);

    const geoJson = createGeoJSON(inUTs);

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
        'text-color': 'red',
        'text-halo-color': '#fff',
        'text-halo-width': 1,
      },
    });
  } else {
    removeLayer(map, layerId, sourceId);
  }
};
