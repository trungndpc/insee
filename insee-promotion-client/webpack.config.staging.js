const webpack = require('webpack');
const autoprefixer = require('autoprefixer')
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const config = require('./src/config/staging');

const CSSModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: 'z_[hash:base64:8]__[sha1:hash:hex:4]'
  }
}

const CSSLoader = {
  loader: 'css-loader',
  options: {
    modules: false
  }
}

// const postCSSLoader = {
//   loader: 'postcss-loader',
//   options: {
//     ident: 'postcss',
//     sourceMap: true,
//     plugins: () => [
//       autoprefixer({
//         overrideBrowserslist: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
//       })
//     ]
//   }
// }

const postCSSLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    sourceMap: true
  }
}


const version = "1.0.0.0";

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.png', '.jpg', '.gif', '.jpeg']
  },
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.join(__dirname, "build"),
    filename: `main-${version}.js`,
    publicPath: "/"
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      // {
      //   test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
      //   use: [{
      //     loader: "file-loader",
      //     options: {
      //       name: "[name].[ext]",
      //       // outputPath: './fonts',
      //       // publicPath: '/static/fonts'
      //       outputPath: './fonts',
      //       publicPath: 'https://stc-ai-developers.zdn.vn/fonts'
      //     }
      //   }]
      // },
      // { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?name=fonts/[name].[ext]' },
      { test: /\.svg$/, loader: 'url-loader' },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          CSSLoader,
          postCSSLoader,
          'sass-loader',
        ]
      },
      {
        test: /\.module\.scss$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          CSSModuleLoader,
          postCSSLoader,
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          // require.resolve('style-loader'),
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  overrideBrowserslist: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9' // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009'
                })
              ]
            }
          },
        ]
      },
      // {
      //   test: /\.(jpg|jpeg|png|gif|mp3|wav)$/,
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         name: "[name].[ext]",
      //         publicPath: '/static/image/',
      //         outputPath: './image'
      //       }
      //     },
      //   ]
      // },
      {
				test: /\.(jpg|jpeg|png|gif)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							publicPath: '/static/image/',
							outputPath: './image'
						}
					},
				]
      },
      {
				test: /\.(|mp4)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							publicPath: '/static/videos/',
							outputPath: './videos'
						}
					},
				]
			},
			{
				test: /\.(|mp3|wav)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							publicPath: '/static/audio/',
							outputPath: './audio'
						}
					},
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: "[name].[ext]",
              outputPath: './fonts',
              publicPath: '/static/fonts'
							// publicPath: 'https://stc-ai-developers.zdn.vn/fonts/'
						}
					}
				]
			},
    ]
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true
  },
  plugins: [
    new webpack.DefinePlugin(config),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "src", "index.html")
    }),
    new MiniCssExtractPlugin({
      filename: `main-${version}.css`,
    }),
    new CopyPlugin([
      { from: 'assets' }
    ])
  ]
};