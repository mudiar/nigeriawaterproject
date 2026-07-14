"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { mapPins } from "@/lib/content";
import "leaflet/dist/leaflet.css";

function FitVillagePins({
  positions,
}: {
  positions: [number, number][];
}) {
  const map = useMap();

  useEffect(() => {
    if (positions.length === 0) return;
    const bounds = L.latLngBounds(positions);
    map.fitBounds(bounds.pad(0.35), { maxZoom: 12, animate: false });
  }, [map, positions]);

  return null;
}

export function ProjectMap() {
  const positions = useMemo(
    () => mapPins.map((pin) => [pin.lat, pin.lng] as [number, number]),
    [],
  );

  const icon = useMemo(
    () =>
      L.divIcon({
        className: "nwp-map-marker",
        html: '<span class="nwp-map-marker-dot" aria-hidden="true"></span>',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
        popupAnchor: [0, -10],
      }),
    [],
  );

  return (
    <div className="map-wrap" aria-label="Map of Nigeria Water Project sites in Edo State, Nigeria">
      <div className="map-label">
        <strong>Edo State, Nigeria</strong>
        <span>Community water points in Uhunmwonde LGA</span>
      </div>
      <MapContainer
        center={[6.38, 5.88]}
        zoom={10}
        scrollWheelZoom={false}
        className="map-leaflet"
        aria-label="Interactive map of Edo State project villages"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitVillagePins positions={positions} />
        {mapPins.map((pin) => (
          <Marker
            key={pin.id}
            position={[pin.lat, pin.lng]}
            icon={icon}
            title={pin.name}
          >
            <Popup>
              <div className="map-popup">
                <strong>{pin.name}</strong>
                <Link href={pin.href}>View project</Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
