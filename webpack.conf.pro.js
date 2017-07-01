/**
 * @Author: woolson
 * @Date:   2017-06-10 22:06:00
 * @Email:  woolson.lee@gmail.com
 * @Last modified by:   woolson
 * @Last modified time: 2017-06-12 21:06:69
 */

var path = require("path")
var webpack = require("webpack")
var merge = require("webpack-merge")
var baseWebapckConfig = require("./webpack.conf.base")
var HTMLWebpackPlugin = require("html-webpack-plugin")
var OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = merge(baseWebapckConfig, {
  output: {
    filename: "js/[name].[chunkhash].js",
    chunkFilename: "js/[id].[chunkhash].js",
  },
  devtool: false,
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: true,
    }),
    new ExtractTextPlugin({
      filename: "css/[name].[contenthash].css",
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
      },
    }),
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: "index.html",  
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      chunksSortMode: "dependency",
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: function(module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, "node_modules")) === 0
        )
      },
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      chunks: ["vendor"],
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "static"),
        to: path.join(__dirname, "dist", "static"),
        ignore: [".*"],
      },
    ]),
  ],
})
