const path = require("path");
const { StatsWriterPlugin } = require("webpack-stats-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";
const patternJsFiles = isProduction ? "[name].[contenthash].js" : "[name].js"
const patternCssFiles = isProduction ? "[name].[contenthash].css" : "[name].css"

module.exports = {
  target: "web",
  mode: process.env.NODE_ENV,
  devtool: "source-map",
  entry: {
    index: "./src/js/index.js",
    sw: "./src/js/sw.js",
  },
  output: {
    filename: `dist/js/${patternJsFiles}`,
    chunkFilename: `dist/js/${patternJsFiles}`,
    path: path.resolve(process.cwd(), "public")
  },
  resolve: {
    extensions: [".js"]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `dist/css/${patternCssFiles}`,
      chunkFilename: `dist/css/${patternCssFiles}`
    }),
    new StatsWriterPlugin({
      filename: "dist/hashes.json",
      transform(data) {
        return Promise.resolve().then(() => JSON.stringify({
          index: `/${data.assetsByChunkName.index[0]}`,
          sw: `/${data.assetsByChunkName.sw[0]}`,
          styles: `/${data.assetsByChunkName.styles[0]}`,
          stylesJs: `/${data.assetsByChunkName.styles[1]}`
        }, null, 2));
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader"
        ]
      },
      {
        test: /\.(woff(2)?|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "dist/fonts"
            }
          }
        ]
      }
    ]
  }
};
