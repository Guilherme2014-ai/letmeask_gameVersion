/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { config } = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const { DefinePlugin } = require("webpack");
const resolve = path.resolve;

config({ path: resolve(__dirname, ".env.local") });

module.exports = {
  entry: resolve(__dirname, "src", "index.tsx"),
  target: "web",
  mode: "production",
  output: {
    path: resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  performance: {
    hints: false,
  },
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|jsx|js)$/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-typescript",
          ],
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [miniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new miniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "public", "index.html"),
    }),
    // Definindo arquivo .env
    new DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
};
