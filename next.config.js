/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true,
  },
  // Включаем статический экспорт только для продакшн сборки
  // Для локальной разработки закомментируйте следующие строки
  // output: 'export',
  // distDir: 'out',
};

module.exports = nextConfig; 