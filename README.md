# Durga Puja 2026

An accessible, server-first foundation for a cinematic Durga Puja 2026 digital experience.

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Structure

- `src/app` — App Router entry points, metadata, and global styles
- `src/components/layout` — persistent page chrome
- `src/components/sections` — independently composable page sections
- `src/components/ui` — container, section, and type primitives
- `src/components/effects` — isolated client-only motion and scrolling effects
- `src/data/festival.ts` — central festival configuration
- `src/hooks`, `src/lib`, `src/types` — shared utilities and contracts

Read the architectural decision in `docs/adr/0001-landing-page-foundation.md` before adding a visual runtime or a new site-wide provider.

## Production configuration

Set `NEXT_PUBLIC_SITE_URL` at build time to the final HTTPS origin. It is intentionally blank in [.env.example](.env.example): local and preview builds must not publish a canonical URL, sitemap URL, or indexable robots directive.

```bash
NEXT_PUBLIC_SITE_URL=https://<your-production-domain>
```

The release routes are provided by the App Router:

- `/robots.txt` permits crawling and points to `/sitemap.xml` only when the public site URL is configured.
- `/sitemap.xml` contains the home route only when the public site URL is configured.
- `/manifest.webmanifest` supplies the dark standalone web-app metadata without referencing missing icon files.

## Asset handoff before launch

Do not publish social or icon metadata until the corresponding commissioned assets are available. Add the final files at these Next.js conventions, then wire them into the manifest/metadata as appropriate:

- `public/og/durga-puja-2026-og.jpg` — 1200 × 630 social preview. Its path is already prepared in the SEO configuration and activates once `NEXT_PUBLIC_SITE_URL` is set.
- `src/app/favicon.ico` — browser favicon.
- `src/app/icon.png` — 512 × 512 web-app icon.
- `src/app/apple-icon.png` — 180 × 180 Apple touch icon.

The hero and journey artwork components also accept optimized local image imports when commissioned visual assets are ready. Verify the configured festival contact address before launch.
