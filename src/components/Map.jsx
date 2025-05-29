import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import TopBar from './TopBar';
import { india } from '@/constant/Cordinate';
export default function Map({open,
setOpen,
toggleDrawer}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY;

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.BASIC,
      center: [india.lng, india.lat],
      zoom: india.zoom,
      hash: true,
    });

    // new maptilersdk.Marker({color: "#FF0000"})
    //   .setLngLat([139.7525,35.6846])
    //   .addTo(map.current);

  }, [india.lng, india.lat, india.zoom]);

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh)' }}>
      <TopBar open={open} setOpen={setOpen} toggleDrawer={toggleDrawer} />
      <div ref={mapContainer} className="absolute w-full h-full" />
    </div>
  );
}