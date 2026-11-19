import { siteConfig } from "@/config/site-config";
import { hasText, isHttpUrl } from "@/lib/utils";

const OPENSTREETMAP_TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const OPENSTREETMAP_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export interface ClinicMapLocation {
  latitude: number;
  longitude: number;
}

export interface ClinicMapProps {
  clinicName: string;
  address: string;
  phone: string;
  email: string;
  latitude: number | null;
  longitude: number | null;
  directionsUrl: string | null;
  tileUrl: string;
  tileAttribution: string;
  tileProvider: string;
}

export function getClinicCoordinates(
  latitude: number | null = siteConfig.map.latitude,
  longitude: number | null = siteConfig.map.longitude,
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

export function getMapClinicName(clinicName = siteConfig.map.clinicName): string {
  const value = clinicName.trim();
  return value || siteConfig.name;
}

export function getMapAddress(address = siteConfig.map.address): string {
  const specific = address.trim();
  if (specific) return specific;
  return [siteConfig.contact.address, siteConfig.contact.city, siteConfig.contact.country]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(", ");
}

export function buildGoogleDirectionsUrl(latitude: number, longitude: number): string {
  const params = new URLSearchParams({
    api: "1",
    destination: `${latitude},${longitude}`,
  });
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export function getConfiguredDirectionsUrl(): string | null {
  const explicit = siteConfig.map.googleMapsDirectionsUrl.trim() || siteConfig.contact.directionsUrl.trim();
  if (isHttpUrl(explicit)) return explicit;
  const location = getClinicCoordinates();
  if (!location) return null;
  return buildGoogleDirectionsUrl(location.latitude, location.longitude);
}

export function getDefaultClinicMapProps(): ClinicMapProps {
  const location = getClinicCoordinates();
  const phone = hasText(siteConfig.contact.phoneDisplay)
    ? siteConfig.contact.phoneDisplay.trim()
    : siteConfig.contact.phone.trim();

  return {
    clinicName: getMapClinicName(),
    address: getMapAddress(),
    phone,
    email: siteConfig.contact.email.trim(),
    latitude: location?.latitude ?? null,
    longitude: location?.longitude ?? null,
    directionsUrl: getConfiguredDirectionsUrl(),
    ...getMapTiles(),
  };
}
