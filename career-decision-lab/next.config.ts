import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/career-decision-lab',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
