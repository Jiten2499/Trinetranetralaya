"use client";

import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { ClinicMapPlace } from "@/lib/map";

function pinIcon(label: string) {
  const safe = label.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return entities[character] ?? character;
  });
  return L.divIcon({
    className: "clinic-map-pin-wrap",
    html: `<span class="clinic-map-pin"></span><span class="clinic-map-label">${safe}</span>`,
    iconSize: [96, 46],
    iconAnchor: [48, 18],
    popupAnchor: [0, -20],
  });
}

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

function FitPlaces({ positionKey }: { positionKey: string }) {
  const map = useMap();

  useEffect(() => {
    const positions = positionKey.split("|").map((pair) => {
      const [latitude, longitude] = pair.split(",").map(Number);
      return [latitude, longitude] as [number, number];
    });
    if (positions.length === 1) {
      map.setView(positions[0], 16);
      return;
    }
    map.fitBounds(L.latLngBounds(positions), { padding: [48, 48], maxZoom: 13 });
  }, [map, positionKey]);

  return null;
}

export default function LeafletClinicMap({
  places,
  tileUrl,
  tileAttribution,
  onReady,
  onFailure,
}: {
  places: ClinicMapPlace[];
  tileUrl: string;
  tileAttribution: string;
  onReady: () => void;
  onFailure: () => void;
}) {
  const pinned = places.filter((place): place is ClinicMapPlace & { latitude: number; longitude: number } => place.latitude !== null && place.longitude !== null);
  if (pinned.length === 0) return null;
  const positionKey = pinned.map((place) => `${place.latitude},${place.longitude}`).join("|");
  const positions = pinned.map((place) => [place.latitude, place.longitude] as [number, number]);

  return (
    <MapContainer
      center={positions[0]}
      zoom={positions.length === 1 ? 16 : 11}
      scrollWheelZoom
      className="clinic-map h-full w-full"
      style={{ height: "100%", width: "100%" }}
      attributionControl
    >
      <TileLayer attribution={tileAttribution} maxZoom={19} url={tileUrl} />
      <MapLifecycle onReady={onReady} onFailure={onFailure} />
      <FitPlaces positionKey={positionKey} />
      {pinned.map((place, index) => (
        <Marker
          key={place.id}
          position={[place.latitude, place.longitude]}
          icon={pinIcon(place.label)}
          title={`${place.name}, ${place.label}`}
          eventHandlers={
            index === 0
              ? {
                  add: (event) => {
                    event.target.openPopup();
                  },
                }
              : undefined
          }
        >
          <Popup>
            <div className="grid gap-1 text-sm text-foreground">
              <p className="font-semibold">{place.name}</p>
              <p>{place.label}</p>
              {place.address ? <p>{place.address}</p> : null}
              {place.phone ? (
                <a href={`tel:${place.phone.replace(/[^\d+]/g, "")}`} className="font-semibold text-action">
                  {place.phone}
                </a>
              ) : null}
              {place.email ? (
                <a href={`mailto:${place.email}`} className="font-semibold text-action">
                  {place.email}
                </a>
              ) : null}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
