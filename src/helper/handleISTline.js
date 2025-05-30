import { createGeoJSON } from './createGeoJson';
import { removeLayer } from './removeLayer';
import { istGeoJson } from './createGeoJson';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";

/**
 * Handles Tropic of Cancer state labels and line layer.
 * @param {Object} map - Mapbox map instance (ref).
 * @param {Array} istStates - Array of states the IST passes through.
 */
export const handleISTLine = (map, istStates) => {
    const stateLayerId = 'ist-st-names';
    const stateSourceId = 'ist-st-labels';
    const lineLayerId = 'ist-names';
    const lineSourceId = 'ist-labels';

    if (!map.current) return;

    if (Array.isArray(istStates)) {
        removeLayer(map, stateLayerId, stateSourceId);
        removeLayer(map, lineLayerId, lineSourceId);

        const stateLabelsGeoJSON = createGeoJSON(istStates);

        map.current.addSource(stateSourceId, {
            type: 'geojson',
            data: stateLabelsGeoJSON,
        });

        map.current.addLayer({
            id: stateLayerId,
            type: 'symbol',
            source: stateSourceId,
            layout: {
                'text-field': ['get', 'name'],
                'text-size': 14,
                'text-anchor': 'center',
                'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
            },
            paint: {
                'text-color': '#FF4500',
                'text-halo-color': '#fff',
                'text-halo-width': 1,
            },
        });

        map.current.addSource(lineSourceId, {
            type: 'geojson',
            data: istGeoJson,
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
        map.current.on("click", "ist-names", (e) => {
            const coordinates = e.lngLat;
            const { name } = e.features[0].properties;
            // Create HTML content for popup with title and description
            const popupContent = document.createElement('div');
            popupContent.style.backgroundColor = 'white';
            popupContent.style.color = 'black';

            if (name) {
                const nameEl = document.createElement('p');
                nameEl.textContent = name;
                nameEl.style.margin = '0';
                nameEl.style.textAlign = 'center'; // 👈 Center-align the text
                popupContent.appendChild(nameEl);
            }

            new maptilersdk.Popup({ offset: 25 }).setDOMContent(popupContent)
                .setLngLat(coordinates)
                .setHTML(popupContent.outerHTML)
                .addTo(map.current);
        })

    } else {
        removeLayer(map, stateLayerId, stateSourceId);
        removeLayer(map, lineLayerId, lineSourceId);
    }
};
