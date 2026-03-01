import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com", pathname: "/**" },
      { hostname: "images.pexels.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
