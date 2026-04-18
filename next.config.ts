import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for @opennextjs/cloudflare: disables the Node.js server
  // (Cloudflare Workers handles routing via the adapter)
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'v.ynet.co.il', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;
