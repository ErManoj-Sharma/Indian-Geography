import { removeLayer } from './removeLayer';
import { ExpansionLinesGeoJson } from './createGeoJson';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
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

    map.current.on("click", "expansion-names", (e) => {
      const coordinates = e.lngLat;

      const { title, img_name: rawImgName, desc:rawDesc, name } = e.features[0].properties;

      // Validate img_name
      const img_name = (typeof rawImgName === 'string' && rawImgName.trim() !== '') ? rawImgName : null;
      const desc = (typeof rawDesc === 'string' && rawDesc.trim() !== '') ? rawDesc : null;

      const el = document.createElement('div');
      if (img_name && typeof img_name === 'string' && img_name.trim() !== '') {
        el.className = "block border-0 rounded-full cursor-pointer p-0";
        el.style.backgroundImage = `url(/${img_name}.png)`;
        el.style.width = '50px';
        el.style.height = '50px';
      }

      // Create HTML content for popup with title and description
      const popupContent = document.createElement('div');
      popupContent.style.backgroundColor = 'white';
      popupContent.style.color = 'black';


      if (title) {
        const titleEl = document.createElement('h4');
        titleEl.textContent = `${title}`;
        titleEl.style.margin = '2';
        titleEl.style.fontWeight = 'bold';
        titleEl.style.color = 'black';
        titleEl.style.backgroundColor = 'white';
        popupContent.appendChild(titleEl);

      }
      if (desc) {
        const descEl = document.createElement('p');
        descEl.textContent = desc;
        descEl.style.margin = '0';
        descEl.style.textAlign = 'center';
        popupContent.appendChild(descEl);
      }
      if (name) {
        const nameEl = document.createElement('p');
        nameEl.textContent = name;
        nameEl.style.margin = '0';
        popupContent.appendChild(nameEl);
      }
      new maptilersdk.Popup({ offset: 25 }).setDOMContent(popupContent)
        .setLngLat(coordinates)
        .setHTML(popupContent.outerHTML)
        .addTo(map.current);
    });


  } else {
    removeLayer(map, lineLayerId, lineSourceId);
  }
};
