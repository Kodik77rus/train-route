export const combineLocation = (latitude, longitude) => {
  const coords = [];
  for (let i = 0; i < latitude.length; i++) {
    if (latitude[i] === "NA" || longitude[i] === "NA") {
      break;
    }
    coords.push([latitude[i], longitude[i]]);
  }
  return coords;
};

export const parseTempForTimeInterval = () => {

};
