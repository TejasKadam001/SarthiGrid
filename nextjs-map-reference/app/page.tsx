'use client';

import dynamic from "next/dynamic";

// Import MapComponent with SSR disabled since it uses window mapping SDKs
const MapComponent = dynamic(() => import("../components/MapComponent"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative w-screen h-screen">
      <MapComponent />
    </main>
  );
}
