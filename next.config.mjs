import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  trailingSlash: true,

  async redirects() {
    return [
      {
        source: '/ua/:path*',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
