const webpack = require('webpack');
const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  devtool: 'eval',
  // This will be our app's entry point (webpack will look for it in the 'src' directory due to the modulesDirectory setting below). Feel free to change as desired.
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    // 'webpack/hot/dev-server' //reloads browser upon errors
    'client/index.tsx'
  ],
  // Output the bundled JS to dist/app.js
  output: {
    filename: 'bundle.js',
    path: path.resolve('build/client')
  },
  resolve: {
    // Look for modules in .ts(x) files first, then .js(x)
    extensions: ['', /*'.ts',*/ '.tsx', '.js', '.jsx'],
    // Add 'src' to our modulesDirectories, as all our app code will live in there, so Webpack should look in there for modules
    modulesDirectories: ['src', 'node_modules'],
  },
  module: {
    // lint all files before compile, transpile
    preLoaders: [{
      test: /\.js$/,
      exclude: "node_modules",
      loader: 'eslint-loader'
    }],
    loaders: [
      // .ts(x) files should first pass through the Typescript loader, and then through babel
      {
        test: /\.tsx?$/,
        include: path.join(__dirname, 'src'),
        loaders: ['babel', 'ts-loader']
      }, {
        test: /\.ts?$/,
        loaders: ['babel', 'ts-loader']
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin({
      alwaysNotify: true
    }),
  ]
};