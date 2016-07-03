const webpack = require('webpack')
const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const production = process.env.NODE_ENV === 'production'
const ENV = process.env.npm_lifecycle_event

const browserConfig = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  output: {
    path: './dist',
    devtoolModuleFilenameTemplate: '/[absolute-resource-path]',
    filename: production ? 'js/[name].[hash].js' : 'js/[name].js',
    chunkFilename: production ? '[id].[hash].chunk.js' : '[id].chunk.js',
    publicPath: production ? '/' : 'http://localhost:4000/',
  },

  debug: !production,
  devtool: production ? 'source-map' : 'eval-source-map',

  devServer: {
    contentBase: './src',
    historyApiFallback: true,
    stats: 'minimal',
  },

  module: {
    loaders: [
      {
        test: /\.[tj]s$/,
        exclude: /node_modules/,
        loaders: [
          'babel?' + JSON.stringify({
            presets: [
              require.resolve('babel-preset-es2015'),
              require.resolve('babel-preset-stage-2'),
            ],
          }),
          'awesome-typescript-loader',
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'raw',
          'postcss',
        ],
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
    ],
  },

  resolve: {
    extensions: ['', '.ts', '.js', '.scss', '.html'],
    modulesDirectories: ['node_modules', path.resolve('./node_modules')],
  },
  plugins: [
    new webpack.DefinePlugin({
      // Environment helpers
      'process.env': {
        ENV: JSON.stringify(ENV)
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
        template: './src/index.html',
        chunksSortMode: 'dependency'
      }),

    new ExtractTextPlugin('css/[name].[hash].css', {disable: !production})
  ],
  postcss: webpack => ({
    plugins: [
      require('postcss-strip-inline-comments'),
      require('postcss-easy-import')({
        addDependencyTo: webpack,
        path: ['node_modules/*.scss', path.resolve('./node_modules'), ''],
        extensions: ['.scss', '.css'],
      }),
      require('precss')({import: {disable: true}}),
      require('postcss-calc'),
      require('autoprefixer'),
    ],
    syntax: require('postcss-scss'),
  }),
}

if (production) {
  browserConfig.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new CopyWebpackPlugin([{
      from: './src',
      ignore: [
        '*.ts',
        '*.scss',
      ],
    }])
  )
}

module.exports = [browserConfig]
