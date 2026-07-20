import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "LingoCon — The connected workspace for constructed languages"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#000000",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              background: "#000000",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: 700,
              borderRadius: "4px",
            }}
          >
            L
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: "76px",
              fontWeight: 600,
              letterSpacing: "-2.5px",
              lineHeight: 1.05,
              maxWidth: "900px",
              display: "flex",
            }}
          >
            The connected workspace for constructed languages.
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 400,
              color: "#666666",
              letterSpacing: "-0.5px",
              display: "flex",
              gap: "24px",
              alignItems: "center",
            }}
          >
            <span>LingoCon</span>
            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#cccccc" }} />
            <span>lingocon.com</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
