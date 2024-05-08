/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "whrmaertzkkanlgksexz.supabase.co",
      },
    ],
  },
};

export default nextConfig;
