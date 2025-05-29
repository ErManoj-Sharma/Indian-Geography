import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import TopBar from './TopBar';
import { india } from '@/constant/Cordinate';
import { createGeoJSON } from '@/helper/createGeoJson';
import { removeLayer } from '@/helper/removeLayer';
import { getCordinateForCodes } from '@/helper/getCordinateForCodes';
export default function Map({ open,
  setOpen,
  toggleDrawer, selectedCodes }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY;

  // Helper function to create a marker
  const addMarker = ({ lng, lat, desc }) => {
    const el = document.createElement('div');
    // el.className = 'custom-marker bg-green-600 rounded-full w-4 h-4 border-2 border-white shadow';

    const popup = new maptilersdk.Popup({ offset: 25 }).setText(desc || '');

    const marker = new maptilersdk.Marker(el)
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(map.current);

    markersRef.current.push(marker);
  };

  const updateMarkers = (coordinates = []) => {
    if (!map.current) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    // Handle single capital
    if (coordinates.in_capital) {
      const { lng, lat, desc } = coordinates.in_capital;
      addMarker({ lng, lat, desc });
    }

    // Handle state capitals
    if (Array.isArray(coordinates.in_st_capital)) {
      coordinates.in_st_capital.forEach(({ lng, lat, desc }) => {
        addMarker({ lng, lat, desc });
      });
    }

    // Handle state capitals
    if (Array.isArray(coordinates.in_st)) {
      removeLayer(map,"state-names-layer","states-labels");

      const stateLabelsGeoJSON = createGeoJSON(coordinates.in_st);
      // Remove old layer/source if they exist before adding new ones

      // Add GeoJSON source for state names
      map.current.addSource("states-labels", {
        type: "geojson",
        data: stateLabelsGeoJSON,
      });
      // Add a symbol layer to show state names
      map.current.addLayer({
        id: "state-names-layer",
        type: "symbol",
        source: "states-labels",
        layout: {
          "text-field": ["get", "name"],
          "text-size": 14,
          "text-anchor": "center",
          "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
        },
        paint: {
          "text-color": "blue",
          "text-halo-color": "#fff",
          "text-halo-width": 1,
        },
      });

    } else {
      removeLayer(map,"state-names-layer","states-labels");
    }

    // Handle Ut
    if (Array.isArray(coordinates.in_ut)) {
      removeLayer(map,"ut-names-layer","ut-labels");

      const stateLabelsGeoJSON = createGeoJSON(coordinates.in_ut);
      // Remove old layer/source if they exist before adding new ones

      // Add GeoJSON source for state names
      map.current.addSource("ut-labels", {
        type: "geojson",
        data: stateLabelsGeoJSON,
      });
      // Add a symbol layer to show state names
      map.current.addLayer({
        id: "ut-names-layer",
        type: "symbol",
        source: "ut-labels",
        layout: {
          "text-field": ["get", "name"],
          "text-size": 14,
          "text-anchor": "center",
          "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
        },
        paint: {
          "text-color": "red",
          "text-halo-color": "#fff",
          "text-halo-width": 1,
        },
      });

    } else {
      removeLayer(map,"ut-names-layer","ut-labels");
    }


    // Handle Union Teretory capitals
    if (Array.isArray(coordinates.in_ut_capital)) {
      coordinates.in_ut_capital.forEach(({ lng, lat, desc }) => {
        addMarker({ lng, lat, desc });
      });
    }
    // Handle mountain ranges with peaks
    if (Array.isArray(coordinates.in_mountain_ranges)) {
      coordinates.in_mountain_ranges.forEach(range => {
        range.peaks.forEach(({ lng, lat, desc }) => {
          addMarker({ lng, lat, desc });
        });
      });
    }

  };

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