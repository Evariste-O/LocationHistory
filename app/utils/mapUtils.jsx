import { latLngBounds } from "leaflet";

export function calculateZoomAndCenter(locations) {
    var coordinates = locations.map(location => [location.latitude, location.longitude]);
    console.log(latLngBounds(coordinates).toBBoxString())
}