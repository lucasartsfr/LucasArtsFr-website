/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com', "api.lucasarts.fr", "cdn.lucasarts.fr", "lucasarts.fr" ,"theme.lucasarts.fr", "projects.lucasarts.fr"],
    formats: ['image/avif', 'image/webp'],
    imageSizes: [16, 32, 48, 64],
    unoptimized : false,
  },
  transpilePackages: ['next-circular-menu','styled-components'],
}

module.exports = nextConfig
