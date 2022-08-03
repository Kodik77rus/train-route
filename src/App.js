import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import { LocoMarker } from "./components";
import { parseTempForTimeInterval, combineLocation } from "./utils";
import { getFileFromSrver } from "./services";

import "./App.css";

const App = () => {
  const [locoInfo, setLocoInfo] = useState(false);
  const [locoStartPoint, setLocoStartPoint] = useState(false);
  const [locoEndPoint, setLocoEndPoint] = useState(false);
  // const [locoPolyline, setLocoPolyline] = useState({});

  const loadInitialState = async () => {
    // const temp = await getFileFromSrver("temperatures.json");
    const coords = await getFileFromSrver("location.json");

    // const { Timestamp: tempTimestamp, OutsideTemp: outsideTemp } = temp;
    const {
      Timestamp: coordsTimestamp,
      LocoType: locoType,
      LocoNumber: locoNumber,
      Latitude: latitude,
      Longitude: longitude,
    } = coords;

    const parsedLocation = combineLocation(latitude, longitude);

    setLocoInfo({
      locoType,
      locoNumber,
    });
    setLocoStartPoint({
      timestamp: coordsTimestamp[0],
      location: parsedLocation[0],
    });
    setLocoEndPoint({
      timestamp: coordsTimestamp[coordsTimestamp.length - 1],
      location: parsedLocation[parsedLocation.length - 1],
    });
    setLocoPolyline(
      parseTempForTimeInterval({
        locoLocation: {
          parsedLocation,
          coordsTimestamp,
        },
        temp: {
          tempTimestamp,
          outsideTemp,
        },
      })
    );
  };

  useEffect(() => {
    loadInitialState();
  }, []);

  return !locoStartPoint ? (
    <div>Loading...</div>
  ) : (
    <MapContainer
      center={locoStartPoint.location}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocoMarker location={locoStartPoint} locoInfo={locoInfo} type="start" />
      <LocoMarker location={locoEndPoint} locoInfo={locoInfo} type="end" />
    </MapContainer>
  );
};

export default App;
