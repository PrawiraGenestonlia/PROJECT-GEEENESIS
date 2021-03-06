const withCSS = require('@zeit/next-css');
const withOffline = require('next-offline');
const withPurgeCSS = require('next-purgecss');
const path = require('path');

module.exports = withCSS(withPurgeCSS(withOffline({
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd-mobile\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]
      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      });
      const prefix = process.env.BASE_PATH || '';
      config.output.publicPath = `${prefix}${config.output.publicPath}`;
    }
    return config
  },
  registerSwPrefix: process.env.BASE_PATH || '',
  // registerSwPrefix: `${process.env.BASE_PATH ? process.env.BASE_PATH + '/_next/static' : ''}`,
  scope: `${process.env.BASE_PATH ? process.env.BASE_PATH : ''}/`,
  workboxOpts: {
    // swDest: process.env.NEXT_EXPORT
    //   ? 'service-worker.js'
    //   : 'public/service-worker.js',
    swDest: process.env.NEXT_EXPORT
      ? 'service-worker.js'
      : path.join(__dirname, "./public/service-worker.js"),
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 200,
          },
        },
      },
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       // source: `${process.env.BASE_PATH ? process.env.BASE_PATH : ''}/service-worker.js`,
  //       source: `^/service-worker.js$`,
  //       destination: `${process.env.BASE_PATH ? process.env.BASE_PATH : ''}/_next/static/service-worker.js`,
  //     },
  //   ]
  // },
  // experimental: {
  //   async rewrites() {
  //     return [
  //       {
  //         source: `${process.env.BASE_PATH ? process.env.BASE_PATH : ''}/service-worker.js`,
  //         destination: `${process.env.BASE_PATH ? process.env.BASE_PATH : ''}/_next/static/service-worker.js`,
  //       },
  //     ]
  //   },
  // },
  assetPrefix: process.env.BASE_PATH || '',
  basePath: process.env.BASE_PATH || '',
  publicRuntimeConfig: {
    basePath: process.env.BASE_PATH || '',
  },
  purgeCss: {
    purgeCssEnabled: ({ dev, isServer }) => !dev && !isServer, // Only enable PurgeCSS for client-side production builds
    whitelistPatternsChildren: [/am/] //whitelist ant design
  }
})));
