import createNextIntlPlugin from 'next-intl/plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
const withNextIntl = createNextIntlPlugin();

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

export default withNextIntl(nextConfig);
