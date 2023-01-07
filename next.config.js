/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx', 'md', 'src/pages'],
  images: {
    domains: ["react.semantic-ui.com"],
  },
}

module.exports = nextConfig
