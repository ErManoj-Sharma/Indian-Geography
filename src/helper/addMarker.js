import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { show, hide } from '@/Slices/InfoSideBarSlice';

// Helper: Create custom marker element with image
const createMarkerElement = (imgName) => {
  const el = document.createElement('div');
  el.className = "block border-0 rounded-full cursor-pointer p-0";
  el.style.backgroundImage = `url(/${imgName}.png)`;
  el.style.width = '50px';
  el.style.height = '50px';
  return el;
};

// Helper: Create popup content DOM
const createPopupContent = ({ title, desc, state }) => {
  const container = document.createElement('div');
  container.style.backgroundColor = 'white';
  container.style.color = 'black';

  if (title) {
    const titleEl = document.createElement('h4');
    titleEl.textContent = `${title}${state ? `: ${state}` : ''}`;
    titleEl.style.margin = '2px';
    titleEl.style.fontWeight = 'bold';
    container.appendChild(titleEl);
  }

  if (desc) {
    const descEl = document.createElement('p');
    descEl.textContent = desc;
    descEl.style.margin = '0';
    descEl.style.textAlign = 'center';
    container.appendChild(descEl);
  }

  return container;
};

// Main function to add marker
export const addMarker = (map, markersRef, dispatch, { lng, lat, title, desc, state }, imgName) => {
  const markerEl = (imgName && typeof imgName === 'string' && imgName.trim())
    ? createMarkerElement(imgName.trim())
    : undefined;

  const popupContent = createPopupContent({ title, desc, state });
  const popup = new maptilersdk.Popup({ offset: 25 }).setDOMContent(popupContent);

  const marker = new maptilersdk.Marker(markerEl ? { element: markerEl } : undefined)
    .setLngLat([lng, lat])
    .setPopup(popup)
    .addTo(map.current)

  // 🔔 Show sidebar when marker is clicked
  marker.getElement().addEventListener('click', (e) => {
    e.stopPropagation(); // prevent map click
    dispatch(show({ lng, lat, title, desc, state }));
  });
  markersRef.current.push(marker);
};
