/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GITHUB_API: process.env.GITHUB_API,
  },
};

module.exports = nextConfig;
