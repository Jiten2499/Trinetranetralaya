"use client";

import { Component, useCallback, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import type { ClinicMapPlace, ClinicMapProps } from "@/lib/map";
import { Button } from "@/components/ui/button";

const LeafletClinicMap = dynamic(() => import("./LeafletClinicMap"), {
  ssr: false,
  loading: () => <MapStatus title="Loading map" message="The clinic map is loading." fill />,
});

interface MapBoundaryProps {
  children: ReactNode;
  onError: () => void;
}

class MapBoundary extends Component<MapBoundaryProps, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true };
  }

  componentDidCatch(): void {
    this.props.onError();
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export function ClinicMap({ places, tileProvider, tileUrl, tileAttribution }: ClinicMapProps) {
  const pinned = places.filter((place) => place.latitude !== null && place.longitude !== null);
  const [attempt, setAttempt] = useState(0);
  const [phase, setPhase] = useState<"loading" | "ready" | "failed">(pinned.length > 0 ? "loading" : "failed");
  const handleReady = useCallback(() => setPhase("ready"), []);
  const handleFailure = useCallback(() => setPhase("failed"), []);

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow)]" aria-label="Clinic locations">
      <div className="border-b border-border bg-background-secondary px-4 py-4">
        <h2 className="text-2xl">Clinic locations</h2>
      </div>
      <div className="relative h-80 md:h-[28rem]" data-tile-provider={tileProvider}>
        {pinned.length === 0 ? (
          <MapStatus
            title="Map awaiting clinic coordinates"
            message="Add each location’s latitude and longitude in the site configuration. A pin is shown only for a confirmed door, not for a whole town or ward."
          />
        ) : phase === "failed" ? (
          <MapStatus
            title="Map could not be loaded"
            message="The clinic map did not load. You can try again, or use Get Directions for either location."
            fill
            onRetry={() => {
              setPhase("loading");
              setAttempt((value) => value + 1);
            }}
          />
        ) : (
          <MapBoundary onError={handleFailure}>
            {phase === "loading" ? <MapStatus title="Loading map" message="The clinic map is loading." overlay /> : null}
            <LeafletClinicMap
              key={attempt}
              places={pinned}
              tileUrl={tileUrl}
              tileAttribution={tileAttribution}
              onReady={handleReady}
              onFailure={handleFailure}
            />
          </MapBoundary>
        )}
      </div>
      <ul className="grid gap-3 border-t border-border p-4 sm:grid-cols-2">
        {places.map((place) => (
          <LocationCard key={place.id} place={place} pinned={place.latitude !== null && place.longitude !== null} />
        ))}
      </ul>
    </section>
  );
}

function LocationCard({ place, pinned }: { place: ClinicMapPlace; pinned: boolean }) {
  return (
    <li className="rounded-xl border border-border bg-background-secondary p-4">
      <p className="text-sm font-semibold uppercase tracking-wide text-muted">{place.label}</p>
      <p className="mt-1 font-semibold">{place.name}</p>
      {place.address ? <p className="mt-2 text-sm text-muted">{place.address}</p> : null}
      {place.phone ? <p className="mt-2 text-sm">{place.phone}</p> : null}
      {!pinned ? (
        <p className="mt-2 text-sm text-muted">This address is listed. A map pin is added only after the door’s coordinates are confirmed.</p>
      ) : null}
      {place.directionsUrl ? (
        <Button href={place.directionsUrl} external size="sm" className="mt-4">
          Get Directions
        </Button>
      ) : null}
    </li>
  );
}

function MapStatus({
  title,
  message,
  onRetry,
  overlay = false,
  fill = false,
}: {
  title: string;
  message: string;
  onRetry?: () => void;
  overlay?: boolean;
  fill?: boolean;
}) {
  return (
    <div
      className={
        overlay
          ? "pointer-events-none absolute inset-0 z-10 flex items-center bg-background-secondary/95 p-8"
          : fill
            ? "flex h-full min-h-80 items-center bg-background-secondary p-8"
            : "flex min-h-80 items-center bg-background-secondary p-8"
      }
      role="status"
    >
      <div>
        <h3 className="text-xl">{title}</h3>
        <p className="mt-3 max-w-xl text-muted">{message}</p>
        {onRetry ? (
          <Button type="button" variant="outline" className="mt-5" onClick={onRetry}>
            Try again
          </Button>
        ) : null}
      </div>
    </div>
  );
}
