import { createGeoJSON } from './createGeoJson';
import { removeLayer } from './removeLayer';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { durund_line } from '@/geojson/durund_line';
import { LAC } from '@/geojson/LAC';
import { Loc } from '@/geojson/Loc';
import { Mac_Mohan_line } from '@/geojson/Mac_Mohan_line';
import { redcliffLine } from '@/geojson/redcliff_line';
/**
 * Handles Tropic of Cancer state labels and line layer.
 * @param {Object} map - Mapbox map instance (ref).
 * @param {Array} in_border - Array of states the IST passes through.
 */
export const handleIndianBoarders = (map, in_border) => {
    const stateLayerId = 'border-pt-names';
    const stateSourceId = 'border-pt-labels';
    const lineLayerId = 'border-names';
    const lineSourceId = 'border-labels';

    if (!map.current) return;

    if (Array.isArray(in_border)) {
        removeLayer(map, stateLayerId, stateSourceId);
        removeLayer(map, lineLayerId, lineSourceId);

        const stateLabelsGeoJSON = createGeoJSON(in_border);

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
        const combinedGeoJSON = {
            type: 'FeatureCollection',
            features: [
                ...durund_line.features,
                ...LAC.features,
                ...Loc.features,
                ...Mac_Mohan_line.features,
                ...redcliffLine.features,
            ]
        };
        map.current.addSource(lineSourceId, {
            type: 'geojson',
            data: combinedGeoJSON,
        });

        map.current.addLayer({
            id: lineLayerId,
            type: 'line',
            source: lineSourceId,
            paint: {
                'line-color': ['get', 'color'],  
                'line-width': 2,
            },
        });
        map.current.on("click", "border-names", (e) => {
            const coordinates = e.lngLat;
            const { name } = e.features[0].properties;
            // Create HTML content for popup with title and description
            const popupContent = document.createElement('div');
            popupContent.style.backgroundColor = 'white';
            popupContent.style.color = 'black';

            if (name) {
                const nameEl = document.createElement('p');
                 nameEl.innerHTML = name.replace(/\n/g, '<br>'); 
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
