import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Campusnotes",
    short_name: "Campusnotes",
    description:
      "Premium notes for Delhi University, board exams and government exams.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFDF7",
    theme_color: "#2563EB",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}