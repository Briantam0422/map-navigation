import { GoogleMap } from "@react-google-maps/api";
import { useMemo } from "react";
import GoogleGapDirections from "./GoogleMapDirections";

type GoogleMapComponentProps = {
  isLoaded: boolean;
};

export default function GoogleMapComponent({
  isLoaded,
}: GoogleMapComponentProps) {
  const mapCenter = useMemo(() => ({ lat: 22.302711, lng: 114.177216 }), []);
  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      zoomControl: true,
      zoomControlOptions: {
        position: 17.0,
      },
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );

  return (
    <>
      {isLoaded && (
        <div data-testid="google-map">
          <GoogleMap
            options={mapOptions}
            zoom={12}
            center={mapCenter}
            mapTypeId={google.maps.MapTypeId.ROADMAP}
            mapContainerStyle={{ width: "100%", minHeight: "100vh" }}>
            <GoogleGapDirections />
          </GoogleMap>
        </div>
      )}
    </>
  );
}
