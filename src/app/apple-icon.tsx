import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: 40,
        }}
      >
        <svg width="132" height="132" viewBox="0 0 64 64" fill="none">
          <path
            d="M51 22.8a6 6 0 0 0-3-5.2L35 10.2a6 6 0 0 0-6 0l-13 7.4a6 6 0 0 0-3 5.2v18.4a6 6 0 0 0 3 5.2l13 7.4a6 6 0 0 0 6 0l13-7.4a6 6 0 0 0 3-5.2Z"
            stroke="#00aa7a"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m14 21 18 11 18-11"
            stroke="#00aa7a"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M32 54V32"
            stroke="#00aa7a"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
