"use client";
import { config } from "@/config/app";
import { Spinner } from "@nextui-org/react";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import { Toaster } from "react-hot-toast";
import GoogleMapComponent from "@/components/map-navigation/google-map/GoogleMapComponent";
import { useMemo } from "react";
import FormInputRoute from "@/components/map-navigation/form/FormInputRoute";

export default function Home() {
  const libraries = useMemo(() => ["places"], []);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: config.google_map_key as string,
    libraries: libraries as Libraries | undefined,
  });
  return (
    <main>
      <Toaster data-testid="global-toaster" />
      {isLoaded ? (
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <FormInputRoute />
          <GoogleMapComponent isLoaded={isLoaded} />
        </div>
      ) : (
        <Spinner data-testid="spinner-loading" />
      )}
    </main>
  );
}
