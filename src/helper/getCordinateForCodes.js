import { cordinate } from '@/constant/Cordinate';

export  const getCordinateForCodes = (selectedCodes) => {
    const result = {};

    selectedCodes.forEach(code => {
      if (cordinate[code]) {
        result[code] = cordinate[code];
      }
    });

    return result;
  }