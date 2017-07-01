/**
 * @Author: woolson
 * @Date:   2017-06-10 22:06:00
 * @Email:  woolson.lee@gmail.com
 * @Last modified by:   woolson
 * @Last modified time: 2017-06-12 21:06:65
 */

var path = require("path")
var webpack = require("webpack")
var merge = require("webpack-merge")
var baseWebapckConfig = require("./webpack.conf.base")
var HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = merge(baseWebapckConfig, {
  devtool: "#cheap-module-eval-source-map",
  plugins: [
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true,
    }),
  ],
  devServer: {
    disableHostCheck: true,
    stats: {
      colors: true,
      hash: true,
      version: false,
      timings: true,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      quiet: true,
      errorDetails: true,
      warnings: true,
      publicPath: false,
    },
  },
})
