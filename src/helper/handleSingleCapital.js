import { addMarker } from './addMarker';

export const handleCapitalMarker = (map, markersRef, dispatch, inCapital) => {
  if (!map.current || !inCapital) return;

  const { lng, lat, desc } = inCapital;
  addMarker(map, markersRef, dispatch, { lng, lat, desc }, null);
};
