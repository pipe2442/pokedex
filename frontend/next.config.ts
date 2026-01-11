import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com", // 👈 Cambia esto por el dominio de tus fotos
        port: "",
        pathname: "/**", // Permite todos los paths bajo ese dominio
      },
    ],
  },
};

export default nextConfig;
