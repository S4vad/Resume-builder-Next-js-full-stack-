import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
//added for removing error when fetching google image through <Image/>
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;
