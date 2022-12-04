/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {},
  compiler: {
    emotion: true,
  },
  images: {
    domains: [
      'picsum.photos',
      'example.com',
      'lh3.googleusercontent.com',
      'imagedelivery.net',
      'images.unsplash.com',
    ],
  },
}

module.exports = nextConfig
