import { removeLayer } from '@/helper/removeLayer';
import { addMarker } from '@/helper/addMarker';
import { handleCapitalMarker } from '@/helper/handleSingleCapital';
import { handleStateCapitals } from '@/helper/handleStateCapitals';
import { handleStates } from '@/helper/handleStates';
import { handleUTs } from './handleUts';
import { handleUTCapitals } from './handleUTCapitals';
import { handleTropicOfCancer } from './handleTropicOfCancer';
export const updateMarkers = (map, markersRef, coordinates = []) => {
  if (!map.current) return;

  markersRef.current.forEach(marker => marker.remove());
  markersRef.current = [];
  // Handle single capital
  if (coordinates.in_capital) {
    handleCapitalMarker(map, markersRef, coordinates.in_capital);
  }

  // Handle state capitals
  if (Array.isArray(coordinates.in_st_capital)) {
    handleStateCapitals(map, coordinates.in_st_capital);
  } else {
    removeLayer(map, "state-capital-names", "states-capital-labels");
  }

  // Handle state 
  if (Array.isArray(coordinates.in_st)) {
    handleStates(map, coordinates.in_st);
  } else {
    removeLayer(map, "state-names", "states-labels");
  }

  // Handle Ut
  if (Array.isArray(coordinates.in_ut)) {
    handleUTs(map, coordinates.in_ut);
  } else {
    removeLayer(map, "ut-names", "ut-labels");
  }


  // Handle Union Teretory capitals
  if (Array.isArray(coordinates.in_ut_capital)) {
    handleUTCapitals(map, coordinates.in_ut_capital);
  } else {
    removeLayer(map, "ut-capital-names", "ut-capital-labels");
  }

  // Handle Union tropic of cancer
  if (Array.isArray(coordinates.in_tropic_of_cancer)) {
    handleTropicOfCancer(map, coordinates.in_tropic_of_cancer);
  } else {
    removeLayer(map, "tropic-of-cancer-st-names", "tropic-of-cancer-st-labels");
    removeLayer(map, "tropic-of-cancer-names", "tropic-of-cancer-labels");

  }
  // handle in_tiger_reserves
  if (Array.isArray(coordinates.in_tiger_reserve)) {
    coordinates.in_tiger_reserve.forEach(({ lng, lat, title, desc, state }) => {
      addMarker(map, markersRef, { lng, lat, title, desc, state }, 'tiger_reserve');
    });
  }
}

