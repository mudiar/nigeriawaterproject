import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/ebueneki-villaage", destination: "/ebueneki-village", permanent: true },
      { source: "/general-5", destination: "/urhokuosa", permanent: true },
      { source: "/new-dropdown", destination: "/urhokuosa", permanent: true },
    ];
  },
};

export default nextConfig;
