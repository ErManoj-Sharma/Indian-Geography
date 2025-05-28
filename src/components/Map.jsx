import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const tokyo = { lng: 139.753, lat: 35.6844 };
  const zoom = 14;
  maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY;

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.BASIC,
      center: [tokyo.lng, tokyo.lat],
      zoom: zoom
    });

    new maptilersdk.Marker({color: "#FF0000"})
      .setLngLat([139.7525,35.6846])
      .addTo(map.current);

  }, [tokyo.lng, tokyo.lat, zoom]);

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh - 77px)' }}>
      <div ref={mapContainer} className="absolute w-full h-full" />
    </div>
  );
}