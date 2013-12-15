// Karma configuration
// Generated on Fri Jun 28 2013 11:09:07 GMT+0100 (BST)


// base path, that will be used to resolve files and exclude
//basePath = '.';
basePath = '../../app/public';


// list of files / patterns to load in the browser
//files = [
//  MOCHA,
//  MOCHA_ADAPTER,
//    'e2e/**/*.scenario.js',
//    '../../app/public/components/chai/chai.js'
//];

files = [
    ANGULAR_SCENARIO,
    ANGULAR_SCENARIO_ADAPTER,
    'components/chai/chai.js',
    '../../test/client/e2e/*scenario.js'
];

proxies = {
    '/': 'http://localhost:3000/'
};

// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
// add growl support: npm install karma-growl-reporter -g
reporters = ['progress', 'growl'];


// web server port
port = 9875;


// cli runner port
runnerPort = 9101;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = false;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome','Firefox'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;

autoWatch = false;

urlRoot = '/_karma_/';
