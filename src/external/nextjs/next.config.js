const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// eslint-disable-next-line
module.exports = withBundleAnalyzer({
  distDir: 'build', // Delete this line IF deploying to Vercel instead of ECS
  swcMinify: true,
  experimental: {
    externalDir: true,
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: 'react',
      })
    );

    fixEnums(config);

    return config;
  },
  webpackDevMiddleware: (config) => {
    // Required for HMR to work inside a Docker container
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  },
});
module.exports.env = {
  API_BASE_URL: process.env.API_BASE_URL,
};

function fixEnums(config) {
  config.module.rules.forEach(({ use }, i) => {
    if (!use) return;
    const isBabelLoader = Array.isArray(use)
      ? use.findIndex(
          (item) => item && item.loader && item.loader === 'next-babel-loader'
        ) !== -1
      : use.loader === 'next-babel-loader';
    if (isBabelLoader) {
      delete config.module.rules[i].include;
    }
  });
}
