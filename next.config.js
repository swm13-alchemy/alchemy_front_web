/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api-server.beehealer.ml', 'healerbee-dev.s3.ap-northeast-2.amazonaws.com']
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
