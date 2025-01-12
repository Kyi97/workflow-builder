const webpack = require("webpack");

module.exports = {
  mode: "development",
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /react-devtools/,
      contextRegExp: /node_modules/,
    }),
  ],
};
