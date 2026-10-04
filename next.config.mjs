/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { outputFileTracingIncludes: { '/api/download': ['./private/AI-Creator-Kit-v2.zip'], '/api/create-order': ['./private/AI-Creator-Kit-v2.zip'] } },
};

export default nextConfig;
