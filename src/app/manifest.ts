import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MR InfinityX | Target Marketplace Services",
    short_name: "MR InfinityX",
    description:
      "Target Platform product SEO, ratings, reviews, keyword analysis, and content management services.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#00aa7a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
