import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
  reactStrictMode: true,
  images: {
    domains: [
      'cdn.vinhlong.dcs.vn',
      'cms-media-vinhlong.ngn.vn',
      'cms-api-vinhlong.ngn.vn',
      'cms-api-media-vinhlong.ngn.vn',
      'cmsapi.vinhlong.dcs.vn',
      'mediacdn.vinhlong.dcs.vn',
    ],
    minimumCacheTTL: 86400,
    loader: 'default',
    path: 'https://cdn.vinhlong.dcs.vn/_next/image',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms-api-vinhlong.ngn.vn',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'cms-api-media-vinhlong.ngn.vn',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'cmsapi.vinhlong.dcs.vn',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'mediacdn.vinhlong.dcs.vn',
        pathname: '/media/**',
      },
      // {
      //   protocol: 'https',
      //   hostname: 'mediacdn.vinhlong.dcs.vn',
      //   pathname: '/**',
      // },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
