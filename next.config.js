/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ec2-3-38-255-41.ap-northeast-2.compute.amazonaws.com:3000', 'healerbee-dev.s3.ap-northeast-2.amazonaws.com', 'ec2-3-38-255-41.ap-northeast-2.compute.amazonaws.com:8080/api/rest']
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
