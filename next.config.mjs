/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './imageLoader.js',
  },
  env: {
    IMAGE_URL: process.env.IMAGE_URL,
  },
};

export default nextConfig;
