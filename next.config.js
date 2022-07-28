/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cloudinary.images-iherb.com', 'ec2-3-38-255-41.ap-northeast-2.compute.amazonaws.com:8080/api/rest']
  }
}

module.exports = nextConfig
