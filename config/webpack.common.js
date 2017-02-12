const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const SassLintPlugin = require('sasslint-webpack-plugin');

const helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['.js', '.ts']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader', 'angular2-template-loader', 'angular2-router-loader']
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css?sourceMap' })
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        use: 'raw'
      },
      {
        test: /\.(scss|sass)$/,
        include: helpers.root('src', 'app'),
        use: [
          'raw-loader',
          'postcss-loader',
          'sass-loader',
          {
            loader: 'prepend-loader',
            query:
            {
              data: `@import "${ helpers.root('src/assets/styles/themes/cupido') }";`
            }
          }
        ]
      }
    ]
  },

  plugins: [

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'favicon.ico',
    }),

    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      __dirname
    ),

    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    }),

    new SassLintPlugin({
      context: helpers.root('src', 'app')
    })
  ]
};
