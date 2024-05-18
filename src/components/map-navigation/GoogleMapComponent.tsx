import { useAppSelector } from "@/store/hooks";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useEffect, useState, useCallback, useMemo } from "react";

type Location = {
  lat: number;
  lng: number;
};

type Waypoint = {
  location: Location;
  stopover: boolean;
};

export default function GoogleMapComponent() {
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
  const routeState = useAppSelector((state) => state.route);
  const [response, setResponse] = useState<google.maps.DirectionsResult | null>(
    null
  );
  const [directionsFormValue, setDirectionsFormValue] =
    useState<google.maps.DirectionsRequest>({
      origin: { lat: 0, lng: 0 },
      destination: { lat: 0, lng: 0 },
      waypoints: [],
      travelMode: google.maps.TravelMode.DRIVING,
    });

  useEffect(() => {
    if (routeState.path && routeState.path.length > 0) {
      const paths = routeState.path;
      const origin = { lat: Number(paths[0][0]), lng: Number(paths[0][1]) };
      const destination = {
        lat: Number(paths[paths.length - 1][0]),
        lng: Number(paths[paths.length - 1][1]),
      };
      const waypointPaths = paths.slice(1, paths.length - 1);
      let waypoints: Waypoint[] = [];
      waypointPaths.map((item) => {
        waypoints.push({
          location: { lat: Number(item[0]), lng: Number(item[1]) },
          stopover: true,
        });
      });
      const data = {
        origin,
        destination,
        waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
      };
      setDirectionsFormValue(data);
    }
  }, [routeState.path]);

  const directionsCallback = useCallback(
    (
      result: google.maps.DirectionsResult | null,
      status: google.maps.DirectionsStatus
    ) => {
      if (result !== null) {
        if (status === "OK") {
          setResponse(result);
        }
      }
    },
    []
  );

  const directionsServiceOptions =
    useMemo<google.maps.DirectionsRequest>(() => {
      return {
        destination: directionsFormValue.destination,
        origin: directionsFormValue.origin,
        waypoints: directionsFormValue.waypoints,
        travelMode: directionsFormValue.travelMode,
      };
    }, [
      directionsFormValue.origin,
      directionsFormValue.destination,
      directionsFormValue.waypoints,
      directionsFormValue.travelMode,
    ]);

  const directionsResult = useMemo(() => {
    return {
      directions: response,
    };
  }, [response]);

  return (
    <GoogleMap
      id="google-map"
      options={mapOptions}
      zoom={12}
      center={mapCenter}
      mapTypeId={google.maps.MapTypeId.ROADMAP}
      mapContainerStyle={{ width: "100%", minHeight: "100vh" }}>
      {directionsFormValue.destination !== "" &&
        directionsFormValue.origin !== "" && (
          <DirectionsService
            options={directionsServiceOptions}
            callback={directionsCallback}
          />
        )}

      {directionsResult.directions && (
        <DirectionsRenderer options={directionsResult} />
      )}
    </GoogleMap>
  );
}
