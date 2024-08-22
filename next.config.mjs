import createNextIntlPlugin from 'next-intl/plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import withPWAInit from "@ducanh2912/next-pwa";


const withNextIntl = createNextIntlPlugin();
const withPWA = withPWAInit({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
});
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
      config.plugins.push(
        new ESLintPlugin({
          context: './', // Location where it will scan all the files
          extensions: ['js', 'jsx', 'ts', 'tsx'], // File formats that should be scanned
          exclude: ['node_modules', 'dist'], // Exclude everything in these folders
        })
      );
      return config;
    }
    
};

export default withPWA(withNextIntl(nextConfig));
