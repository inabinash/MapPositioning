import { Marker, Popup } from "react-leaflet";
import { useMapEvents } from "react-leaflet";

import { useState } from "react";
import customIcon from "./CustomIcon";


export default function LocationMarker() {
  const [position, setPosition] = useState(null);
  const handleClick = (e) => {
    console.log("HI I am clicked :", e.latlng);
    setPosition(e.latlng);
  };

  const map = useMapEvents({
    click: handleClick,
  });

  return position === null ? null : (
    <Marker
      position={[position?.lat, position?.lng]}
      icon={customIcon}
    >
    <Popup>{`${position?.lat.toFixed(3)} , ${position?.lng.toFixed(3)}`}</Popup>
    </Marker>
  );
}
