const path = require("path")

const BuildPath = path.resolve(__dirname, "../build")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

const common = {
  output: {
    path: BuildPath,
    filename: "[name].js",
  },
  devtool: "source-map",
  stats: {
    all: false,
    errors: true,
    builtAt: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
              name: "[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "**/*",
          context: "public",
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
}

module.exports = common
