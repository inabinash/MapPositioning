import "./styles.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useMap } from "react-leaflet";

import LocationMarker from "./LocationMarker";
import customIcon from "./CustomIcon";
import CustomClusterIcon from "./CustomClusterIcon";



// // markers
const markers = [
  {
    geocode: [20.2961, 85.8245],
    popUp: "Hello, I am pop up 1",
  },
  {
    geocode: [48.85, 2.3522],
    popUp: "Hello, I am pop up 2",
  },
  {
    geocode: [48.855, 2.34],
    popUp: "Hello, I am pop up 3",
  },
];

function calculateBounds(points) {
  let minLat = Number.MAX_VALUE;
  let maxLat = -Number.MAX_VALUE;
  let minLng = Number.MAX_VALUE;
  let maxLng = -Number.MAX_VALUE;

  points.forEach((point) => {
    const [lat, lng] = point.geocode;
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
    minLng = Math.min(minLng, lng);
    maxLng = Math.max(maxLng, lng);
  });

  return [
    [minLat, minLng],
    [maxLat, maxLng],
  ];
}

function calculateCenter(bounds) {
  const lat = (bounds[0][0] + bounds[1][0]) / 2;
  const lng = (bounds[0][1] + bounds[1][1]) / 2;
  return [lat, lng];
}

function calculateZoom(bounds, mapWidth, mapHeight) {
  const WORLD_DIM = { height: 256, width: 256 };
  const ZOOM_MAX = 20;

  const latFraction = (bounds[1][0] - bounds[0][0]) / 180;
  const lngFraction = (bounds[1][1] - bounds[0][1]) / 360;

  const latZoom = Math.floor(
    Math.log(mapHeight / WORLD_DIM.height / latFraction) / Math.log(2)
  );
  const lngZoom = Math.floor(
    Math.log(mapWidth / WORLD_DIM.width / lngFraction) / Math.log(2)
  );

  return Math.min(latZoom, lngZoom, ZOOM_MAX);
}

export default function App() {
  const bounds= calculateBounds(markers);
  const center= calculateCenter(bounds);
  const zoom = calculateZoom(bounds,800, 600);


  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '90vh', width: '90%' }} >
      {/* OPEN STREEN MAPS TILES */}
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}

      {/* WATERCOLOR CUSTOM TILES */}
      {/* <TileLayer
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg"
      /> */}

      {/* GOOGLE MAPS TILES */}
      <TileLayer
        attribution="Google Maps"
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
        // url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // satellite
        // url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" // terrain
        // url ="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        maxZoom={20}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      />

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={CustomClusterIcon}
      >
        {/* Mapping through the markers */}
        {markers.map((marker) => (
          <Marker position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}      
      </MarkerClusterGroup>
      <LocationMarker/>
      
    </MapContainer>
  );
}