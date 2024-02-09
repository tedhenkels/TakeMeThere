const path = require("path");
const BundleTracker = require("webpack-bundle-tracker");

module.exports = {
  entry: {
    frontend: "./frontend/src/index",
  },
  // output: {
  //   path: path.resolve("static"),
  //   filename: "[name]-[fullhash].js",
  //   publicPath: "static/",
  //   clean: true
  // },
  output: {
    path: path.resolve(__dirname, "static"),
    // Cannot use publicPath: "auto" here because we need to specify the full URL,
    // since we're serving the files with the Webpack devServer:
    publicPath: "http://localhost:3000/static",
    filename: "[name]-[contenthash].js",
  },

  devtool: "source-map", // Optional: Choose an appropriate devtool for your needs
  devServer: {
    hot: true,
    historyApiFallback: true,
    host: "localhost",
    port: 3000,
    // Allow CORS requests from the Django dev server domain:
    headers: { "Access-Control-Allow-Origin": "*" },
  },
  plugins: [
    new BundleTracker({
      path: __dirname,
      filename: "webpack-stats.json",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};