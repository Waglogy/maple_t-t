import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f9f7da",
    theme_color: "#f45201",
    icons: [
      {
        src: "/logo2.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
