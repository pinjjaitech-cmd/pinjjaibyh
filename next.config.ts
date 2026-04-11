import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"images.pexels.com",
      },
      {
        protocol:"https",
        hostname:"www.rijac.com",
      },
      {
        protocol:"https",
        hostname:"res.cloudinary.com",
      },
      {
        protocol:"https",
        hostname:"sanova-demo.myshopify.com",
      }
    ]
  }
};

export default nextConfig;
