/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/applications',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
