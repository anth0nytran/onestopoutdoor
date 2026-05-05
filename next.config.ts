import type { NextConfig } from "next";

// Security headers — applied to every response. Improves SEO trust signals
// and Google's "page experience" ranking factors, blocks common XSS/clickjacking.
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [],
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/api/:path*', headers: [...securityHeaders, { key: 'X-Robots-Tag', value: 'noindex' }] },
    ];
  },
  // Canonical host: onestopoutdoorconstruction.com (no www).
  // 301-redirect www -> apex to consolidate Google Search Console signals
  // and eliminate duplicate-canonical bleed between www and non-www variants.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.onestopoutdoorconstruction.com' }],
        destination: 'https://onestopoutdoorconstruction.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
