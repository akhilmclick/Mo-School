import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FF6547 0%, #E0482B 100%)",
          color: "white",
          fontSize: 20,
          fontWeight: 900,
          borderRadius: 8,
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          letterSpacing: "-0.5px",
        }}
      >
        M
      </div>
    ),
    {
      ...size,
    }
  );
}
