import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 只在 GitHub Pages 时启用静态导出和 basePath
  // Vercel 会使用 SSR，不需要这些配置
  ...(process.env.DEPLOY_TARGET === 'github-pages' ? {
    output: 'export',
    basePath: '/Career-Decision-Lab',
    assetPrefix: '/Career-Decision-Lab',
    trailingSlash: true,
  } : {}),

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
