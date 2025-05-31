This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## use Map tiler APi key

```js
// .env.local
NEXT_PUBLIC_MAP_API_KEY="XXXXXXXXXXXXX"
```

## How to setup Maptiler
#### Install it
```bash
npm install --save @maptiler/sdk
```
#### include css file 
```
import "@maptiler/sdk/dist/maptiler-sdk.css";
```
#### Add this to app.js or app/map.js
```javascript
// app/map.jsx
import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
export default function Map() {
  const india = { lng: 81.31, lat: 22.91, zoom: 3.88 };
  const mapContainer = useRef(null);
  const map = useRef(null);
  maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY;

  useEffect(() => {
    if (map.current) return; // Prevent multiple initializations

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.BASIC,   // STREETS, SATELLITE, HYBRID, Basic
      center: [india.lng, india.lat],
      zoom: india.zoom,
      hash: true,
    });

  }, [india.lng, india.lat, india.zoom, selectedCodes]);

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh)' }}>
      <div ref={mapContainer} className="absolute w-full h-full" />
    </div>
  );
}
```
## Add Marker
```javascript
// this will show default marker which is blue color droplet marker
const marker = new maptilersdk.Marker({
    color:"HEX_CODE",
    className:"CSS_CLASS", 
    element: HTML_ELEMENT
    }).setLngLat([30.5, 50.5]) //[lng,lat]
      .addTo(map.current);  // add marker to map's current ref
```
### Add a Custom Marker
```javascript
const MarkerElement = document.createElement('div');
MarkerElement.className = "block border-0 rounded-full cursor-pointer p-0";
MarkerElement.style.width = '50px';
MarkerElement.style.height = '50px';

// Can Add  BackgraoundImage 
MarkerElement.style.backgroundImage = `url(/${imgName}.png)`;

// Can Add TYpography (h1,p tag)
const titleElement = document.createElement('h4');
titleElement.textContent = "This is Text Content";
titleElement.style.margin = '2px';
titleElement.style.fontWeight = 'bold';
MarkerElement.appendChild(titleElement);

// Similarly you can add image tag, p tag, etc

const marker = new maptilersdk.Marker({element: MarkerElement})
  .setLngLat([30.5, 50.5]) //[lng,lat]
  .addTo(map.current);  // add marker to map's current ref
```

## Popup Content on Marker 
```javascript
const popup = new maptilersdk.Popup({ offset: 25, className:"CSS_CLASS" })
const marker = new maptilersdk.Marker()
    .setLngLat([30.5, 50.5]) //[lng,lat]
    .addTo(map.current);  // add marker to map's current ref
    .setPopup(popup) // set popup to a marker
```
## Custom Popup Style on Marker 
```javascript
const popupElement = document.createElement("div")
MarkerElement.style.width = '50px';
MarkerElement.style.height = '50px';

// Added title element
const titleElement = document.createElement('h4');
titleElement.textContent = "This is Text Content";
titleElement.style.margin = '2px';
titleElement.style.fontWeight = 'bold';
popupElement.appendChild(titleElement);

const popup = new maptilersdk.Popup({ offset: 25 })
    .setDOMContent(popupElement)

const marker = new maptilersdk.Marker()
    .setLngLat([30.5, 50.5]) //[lng,lat]
    .addTo(map.current) // add marker to map's current ref
    .setPopup(popup) // set popup to a marker
```
## Display popup on hover
```javascript
map.addLayer({
    'id': 'ID_OF_LAYER',
    'type': 'symbol',
    'source': 'places',
    'layout': {
        'icon-image': 'custom-marker',
        'icon-overlap': 'always'
        }
    });

var popup = new.maptilersdk.Popup({
    closeButton: false,
    closeOnClick: false
});

map.on('mouseenter', 'ID_OF_LAYER', function (e) {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    // Populate the popup and set its coordinates
    popup.setLngLat(coordinates)
         .setHTML(description)
         .addTo(map.current); // current ref of map
});

map.on('mouseleave', 'places', function () {
    map.getCanvas().style.cursor = '';
    popup.remove();
});
```

## Add layer by Geojson file
```javascript
const SOURCE = "Source_name"
const ID = "source_ID" // label
const GEOJSONDATA = {
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
        }
    ]
}

map.current.addSource(SOURCE, {
    type: 'geojson',
    data: GEOJSONDATA,
});

map.current.addLayer({
    id: ID,
    type: 'line', // line, symbol, string
    source: SOURCE,
    paint: {
        'line-color': '#FF4500',
        'line-dasharray': [2, 2],
        'line-width': 2,
    },
});
```