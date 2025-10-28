import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Permite qualquer domínio HTTPS
      },
      {
        protocol: "http",
        hostname: "**", // Permite qualquer domínio HTTP
      },
    ],

    // Ou use a configuração mais simples:
    domains: ["*"], // Permite qualquer domínio
  },
};

export default nextConfig;
