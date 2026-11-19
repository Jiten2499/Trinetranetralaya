import { siteConfig } from "@/config/site-config";
import { isHttpUrl } from "@/lib/utils";

const OPENSTREETMAP_TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const OPENSTREETMAP_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export interface ClinicMapLocation {
  latitude: number;
  longitude: number;
}

export interface ClinicMapPlace {
  id: string;
  label: string;
  name: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  phone: string;
  email: string;
  directionsUrl: string | null;
}

export interface ClinicMapProps {
  places: ClinicMapPlace[];
  tileUrl: string;
  tileAttribution: string;
  tileProvider: string;
}

export function getClinicCoordinates(
  latitude: number | null,
  longitude: number | null,
): ClinicMapLocation | null {
  if (latitude === null || longitude === null) return null;
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) return null;
  if (latitude === 0 && longitude === 0) return null;
  return { latitude, longitude };
}

export function isSafeTileUrl(value: string): boolean {
  if (!value.includes("{z}") || !value.includes("{x}") || !value.includes("{y}")) return false;
  const probe = value
    .replaceAll("{s}", "a")
    .replaceAll("{z}", "0")
    .replaceAll("{x}", "0")
    .replaceAll("{y}", "0")
    .replaceAll("{r}", "");
  try {
    return new URL(probe).protocol === "https:";
  } catch {
    return false;
  }
}

export function getMapTiles(): { tileUrl: string; tileAttribution: string; tileProvider: string } {
  const tileProvider = siteConfig.map.mapTileProvider.trim() || "openstreetmap";
  const configuredUrl = siteConfig.map.mapTileUrl.trim();
  const tileUrl = isSafeTileUrl(configuredUrl) ? configuredUrl : OPENSTREETMAP_TILE_URL;
  const tileAttribution = siteConfig.map.mapTileAttribution.trim() || OPENSTREETMAP_ATTRIBUTION;
  return { tileUrl, tileAttribution, tileProvider };
}

export function buildGoogleDirectionsUrl(latitude: number, longitude: number): string {
  const params = new URLSearchParams({
    api: "1",
    destination: `${latitude},${longitude}`,
  });
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export function getMapPlaces(): ClinicMapPlace[] {
  return siteConfig.map.locations.map((place) => {
    const location = getClinicCoordinates(place.latitude, place.longitude);
    const explicit = place.directionsUrl.trim();
    const directionsUrl = isHttpUrl(explicit)
      ? explicit
      : location
        ? buildGoogleDirectionsUrl(location.latitude, location.longitude)
        : null;
    return {
      id: place.id,
      label: place.label.trim() || place.name.trim() || siteConfig.name,
      name: place.name.trim() || siteConfig.name,
      address: place.address.trim(),
      latitude: location?.latitude ?? null,
      longitude: location?.longitude ?? null,
      phone: place.phone.trim(),
      email: place.email.trim(),
      directionsUrl,
    };
  });
}

export function getConfiguredDirectionsUrl(): string | null {
  const explicit = siteConfig.contact.directionsUrl.trim();
  if (isHttpUrl(explicit)) return explicit;
  return getMapPlaces().find((place) => place.directionsUrl)?.directionsUrl ?? null;
}

export function getDefaultClinicMapProps(): ClinicMapProps {
  return {
    places: getMapPlaces(),
    ...getMapTiles(),
  };
}
