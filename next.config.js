/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'images.unsplash.com',
      'images.pexels.com',
      'res.cloudinary.com',
      'maplesserver.vercel.app',
      'maple-server-e7ye.onrender.com'
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'maplesserver.vercel.app',
        port: '',
        pathname: '/uploads/**',
      }
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
