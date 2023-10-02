const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
  const config = {

  }
  if (isProd) {
    config.minimizer = [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  }
  return config;
}

// const babelOptions = preset => {
//   const options = {
//     presets: [
//       '@babel/preset-env',
//       { targets: "defaults" }
//     ],
//     plugins: [
//       '@babel/plugin-proposal-class-properties'
//     ]
//   }
//   if (preset) {
//     options.presets.push(preset)
//   }

//   return options;
// }

// const jsLoaders = () => {
//   const loaders = [{
//     loader: 'babel-loader',
//     options: babelOptions()
//   }]
//   if (isDev) {
//     // loaders.push('eslint-loader')
//   }
//   return loaders
// }

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.png', '.scss', '.css']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, 'src/assets/images'),
    //       to: path.resolve(__dirname, 'dist/assets')
    //     }
    //   ]
    // }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDev ? '[id].css' : '[id].[hash].css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp|avif)$/i,
        use: [{
          options: {
            outputPath: "assets/"
          },
          loader: "file-loader"
        }]
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        use: ["file-loader"]
      },
      {
        test: /\.svg$/i,
        exclude: /node_modules/,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack', 'file-loader'],
      },
      // {
      //   test: /\.js$/i,
      //   exclude: /node_modules/,
      //   use: jsLoaders()
      // },
      // {
      //   test: /\.ts$/i,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "babel-loader",
      //     options: babelOptions('@babel/preset-typescript') 
      //   }
      // },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/env', '@babel/preset-react'] },
        }
      },
      {
        test: /\.module\.(sa|c)ss$/i,
        use: [
          { loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: "[local]_[hash:base64:5]"
              },
              sourceMap: isDev,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev
            }
          }
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          { loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader },
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        exclude: /\.module.css$/i,
        use: [
          { loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader },
          'css-loader',
        ]
      },
    ],
  },
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    static: {
      directory: path.join(__dirname, './'),
      watch: false,
    },
    // historyApiFallback: { index: "index.html" },
    historyApiFallback: true,
    compress: true,
    port: 3000,
    hot: true,
    open: true
  },
  optimization: optimization(),
}