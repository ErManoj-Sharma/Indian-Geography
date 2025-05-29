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

export const TropicofCancerGeoJson = {
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [68.0, 23.4394],
      [97.0, 23.4394]
    ]
  },
  "properties": {
    "name": "Tropic of Cancer"
  }
}
