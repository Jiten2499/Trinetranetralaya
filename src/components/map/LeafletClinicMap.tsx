"use client";

import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { ClinicMapProps } from "@/lib/map";

const clinicIcon = L.divIcon({
  className: "clinic-map-pin-wrap",
  html: '<span class="clinic-map-pin"></span>',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});

function MapLifecycle({ onReady, onFailure }: { onReady: () => void; onFailure: () => void }) {
  const map = useMap();

  useEffect(() => {
    let loadedTile = false;
    let failedTiles = 0;
    const reveal = () => {
      loadedTile = true;
      onReady();
    };
    const handleError = () => {
      failedTiles += 1;
      if (!loadedTile && failedTiles >= 6) onFailure();
    };
    const resize = () => map.invalidateSize();

    map.whenReady(() => {
      resize();
      window.setTimeout(resize, 200);
      onReady();
    });
    map.on("tileload", reveal);
    map.on("tileerror", handleError);
    window.addEventListener("resize", resize);

    return () => {
      map.off("tileload", reveal);
      map.off("tileerror", handleError);
      window.removeEventListener("resize", resize);
    };
  }, [map, onFailure, onReady]);

  return null;
}

export default function LeafletClinicMap({
  clinicName,
  address,
  phone,
  email,
  latitude,
  longitude,
  tileUrl,
  tileAttribution,
  onReady,
  onFailure,
}: ClinicMapProps & { onReady: () => void; onFailure: () => void }) {
  if (latitude === null || longitude === null) return null;

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={16}
      scrollWheelZoom
      className="clinic-map h-full w-full"
      style={{ height: "100%", width: "100%" }}
      attributionControl
    >
      <TileLayer attribution={tileAttribution} maxZoom={19} url={tileUrl} />
      <MapLifecycle onReady={onReady} onFailure={onFailure} />
      <Marker
        position={[latitude, longitude]}
        icon={clinicIcon}
        title={clinicName}
        eventHandlers={{
          add: (event) => {
            event.target.openPopup();
          },
        }}
      >
        <Popup>
          <div className="grid gap-1 text-sm text-foreground">
            <p className="font-semibold">{clinicName}</p>
            {address ? <p>{address}</p> : null}
            {phone ? (
              <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="font-semibold text-action">
                {phone}
              </a>
            ) : null}
            {email ? (
              <a href={`mailto:${email}`} className="font-semibold text-action">
                {email}
              </a>
            ) : null}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
