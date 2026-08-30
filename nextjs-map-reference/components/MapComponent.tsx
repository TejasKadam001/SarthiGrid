'use client';

import React, { useEffect, useRef, useState } from 'react';

// Declarations to satisfy TypeScript for global mappls object
declare global {
  interface Window {
    mappls: any;
  }
}

interface Coordinate {
  lat: number;
  lng: number;
}

interface MapComponentProps {
  gpsCoordinates?: Coordinate; // Streamed coordinate updates
  onMapLoad?: (map: any) => void;
}

export default function MapComponent({ gpsCoordinates, onMapLoad }: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Widget State
  const [telemetry, setTelemetry] = useState({
    distanceCovered: 18.4,
    remaining: 12.6,
  });

  // Countdown timer state: 12h 54m 47s -> total seconds = (12 * 3600) + (54 * 60) + 47 = 46487 seconds
  const [timerSeconds, setTimerSeconds] = useState(46487);

  // Dynamic coordinates tracking (for websocket / polling hook mock simulation)
  const [currentPos, setCurrentPos] = useState<Coordinate>({
    lat: 18.5204,
    lng: 73.8567,
  });

  // 1. Live Countdown Ticker Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 46487));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format seconds to "12h - 54m - 47s"
  const formatTimer = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${String(hrs).padStart(2, '0')}h - ${String(mins).padStart(2, '0')}m - ${String(secs).padStart(2, '0')}s`;
  };

  // 2. Map Initialization & Setup
  useEffect(() => {
    let checkInterval: NodeJS.Timeout;

    const initializeMap = () => {
      // Check if SDK window object is loaded and DOM container element is ready
      if (!window.mappls || !mapContainerRef.current) return false;

      try {
        // Initialize Mappls Vector Map centered on Pune
        const map = new window.mappls.Map(mapContainerRef.current, {
          center: { lat: currentPos.lat, lng: currentPos.lng },
          zoom: 14,
          style: 'vector', // Sets default cartographic yellow highways & 2.5D building layout
        });

        mapRef.current = map;

        // Create live tracking marker
        const marker = new window.mappls.Marker({
          map: map,
          position: { lat: currentPos.lat, lng: currentPos.lng }
        });

        markerRef.current = marker;
        setMapLoaded(true);

        if (onMapLoad) {
          onMapLoad(map);
        }
        return true;
      } catch (err) {
        console.error('Error initializing Mappls Map:', err);
        return false;
      }
    };

    if (initializeMap()) {
      return;
    }

    // Polling check to handle async script injection loading states
    checkInterval = setInterval(() => {
      if (initializeMap()) {
        clearInterval(checkInterval);
      }
    }, 200);

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, []);

  // 3. React to live coordinate changes (e.g. Websocket or API polling stream)
  useEffect(() => {
    if (gpsCoordinates && mapLoaded && markerRef.current && mapRef.current) {
      setCurrentPos(gpsCoordinates);
      markerRef.current.setPosition(gpsCoordinates);
      mapRef.current.setCenter(gpsCoordinates);
    }
  }, [gpsCoordinates, mapLoaded]);

  // 4. Mock Simulation Loop (runs when no gpsCoordinates prop is supplied)
  useEffect(() => {
    if (gpsCoordinates) return; // Disable mock movement if live stream coordinates are supplied

    let mockInterval: NodeJS.Timeout;

    if (mapLoaded && markerRef.current && mapRef.current) {
      let step = 0;
      mockInterval = setInterval(() => {
        step += 1;
        // Shift latitude / longitude slowly to simulate physical motion
        const nextLat = 18.5204 - step * 0.0004;
        const nextLng = 73.8567 + step * 0.0006;
        const nextPos = { lat: nextLat, lng: nextLng };

        setCurrentPos(nextPos);
        markerRef.current.setPosition(nextPos);
        mapRef.current.panTo(nextPos);

        // Update telemetry states accordingly
        setTelemetry((prev) => ({
          distanceCovered: +(prev.distanceCovered + 0.1).toFixed(1),
          remaining: +(Math.max(0, prev.remaining - 0.1)).toFixed(1),
        }));
      }, 3000);
    }

    return () => {
      if (mockInterval) clearInterval(mockInterval);
    };
  }, [mapLoaded, gpsCoordinates]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950">
      {/* ── MAP CONTAINER CANVAS ── */}
      <div ref={mapContainerRef} className="w-full h-full" id="mappls-map" />

      {/* ── FLOATING DEEP-PURPLE GLASSMORPHISM OVERLAY WIDGET ── */}
      <div className="absolute top-6 left-6 z-[1000] w-80 rounded-2xl border border-purple-500/20 bg-purple-950/65 p-5 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-purple-500/35 hover:bg-purple-950/75 select-none font-sans">
        
        {/* Header Branding */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-white">Convoy Tracker</h2>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-purple-300">Sarathi-Grid Live</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 border border-emerald-500/20">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide">Live</span>
          </div>
        </div>

        {/* Telemetry Section */}
        <div className="space-y-2.5 py-2.5 border-t border-purple-500/15">
          <div className="flex items-center justify-between text-sm">
            <span className="text-purple-200/70 font-medium">Distance Covered</span>
            <span className="font-semibold text-white tracking-wide">{telemetry.distanceCovered} km</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-purple-200/70 font-medium">Remaining</span>
            <span className="font-semibold text-white tracking-wide">{telemetry.remaining} km</span>
          </div>
        </div>

        {/* Countdown Timer Component */}
        <div className="mt-4 pt-3 border-t border-purple-500/15">
          <p className="text-[10px] font-bold text-purple-300/80 uppercase tracking-wider mb-2">ETA Threshold Limit</p>
          <div className="flex items-center justify-center w-full rounded-xl border border-red-500/25 bg-red-950/20 px-4 py-3 text-center text-red-400 shadow-inner">
            <span className="font-mono text-base font-extrabold tracking-widest text-red-400">
              {formatTimer(timerSeconds)}
            </span>
          </div>
        </div>

        {/* Real-time GPS Coordinates Debug */}
        <div className="mt-3.5 flex items-center justify-between rounded-lg bg-black/25 px-2.5 py-1.5 font-mono text-[9px] text-purple-200/50">
          <span>LAT: {currentPos.lat.toFixed(5)}</span>
          <span>LNG: {currentPos.lng.toFixed(5)}</span>
        </div>
      </div>

      {/* Loading Overlay */}
      {!mapLoaded && (
        <div className="absolute inset-0 z-[1001] flex flex-col items-center justify-center bg-slate-950/90 text-white backdrop-blur-sm">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500/20 border-t-purple-500" />
          <p className="mt-4 font-sans text-sm font-semibold tracking-wider text-purple-300 animate-pulse">Initializing Mappls Vector Canvas...</p>
        </div>
      )}
    </div>
  );
}
