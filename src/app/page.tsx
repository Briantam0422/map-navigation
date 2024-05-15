import InputArea from "@/components/InputArea";
import MapArea from "@/components/MapArea";
import { Button } from "@nextui-org/react";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="grid grid-cols-2 gap-4">
        <InputArea />
        <MapArea />
      </div>
    </main>
  );
}
