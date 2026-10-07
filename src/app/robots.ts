import type { MetadataRoute } from "next";

import { getSiteUrl, isIndexableSite, siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexableSite || !siteUrl) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: getSiteUrl("/sitemap.xml"),
    host: siteUrl.origin,
  };
}
