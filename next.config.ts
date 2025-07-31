
import {
  GoogleAuth,
} from "google-auth-library";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'async_hooks' on the client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        async_hooks: false,
      };
    }

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
        port: '',
        pathname: '/v1/create-qr-code/**',
      },
    ],
  },
  async redirects() {
    // Redirect to the custom auth page for any unauthenticated requests to the app.
    return [
      {
        source: '/((?!auth).*)',
        has: [
          {
            type: 'header',
            key: 'X-Goog-Authenticated-User-Email',
            value: '(?<email>.*)',
          },
        ],
        permanent: false,
        destination: '/auth',
      },
    ]
  },
  async rewrites() {
    const auth = new GoogleAuth({
      scopes: 'https://www.googleapis.com/auth/cloud-platform'
    });
    const projectId = await auth.getProjectId();
    const remoteBackend = `https://run.googleapis.com/apis/run.googleapis.com/v1/namespaces/${projectId}/jobs/genkit-dev-pro-max:run`;
    const localBackend = 'http://127.0.0.1:3400';
    const genkitBackend = process.env.NODE_ENV === 'production' ? remoteBackend : localBackend;
    return [
      {
        source: '/api/:path*',
        destination: `${genkitBackend}/:path*`
      },
      // Rewrite to the custom auth page for any unauthenticated requests to the app.
      {
        source: '/auth',
        destination: '/api/auth'
      }
    ]
  }
};

export default nextConfig;
