const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const config = require('./app/config/production');
const version = "1.1.4";
const public_static = "https://nhathau.insee.com.vn/static/";

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

const postCSSLoader = {
	loader: 'postcss-loader',
	options: {
		ident: 'postcss',
		sourceMap: true,
		plugins: () => [
			require('cssnano'),
			require('autoprefixer'),
		]
	}
}

module.exports = {
	resolve: {
		extensions: ['.js', '.jsx', '.css', '.png', '.jpg', '.gif', '.jpeg']
	},
	mode: 'production',
	devtool: 'source-map',
	entry: path.join(__dirname, "app", "index.js"),
	output: {
		path: path.join(__dirname, "build"),
		filename: `main-${version}.js`,
		chunkFilename: `[name]-main-${version}.js`,
		publicPath: "/static/"
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
			{ test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?name=fonts/[name].[ext]' },
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
								require('cssnano'),
								require('autoprefixer'),
							]
						}
					},
				]
			},
			{
				test: /\.(jpg|jpeg|png|gif)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							publicPath: public_static + "images/",
							outputPath: './images'
						}
					},
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: "[name].[ext]",
							outputPath: './fonts',
							publicPath: public_static
						}
					}
				]
			},
		]
	},
	plugins: [
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new webpack.DefinePlugin(config),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: path.join(__dirname, "public", "index.ejs")
		}),
		new MiniCssExtractPlugin({
			filename: `main-${version}.css`,
		}),
		new CopyPlugin([
			{ from: 'assets' }
		])
	]
};