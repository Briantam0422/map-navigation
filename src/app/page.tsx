"use client";
import FormInputRoute from "@/components/map-navigation/FormInputRoute";
import { config } from "@/config/app";
import { Spinner } from "@nextui-org/react";
import { useLoadScript } from "@react-google-maps/api";
import { Toaster } from "react-hot-toast";
import GoogleMapComponent from "@/components/map-navigation/GoogleMapComponent";

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: config.google_map_key as string,
    libraries: ["places"],
  });
  return (
    <main>
      <Toaster />
      {isLoaded ? (
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <FormInputRoute />
          <GoogleMapComponent />
        </div>
      ) : (
        <Spinner />
      )}
    </main>
  );
}
