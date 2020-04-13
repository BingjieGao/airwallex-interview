/* config-overrides.js */
const { override, overrideDevServer, addWebpackAlias} = require('customize-cra');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const path = require('path')
const devServerConfig = () => config => {
  return {
    ...config,
    compress: true,
    proxy: {
      '/login': {
        target: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com',
        changeOrigin: true,
        pathRewrite: {
          '^/login': '/prod/fake-auth',
        },
      }
    }
  }
}
const webpackOverrides = (config, env) => {
  config.plugins.push(
    new CompressionWebpackPlugin({
      test: /\.js$|\.css$/,
      threshold: 1024,
    }),
  )
  return config;
}
module.exports = {
  webpack: override(
      webpackOverrides,
      addWebpackAlias({
        ['@']: path.resolve(__dirname, 'src')
      }),
    ),
    devServer: overrideDevServer(devServerConfig())
}
