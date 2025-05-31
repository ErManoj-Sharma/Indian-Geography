import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import TopBar from './TopBar';
import { india } from '@/constant/Cordinate';
import { updateMarkers } from '@/helper/updateMarkers';
import { getCordinateForCodes } from '@/helper/getCordinateForCodes';
import { useDispatch } from "react-redux";
import InfoSideBar from './InfoSideBar';
export default function Map({ open,
  setOpen,
  toggleDrawer, selectedCodes }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const dispatch = useDispatch();
  maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY;

  useEffect(() => {
    if (map.current && selectedCodes?.length >= 0) {
      updateMarkers(map, markersRef, getCordinateForCodes(selectedCodes), dispatch);
    }
  }, [selectedCodes]);


  useEffect(() => {
    if (map.current) return; // Prevent multiple initializations

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
      <InfoSideBar />
      <div ref={mapContainer} className="absolute w-full h-full" />
    </div>
  );
}