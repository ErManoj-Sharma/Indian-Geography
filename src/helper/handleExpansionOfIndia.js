import { removeLayer } from './removeLayer';
import { ExpansionLinesGeoJson } from './createGeoJson';
/**
 * Handles Tropic of Cancer state labels and line layer.
 * @param {Object} map - Mapbox map instance (ref).
 * @param {Array} expansions - Array of states the tropic passes through.
 */
export const handleExpansionOfIndia = (map, expansions) => {
  const lineLayerId = 'expansion-names';
  const lineSourceId = 'expansion-labels';

  if (!map.current) return;

  if (Array.isArray(expansions)) {
    removeLayer(map, lineLayerId, lineSourceId);

    map.current.addSource(lineSourceId, {
      type: 'geojson',
      data: ExpansionLinesGeoJson,
    });

    map.current.addLayer({
      id: lineLayerId,
      type: 'line',
      source: lineSourceId,
      paint: {
        'line-color': '#FF4500',
        'line-dasharray': [2, 2],
        'line-width': 2,
      },
    });
  } else {
    removeLayer(map, lineLayerId, lineSourceId);
  }
};
