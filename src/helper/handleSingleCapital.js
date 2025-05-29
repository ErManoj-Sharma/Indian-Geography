import { addMarker } from './addMarker';

export const handleCapitalMarker = (map, markersRef, inCapital) => {
  if (!map.current || !inCapital) return;

  const { lng, lat, desc } = inCapital;
  addMarker(map, markersRef, { lng, lat, desc }, null);
};
