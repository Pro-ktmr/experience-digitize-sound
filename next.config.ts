import type { NextConfig } from "next";

const IS_DEV = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "export",
  basePath: IS_DEV ? "" : "/experience-degitize-sound",
};

export default nextConfig;
