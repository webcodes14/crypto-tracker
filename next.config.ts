import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'coin-images.coingecko.com', // Doména, odkud jdou obrázky mincí
        port: '',
        pathname: '/**', // Povolí všechny cesty na této doméně
      },
    ],
  },
};

export default nextConfig;
