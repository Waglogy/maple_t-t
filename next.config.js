/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'images.pexels.com',
      'res.cloudinary.com', // Add Cloudinary domain here
    ],
  },
}

module.exports = nextConfig
