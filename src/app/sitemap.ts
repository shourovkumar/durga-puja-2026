import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const homeUrl = getSiteUrl("/");

  if (!homeUrl) {
    return [];
  }

  return [
    {
      url: homeUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
