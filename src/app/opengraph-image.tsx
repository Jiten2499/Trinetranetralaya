import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "TriNetra Netralaya";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFF9F3",
          color: "#18324B",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, color: "#C44718" }}>EYE CARE</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, lineHeight: 1.05 }}>TriNetra Netralaya</div>
          <div style={{ marginTop: 20, fontSize: 32, color: "#66717B" }}>Better Vision. Brighter Everyday.</div>
        </div>
        <div style={{ height: 12, width: 180, background: "#E66A35" }} />
      </div>
    ),
    size,
  );
}
