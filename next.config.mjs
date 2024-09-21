/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["shiki"],
  typescript: {
    ignoreBuildErrors: true, // check this in github actions
  },
  eslint: {
    ignoreDuringBuilds: true, // check this in github actions
  },
};

export default nextConfig;
