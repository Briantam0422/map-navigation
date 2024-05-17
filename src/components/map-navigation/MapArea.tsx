import { config } from "@/config/app";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

export default function MapArea() {
  const libraries = useMemo(() => ["places"], []);
  const mapCenter = useMemo(() => ({ lat: 22.302711, lng: 114.177216 }), []);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: config.google_map_key as string,
    libraries: libraries as any,
  });
  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  return (
    <GoogleMap
      options={mapOptions}
      zoom={14}
      center={mapCenter}
      mapTypeId={google.maps.MapTypeId.ROADMAP}
      mapContainerStyle={{ width: "100%", minHeight: "100vh" }}
      onLoad={() => console.log("Map Component Loaded...")}
    />
  );
}
