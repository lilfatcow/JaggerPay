/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, 'bcrypt'];
    return config;
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

if (process.env.NEXT_PUBLIC_TEMPO) {
  nextConfig.experimental = {
    swcPlugins: [[require.resolve("tempo-devtools/swc/0.90"), {}]]
  };
}

module.exports = nextConfig;
