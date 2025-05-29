import { createGeoJSON } from '@/helper/createGeoJson';
import { removeLayer } from '@/helper/removeLayer';
import { addMarker } from '@/helper/addMarker';

export  const updateMarkers = (map,markersRef,coordinates = []) => {
    if (!map.current) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    // Handle single capital
    if (coordinates.in_capital) {
      const { lng, lat, desc } = coordinates.in_capital;
      addMarker(map,markersRef,{ lng, lat, desc });
    }

    // Handle state capitals
    if (Array.isArray(coordinates.in_st_capital)) {
       removeLayer(map,"state-capital-names","states-capital-labels");

      const stateLabelsGeoJSON = createGeoJSON(coordinates.in_st_capital);
      // Remove old layer/source if they exist before adding new ones

      // Add GeoJSON source for state names
      map.current.addSource("states-capital-labels", {
        type: "geojson",
        data: stateLabelsGeoJSON,
      });
      // Add a symbol layer to show state names
      map.current.addLayer({
        id: "state-capital-names",
        type: "symbol",
        source: "states-capital-labels",
        layout: {
          "text-field": ["get", "name"],
          "text-size": 14,
          "text-anchor": "center",
          "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
        },
        paint: {
          "text-color": "brown",
          "text-halo-color": "#fff",
          "text-halo-width": 1,
        },
      });

    } else {
      removeLayer(map,"state-capital-names","states-capital-labels");
    }

    // Handle state 
    if (Array.isArray(coordinates.in_st)) {
      removeLayer(map,"state-names","states-labels");

      const stateLabelsGeoJSON = createGeoJSON(coordinates.in_st);
      // Remove old layer/source if they exist before adding new ones

      // Add GeoJSON source for state names
      map.current.addSource("states-labels", {
        type: "geojson",
        data: stateLabelsGeoJSON,
      });
      // Add a symbol layer to show state names
      map.current.addLayer({
        id: "state-names",
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
      removeLayer(map,"state-names","states-labels");
    }

    // Handle Ut
    if (Array.isArray(coordinates.in_ut)) {
      removeLayer(map,"ut-names","ut-labels");

      const stateLabelsGeoJSON = createGeoJSON(coordinates.in_ut);
      // Remove old layer/source if they exist before adding new ones

      // Add GeoJSON source for state names
      map.current.addSource("ut-labels", {
        type: "geojson",
        data: stateLabelsGeoJSON,
      });
      // Add a symbol layer to show state names
      map.current.addLayer({
        id: "ut-names",
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
      removeLayer(map,"ut-names","ut-labels");
    }


    // Handle Union Teretory capitals
    if (Array.isArray(coordinates.in_ut_capital)) {
       removeLayer(map,"ut-capital-names","ut-capital-labels");

      const stateLabelsGeoJSON = createGeoJSON(coordinates.in_ut_capital);
      // Remove old layer/source if they exist before adding new ones

      // Add GeoJSON source for state names
      map.current.addSource("ut-capital-labels", {
        type: "geojson",
        data: stateLabelsGeoJSON,
      });
      // Add a symbol layer to show state names
      map.current.addLayer({
        id: "ut-capital-names",
        type: "symbol",
        source: "ut-capital-labels",
        layout: {
          "text-field": ["get", "name"],
          "text-size": 14,
          "text-anchor": "center",
          "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
        },
        paint: {
          "text-color": "brown",
          "text-halo-color": "#fff",
          "text-halo-width": 1,
        },
      });

    } else {
      removeLayer(map,"ut-capital-names","ut-capital-labels");
    }
    }
    // Handle mountain ranges with peaks
    // if (Array.isArray(coordinates.in_mountain_ranges)) {
    //   coordinates.in_mountain_ranges.forEach(range => {
    //     range.peaks.forEach(({ lng, lat, desc }) => {
    //       addMarker(map,markersRef,{ lng, lat, desc });
    //     });
    //   });
    // }
