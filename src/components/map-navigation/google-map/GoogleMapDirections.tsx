import { useAppSelector } from "@/store/hooks";
import { DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import { useState, useEffect, useCallback, useMemo } from "react";

type Location = {
  lat: number;
  lng: number;
};

type Waypoint = {
  location: Location;
  stopover: boolean;
};

export default function GoogleGapDirections() {
  const routeState = useAppSelector((state) => state.route);

  const initialDirectionFormValue = {
    origin: { lat: 0, lng: 0 },
    destination: { lat: 0, lng: 0 },
    waypoints: [],
    travelMode: google.maps.TravelMode.DRIVING,
  };
  const [directionsFormValue, setDirectionsFormValue] =
    useState<google.maps.DirectionsRequest>(initialDirectionFormValue);

  const [response, setResponse] = useState<google.maps.DirectionsResult | null>(
    null
  );

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
    } else {
      setResponse(null);
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
    <>
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
    </>
  );
}
