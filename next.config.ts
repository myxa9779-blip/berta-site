import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingIncludes: {
    "/*": ["./node_modules/.pnpm/@libsql+{darwin,linux,win32}-*/**/*", "./node_modules/.pnpm/libsql@*/node_modules/@libsql/**/*"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/production/panoramic", destination: "/products/f50", permanent: true },
      { source: "/production/windows", destination: "/products", permanent: true },
      { source: "/production/doors", destination: "/products", permanent: true },
      { source: "/production/portals", destination: "/products", permanent: true },
    ];
  },
};

export default withPayload(nextConfig);
