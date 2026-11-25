import type { NextConfig } from "next";

const isBlurEnabled = process.env.enable_blur?.trim().toLowerCase() !== "false";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_ENABLE_HIRE: process.env.enable_hire ?? "true",
    NEXT_PUBLIC_ENABLE_BLUR: process.env.enable_blur ?? "true",
    NEXT_PUBLIC_PROJECT_TITLE: isBlurEnabled
      ? "Confidential App"
      : "Ebony E-Direct",
    NEXT_PUBLIC_PROJECT_2_TITLE: isBlurEnabled
      ? "Confidential App"
      : "FaceViz",
  },
  experimental: {
    agentFeedback: true,
    agentUpgrade: "security",
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
