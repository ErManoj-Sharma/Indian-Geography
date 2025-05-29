  // Utility: Convert your array into GeoJSON format
export  const createGeoJSON = (data) => {
    return {
      type: "FeatureCollection",
      features: data.map(({ lng, lat, desc }) => ({
        type: "Feature",
        properties: { name: desc },
        geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
      })),
    };
  };