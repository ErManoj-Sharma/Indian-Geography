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

export const ExpansionLinesGeoJson = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [68.0, 8 + 4 / 60],
          [97.0, 8 + 4 / 60]
        ]
      },
      "properties": {
        "name": "8° 4' North",
        "color": "#FF0000"  // red
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [68.0, 37 + 6 / 60],
          [97.0, 37 + 6 / 60]
        ]
      },
      "properties": {
        "name": "37° 6' North",
        "color": "#0000FF"  // blue
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [68 + 7 / 60, 8.0],
          [68 + 7 / 60, 37.0]
        ]
      },
      "properties": {
        "name": "68° 7' East",
        "color": "#00FF00"  // green
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [97 + 25 / 60, 8.0],
          [97 + 25 / 60, 37.0]
        ]
      },
      "properties": {
        "name": "97° 25' East",
        "color": "#FFA500"  // orange
      }
    },

    {
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [68, 23.4394],
      [97, 28.0]
    ]
  },
  "properties": {
    "name": "West to East\n(68°E to 97°E)\n2933 KM\nKutch (GJ) - Walong (AP)",
    "color": "#FFA500"
  }
},
{
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [74.7696, 37.0744],
      [77.551557, 8.077617]
    ]
  },
  "properties": {
    "name": "North to South\n(37°N to 8°N)\n3214 KM\nIndira Col (Ladakh) - Kanyakumari (TN)",
    "color": "#FFA500"
  }
}

  ]
};
