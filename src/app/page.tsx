"use client";
import InputArea from "@/components/InputArea";
import MapArea from "@/components/MapArea";

export default function Home() {
  return (
    <main>
      <div className="grid grid-cols-2">
        <InputArea />
        <MapArea />
      </div>
    </main>
  );
}
