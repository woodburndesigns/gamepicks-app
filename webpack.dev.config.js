const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  devServer: {
    publicPath: '/build/',
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    inline: true,
    lazy: false,
  },
  entry: {
    app: [
      path.join(__dirname, 'source/js/index.js'),
    ],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'es2015',
              'react',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('app.css'),
    new CopyWebpackPlugin([{ from: 'source/images', to: path.join(__dirname, 'build/images') }])
  ],
};

module.exports = config;
