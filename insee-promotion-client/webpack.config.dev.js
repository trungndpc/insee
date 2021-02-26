const webpack = require('webpack');
const autoprefixer = require('autoprefixer')
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = require('./app/config/development');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.png', '.jpg', '.gif', '.jpeg']
  },
  mode: 'development',
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, "app", "index.js")
  ],
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=images/[name].[ext]' },
      { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
      { test: /(\.css|\.scss|\.sass)$/, loaders: ['style-loader', 'css-loader?sourceMap'] }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(config),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin([
      path.join(__dirname, "node_modules")
    ]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "public", "index.ejs")
    })
  ],
  watch: false,
  watchOptions: {
    aggregateTimeout: 1000,
    poll: 2000,
    ignored: /node_modules/
  },
  devServer: {
    // open: 'Google Chrome',
    contentBase: [path.join(__dirname, 'build'), path.join(__dirname, 'assets')],
    // compress: true,
    port: 3000,
    historyApiFallback: true,
    disableHostCheck: true
  }
}
