const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: { main: "./src/index.jsx" },
  output: {
    path: path.resolve("./output"),
    publicPath: "/",
    filename: "[name]-[hash].js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        // Babel
        test: /(\.js$)|(\.jsx$)|(\.mjs$)/i,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["react", "babel-preset-env"]
        }
      },
      {
        // SCSS
        test: /(\.scss$)|(\.sass$)/i,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "index.html"
    }),
    new CleanWebpackPlugin(["dist"])
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: "./",
    bonjour: true,
    compress: true,
    noInfo: true,
    overlay: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  }
};
