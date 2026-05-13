import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  // GitHub Pages uses repo name as path prefix
  basePath: "/ui-reference-hub",

  images: {
    unoptimized: true,
  },

  trailingSlash: false,

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
