import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";

// Helper function to create a marker
export  const addMarker = (map,markersRef,{ lng, lat, desc }) => {
    const el = document.createElement('div');
    // el.className = 'custom-marker bg-green-600 rounded-full w-4 h-4 border-2 border-white shadow';

    const popup = new maptilersdk.Popup({ offset: 25 }).setText(desc || '');

    const marker = new maptilersdk.Marker(el)
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(map.current);

    markersRef.current.push(marker);
  };
