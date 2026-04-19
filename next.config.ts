import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Required for GitHub Pages static export
  images: {
    unoptimized: true, // Required for static export (disables Next.js server-side image optimization)
    remotePatterns: [
      { protocol: 'https', hostname: 'v.ynet.co.il', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;
