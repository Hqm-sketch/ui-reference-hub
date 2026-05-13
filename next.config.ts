import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages / Cloudflare Pages deployment
  // output: "export",

  // Set basePath if deploying to GitHub Pages project site (not user site)
  // basePath: "/ui-reference-hub",

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Trailing slash for static hosting compatibility
  trailingSlash: false,

  // Skip TypeScript type checking during build to avoid OOM
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
