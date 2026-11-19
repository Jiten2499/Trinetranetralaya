import { ClinicMap } from "@/components/map/ClinicMap";
import { getDefaultClinicMapProps } from "@/lib/map";

export function MapPanel() {
  return <ClinicMap {...getDefaultClinicMapProps()} />;
}
