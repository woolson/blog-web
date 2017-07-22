/*
 * @Author: woolson
 * @Date:   2017-06-10 22:06:00
 * @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2017-07-22 18:07:73
 */

var path = require("path")
var webpack = require("webpack")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")

const isProduction = process.env.NODE_ENV === "production"

var cssLoader = {
  loader: "css-loader",
  options: {
    minimize: isProduction,
  },
}

var styleLoaders = null

// extract text
if(isProduction) {
  styleLoaders = ExtractTextPlugin.extract({
    use: cssLoader,
    fallback: "style-loader",
  })
} else {
  styleLoaders = [
    "style-loader",
    cssLoader,
  ]
}

if(isProduction) {
  styleLoaders.push({
    loader: "postcss-loader",
    options: {
      sourceMap: "inline",
      plugins: function() {
        return [
          require("autoprefixer"),
        ]
      },
    },
  })
}

module.exports = {
  entry: "./src/entry.jsx",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".jsx", ".styl", ".css", ".json"],
    modules: [
      path.join(__dirname, "src", "app", "common"),
      path.join(__dirname, "src", "app"),
      path.join(__dirname, "src"),
      "node_modules",
    ],
    alias: {
      "Static": path.join(__dirname, "static"),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: styleLoaders,
      },
      {
        test: /\.styl$/,
        use: styleLoaders.concat([
          {
            loader: "stylus-loader",
            options: {
              import: [
                path.join(__dirname, "src", "styles", "variables.styl"),
              ],
              paths: [
                path.join(__dirname, "src", "styles"),
              ],
            },
          },
        ]),
      },
      {
        test: /\.json?$/,
        loader: "file-loader",
        options: {
          name: "faker/[name].[hash:7].[ext]",
        },
      },
      {
        test: /\.md?$/,
        use: [
          "html-loader",
          {
            loader: "markdown-loader",
            options: {
              highlight: function(code) {
                return require("highlight.js").highlightAuto(code).value
              }
            }
          },
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "imgs/[name].[hash:7].[ext]",
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "fonts/[name].[hash:7].[ext]",
        },
      },
    ]
  },
  plugins: [
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
  ],
}
