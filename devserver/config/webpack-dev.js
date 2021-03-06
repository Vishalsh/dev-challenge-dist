const webpack = require('webpack')
const merge = require('lodash.merge')
const path = require('path');
const commonConfig = require('./webpack-common')
const eslintDev = require('./eslint-dev.json')
const eslintCommon = require('./eslint-common.json')
const serveDirectory = process.cwd()

const eslintConfig = merge(eslintCommon, eslintDev)
const includes = [path.join(serveDirectory, 'es6')]

module.exports = function(entries, output) {
  const devConfig = merge(commonConfig(entries, output, includes), {
    environment: 'dev',
    module: {
      preLoaders: [
        {
          test: /\.js$/,
          loader: "eslint",
          query: eslintConfig,
          include: includes
        }
      ]
    },
    devServer: {
      contentBase: output,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST || "localhost",
      port: process.env.PORT || 8011
    },
    devtool: 'eval-source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })

  return devConfig
}