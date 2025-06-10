
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { SourceMapDevToolPlugin } = require("webpack");

const prod = process.env.NODE_ENV === 'production'

 module.exports = {
  mode: prod ? 'production' : 'development',
  devtool: prod ? undefined : 'source-map',
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          target: 'esnext',
          jsx: 'automatic',
        },
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json', '.scss'],
          plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, 'tsconfig.json') })],
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },{
        test: /\.m?js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.(?:ico|png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      // favicon: path.resolve(__dirname, './public/favicon.ico'),
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new CleanWebpackPlugin(),
    new SourceMapDevToolPlugin({
      filename: "[file].map"
    }),
  ],
  devServer: {
    static: path.join(__dirname, './src'),
    port: 3001,
    hot: true,
    // compress: true,
    // open: true,
    historyApiFallback: true
  },
};
