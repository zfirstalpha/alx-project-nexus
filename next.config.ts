import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import type { NextConfig } from "next";
//import type { Configuration } from "webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig: NextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "upload.wikimedia.org",
      "cdn.pixabay.com",
    ],
  },
  serverExternalPackages: ["mongoose"],
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dbijebcqs",
    NEXT_PUBLIC_CLOUDINARY_PRESET_NAME: "iwo4nmvk",
  } as Record<string, string>,
  /*   webpack: (config: Configuration) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": resolve(__dirname),
      "@/utils": resolve(__dirname, "utils"),
      "@/utils/models": resolve(__dirname, "utils", "models"),
    };
    return config;
  }, */
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
