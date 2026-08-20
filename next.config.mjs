/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
};
export default nextConfig;
