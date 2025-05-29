import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import TopBar from './TopBar';
import { india } from '@/constant/Cordinate';
import { cordinate } from '@/constant/Cordinate';
export default function Map({ open,
  setOpen,
  toggleDrawer, selectedCodes }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY;

  const updateMarkers = (coordinates = []) => {
    if (!map.current) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    console.log("coordinates", coordinates);

    Object.entries(coordinates).forEach(([key, coord]) => {
      const { lng, lat, desc } = coord;

      const el = document.createElement('div');
      el.className =
        'custom-marker bg-blue-600 rounded-full w-4 h-4 border-2 border-white shadow';

      const popup = new maptilersdk.Popup({ offset: 25 }).setText(desc || '');

      const marker = new maptilersdk.Marker(el)
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map.current);

      markersRef.current.push(marker);
    });

  };

  const getCordinateForCodes = (selectedCodes) => {
    const result = {};

    selectedCodes.forEach(code => {
      if (cordinate[code]) {
        result[code] = cordinate[code];
      }
    });

    return result;
  }
  useEffect(() => {
    if (map.current && selectedCodes?.length >= 0) {
      updateMarkers(getCordinateForCodes(selectedCodes));
    }
  }, [selectedCodes]);


  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.BASIC,
      center: [india.lng, india.lat],
      zoom: india.zoom,
      hash: true,
    });


  }, [india.lng, india.lat, india.zoom, selectedCodes]);

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh)' }}>
      <TopBar open={open} setOpen={setOpen} toggleDrawer={toggleDrawer} />
      <div ref={mapContainer} className="absolute w-full h-full" />
    </div>
  );
}