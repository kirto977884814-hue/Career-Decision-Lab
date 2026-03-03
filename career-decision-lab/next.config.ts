import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // 启用静态导出
  images: {
    unoptimized: true, // GitHub Pages 不支持 Next.js Image Optimization
  },
  // 配置基础路径
  basePath: process.env.NODE_ENV === 'production' ? '/Career-Decision-Lab' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Career-Decision-Lab' : '',
};

export default nextConfig;
