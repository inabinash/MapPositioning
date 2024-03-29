
import { divIcon, point } from "leaflet";
const CustomClusterIcon = function (cluster) {
    return new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      // className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };

export default CustomClusterIcon;