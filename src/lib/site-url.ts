const publicProtocols = new Set(["https:"]);

/**
 * Reads the canonical public origin from the build environment. A missing or
 * non-HTTPS value intentionally leaves the site non-indexable, avoiding
 * accidental canonical URLs, sitemaps, or robots directives for local builds.
 */
function getConfiguredSiteUrl(value = process.env.NEXT_PUBLIC_SITE_URL): URL | undefined {
  if (!value?.trim()) {
    return undefined;
  }

  try {
    const url = new URL(value.trim());

    if (!publicProtocols.has(url.protocol) || url.username || url.password) {
      return undefined;
    }

    url.pathname = "/";
    url.search = "";
    url.hash = "";

    return url;
  } catch {
    return undefined;
  }
}

export const siteUrl = getConfiguredSiteUrl();
export const isIndexableSite = siteUrl !== undefined;

export function getSiteUrl(path = "/") {
  return siteUrl ? new URL(path, siteUrl).toString() : undefined;
}
