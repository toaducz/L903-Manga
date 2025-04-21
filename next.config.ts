import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/img/:path*',
        destination: '/api/image?url=:path*' // Chuyển tiếp ảnh
      }
    ]
  },
  images: {
    domains: ['mangadex.network'], // wildcard không được dùng ở đây
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.mangadex.network' // hỗ trợ subdomain động
      }
    ]
  }
}

export default nextConfig
