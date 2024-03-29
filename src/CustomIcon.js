import { Icon } from "leaflet";

const customIcon = new Icon({
    iconUrl: require("./icons/map.png"),
    iconSize: [38, 38], // size of the icon
  });

export default customIcon;