/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'docs', // ← GitHub Pages で /docs を使うための出力先指定
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/ESP32WebApp' // ← GitHub リポジトリ名に合わせて
};

module.exports = nextConfig;
