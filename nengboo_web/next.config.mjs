/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
