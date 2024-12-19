/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, 'bcrypt'];
    return config;
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig