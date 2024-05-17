import { config } from "@/config/app";
import { Spinner } from "@nextui-org/react";
import { useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import RenderMap from "./RenderMap";

export default function MapArea() {
  const libraries = useMemo(() => ["places"], []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: config.google_map_key as string,
    libraries: libraries as any,
  });
  return isLoaded ? <RenderMap /> : <Spinner />;
}
