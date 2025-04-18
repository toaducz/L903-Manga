import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/img/:path*',
        destination: '/api/image?url=:path*', // Chuyển tiếp ảnh
      },
    ];
  },
};

export default nextConfig;
