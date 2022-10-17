/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api-server.beehealer.ml', 'healerbee-dev.s3.ap-northeast-2.amazonaws.com', 'cloudinary.images-iherb.com']
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  env: {
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY
  }
}

module.exports = nextConfig
