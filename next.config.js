/** @type {import('next').NextConfig} */
const withAntdLess = require('next-plugin-antd-less');

const nextConfig = {
  reactStrictMode: true,

  env: {
    REST_API_KEY: process.env.REST_API_KEY,
    REDIRECT_URL: process.env.REDIRECT_URL,
    BACKEND: process.env.BACKEND,
  },
};

module.exports = withAntdLess({
  lessVarsFilePath: './styles/variables.less',
  ...nextConfig,
  webpack(config) {
    return config;
  },
});
