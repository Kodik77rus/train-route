import React from "react";
import { Marker, Tooltip } from "react-leaflet";

export const LocoMarker = (props) => {
  const {
    location: { location, timestamp },
    locoInfo: { locoType, locoNumber },
    type,
  } = props;

  return (
    <Marker position={location} key={type}>
      <Tooltip>
        <div>{type} point</div>
        <div>loco type: {locoType}</div>
        <div>loco number: {locoNumber}</div>
        <div>loco timestamp: {timestamp}</div>
      </Tooltip>
    </Marker>
  );
};
