/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REST_API_KEY: process.env.REST_API_KEY,
    REDIRECT_URL: process.env.REDIRECT_URL,
    BACKEND: process.env.BACKEND,
  },
};

module.exports = nextConfig;
