import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for @opennextjs/cloudflare: disables the Node.js server
  // (Cloudflare Workers handles routing via the adapter)
  devIndicators: false,
};

export default nextConfig;
