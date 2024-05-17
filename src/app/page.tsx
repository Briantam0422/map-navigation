"use client";
import FormInputRoute from "@/components/map-navigation/FormInputRoute";
import MapArea from "@/components/MapArea";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main>
      <Toaster />
      <div className="grid grid-cols-2">
        <FormInputRoute />
        <MapArea />
      </div>
    </main>
  );
}
