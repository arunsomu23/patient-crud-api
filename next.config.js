/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone', // Supports API routes & dynamic routing
    trailingSlash: true,
    experimental: {
      serverActions: true,
    },
  };
  
  module.exports = nextConfig;
  