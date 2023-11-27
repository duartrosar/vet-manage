/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "6mrno41hlepayu9s.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

// https://source.unsplash.com/random/?person+face

module.exports = nextConfig;
