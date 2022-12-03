import type { Listing } from "@prisma/client";
import ReactMap, { Marker } from "react-map-gl";
import type { Coords } from "../hooks/useCurrenLocation";

type Props = {
  coords: Coords;
  listings: Listing[];
};

export default function Map({ coords, listings }: Props) {
  console.log("My listings", listings);
  return (
    <ReactMap
      initialViewState={{
        longitude: coords.longitude,
        latitude: coords.latitude,
        zoom: 14,
      }}
      style={{ width: "auto", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken="pk.eyJ1Ijoicm9kcmlnbHUiLCJhIjoiY2prNXozbGQ4MGtqeDNwcDA5bnFwcGVobSJ9.0EBzSPf4YCLArgTpqhYDog"
    >
      {listings.map((listing) => (
        <Marker
          latitude={listing.latitude}
          longitude={listing.longitude}
          key={listing.name}
          color="#ef4444"
        />
      ))}
    </ReactMap>
  );
}
