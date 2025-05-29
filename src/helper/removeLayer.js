  // Helper to clean up the previous layer/source if present
export  const removeLayer = (map,layer,labels) => {

    if (!map.current) return;
    if (map.current.getLayer(layer)) {
      map.current.removeLayer(layer);
    }
    if (map.current.getSource(labels)) {
      map.current.removeSource(labels);
    }
  };
