// Karma configuration
// Generated on Sat Nov 12 2016 16:28:06 GMT-0500 (EST)
var webpackConfig = require("./webpack.config");

module.exports = function (config) {
  config.set({
    basePath: '',
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      "test/**/*.ts",
      "test/**/*.ts"
    ],
    exclude: [],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      //"test/**/*.ts": ["webpack"],
      "test/**/*.ts": ["webpack"]
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },
    plugins: [
      "karma-*"
    ],
    reporters: ['progress', 'mocha'],
    // web server port
    port: 9876,
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  })
}