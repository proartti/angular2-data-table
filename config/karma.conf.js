const testWebpackConfig = require('./webpack.test');

module.exports =  function(config) {
  var configuration = {
    basePath: '',
    singleRun: true,
    frameworks: ['jasmine'],
    exclude: [ ],
    files: [ 
      { pattern: './test/spec-bundle.js', watched: false } 
    ],
    preprocessors: { 
      './test/spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] 
    },
    webpack: testWebpackConfig({ env: 'test' }),
    webpackMiddleware: { stats: 'errors-only'},
    reporters: [ 'dots', 'coverage', 'remap-coverage' ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    customLaunchers: {
      ChromeTravisCi: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    coverageReporter: {
      type: 'in-memory'
    },
    remapCoverageReporter: {
      'text-summary': null,
      lcov: './coverage/lcov.info',
      json: './coverage/coverage.json',
      html: './coverage/html'
    }
  };

  if (process.env.TRAVIS){
    configuration.browsers = [
      'ChromeTravisCi'
    ];
  }

  config.set(configuration);
};