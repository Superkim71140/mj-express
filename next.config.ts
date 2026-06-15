import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy HTML page redirects
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/motorcycle-transport.html",
        destination: "/motorcycle-transport",
        permanent: true,
      },
      {
        source: "/portfolio.html",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/contact.html",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/phutthamonthon-transport.html",
        destination: "/areas/phutthamonthon",
        permanent: true,
      },
      {
        source: "/nongkhaem-transport.html",
        destination: "/areas/nong-khaem",
        permanent: true,
      },
      {
        source: "/rama2-bangbon-transport.html",
        destination: "/areas/rama-2",
        permanent: true,
      },
      {
        source: "/phra-nakhon-transport.html",
        destination: "/areas/phra-nakhon",
        permanent: true,
      },
      {
        source: "/samut-sakhon-transport.html",
        destination: "/areas/samut-sakhon",
        permanent: true,
      },
      
      // Dynamic draft paths to clean slugs redirects
      {
        source: "/services/home-moving",
        destination: "/services/moving-house",
        permanent: true,
      },
      {
        source: "/areas/phutthamonthon-transport",
        destination: "/areas/phutthamonthon",
        permanent: true,
      },
      {
        source: "/areas/nongkhaem-transport",
        destination: "/areas/nong-khaem",
        permanent: true,
      },
      {
        source: "/areas/rama2-bangbon-transport",
        destination: "/areas/rama-2",
        permanent: true,
      },
      {
        source: "/areas/phra-nakhon-transport",
        destination: "/areas/phra-nakhon",
        permanent: true,
      },
      {
        source: "/areas/samut-sakhon-transport",
        destination: "/areas/samut-sakhon",
        permanent: true,
      },
      {
        source: "/routes/bangkok-to-chiangmai",
        destination: "/routes/bangkok-to-chiang-mai",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
