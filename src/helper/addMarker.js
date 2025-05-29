import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";

export const addMarker = (map, markersRef, { lng, lat, title, desc, state },img_name) => {
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
    titleEl.textContent = `${title}: ${state ? state : ''}`;
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

  const popup = new maptilersdk.Popup({ offset: 25 }).setDOMContent(popupContent);
  const markerArgument = img_name ? {element:el}: el
  const marker = new maptilersdk.Marker(markerArgument)
    .setLngLat([lng, lat])
    .setPopup(popup)
    .addTo(map.current);

  markersRef.current.push(marker);
};
