import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  // This workspace lives below another package-lock file in OneDrive. Pinning
  // Turbopack to the app root keeps its file graph and build cache scoped here.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
