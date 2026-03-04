import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 根据部署平台选择配置
  ...(process.env.DEPLOY_TARGET === 'github-pages' ? {
    // GitHub Pages 配置
    output: 'export',
    basePath: '/Career-Decision-Lab',
    assetPrefix: '/Career-Decision-Lab',
    trailingSlash: true,
  } : process.env.DEPLOY_TARGET === 'netlify' || process.env.DEPLOY_TARGET === 'cloudflare' ? {
    // Netlify 和 Cloudflare Pages 配置
    output: 'export',
    trailingSlash: true,
  } : {
    // Vercel 配置（默认）
    // Vercel 自动处理，不需要特殊配置
  }),

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
