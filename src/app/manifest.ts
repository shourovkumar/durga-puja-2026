import type { MetadataRoute } from "next";

import { festival } from "@/data/festival";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: festival.seo.title,
    short_name: festival.shortName,
    description: festival.seo.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#080707",
    theme_color: "#080707",
    lang: "en",
  };
}
