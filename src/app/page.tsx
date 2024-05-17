"use client";
import FormInputRoute from "@/components/map-navigation/FormInputRoute";
import MapArea from "@/components/map-navigation/MapArea";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main>
      <Toaster />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <FormInputRoute />
        <MapArea />
      </div>
    </main>
  );
}
