const { merge } = require("webpack-merge")
const path = require("path")

const common = require("./webpack.common.js")
const SrcPath = path.resolve(__dirname, "../src")

const config = merge(common, {
  entry: {
    app: SrcPath + "/app.js",
    proxy: SrcPath + "/proxy.js",
  },
})

module.exports = config
