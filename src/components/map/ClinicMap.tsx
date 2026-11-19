"use client";

import { Component, useCallback, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import type { ClinicMapProps } from "@/lib/map";
import { getClinicCoordinates } from "@/lib/map";
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

export function ClinicMap(props: ClinicMapProps) {
  const location = getClinicCoordinates(props.latitude, props.longitude);
  const [attempt, setAttempt] = useState(0);
  const [phase, setPhase] = useState<"loading" | "ready" | "failed">(location ? "loading" : "failed");
  const handleReady = useCallback(() => setPhase("ready"), []);
  const handleFailure = useCallback(() => setPhase("failed"), []);

  if (!location) {
    return (
      <MapShell clinicName={props.clinicName} directionsUrl={props.directionsUrl}>
        <MapStatus
          title="Map awaiting clinic coordinates"
          message="Add the clinic’s latitude and longitude in the site configuration. The map stays hidden until those coordinates are the clinic’s real location."
        />
      </MapShell>
    );
  }

  return (
    <MapShell clinicName={props.clinicName} directionsUrl={props.directionsUrl}>
      <div className="relative h-80 md:h-[28rem]" data-tile-provider={props.tileProvider}>
        {phase === "failed" ? (
          <MapStatus
            title="Map could not be loaded"
            message="The clinic map did not load. You can try again, or use Get Directions when a location link is available."
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
              {...props}
              latitude={location.latitude}
              longitude={location.longitude}
              onReady={handleReady}
              onFailure={handleFailure}
            />
          </MapBoundary>
        )}
      </div>
    </MapShell>
  );
}

function MapShell({
  clinicName,
  directionsUrl,
  children,
}: {
  clinicName: string;
  directionsUrl: string | null;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow)]" aria-label={`${clinicName} location`}>
      <div className="flex flex-col gap-3 border-b border-border bg-background-secondary px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl">{clinicName}</h2>
        {directionsUrl ? (
          <Button href={directionsUrl} external size="sm" className="w-full sm:w-auto">
            Get Directions
          </Button>
        ) : null}
      </div>
      {children}
    </section>
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
